
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { NextResponse, NextRequest } from 'next/server';

// --- ENV VALIDATION ---
const REQUIRED_ENV = ['GOOGLE_CLIENT_EMAIL', 'GOOGLE_PRIVATE_KEY', 'GOOGLE_SHEET_ID', 'EMAIL_USER', 'EMAIL_PASS'] as const;
const missingEnv = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
    console.error(`❌ Missing environment variables: ${missingEnv.join(', ')}`);
}

// --- RATE LIMITING (in-memory, per-IP, 5 req/min) ---
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
        return false;
    }

    entry.count++;
    return entry.count > RATE_LIMIT_MAX;
}

// --- SANITIZATION ---
function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Prevent Google Sheets formula injection: prefix with ' if starts with =, +, -, @
function sanitizeSheetValue(value: string): string {
    if (/^[=+\-@]/.test(value)) {
        return `'${value}`;
    }
    return value;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 2000;
const MAX_NAME_LENGTH = 100;

// --- ALLOWED ORIGINS ---
const ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'https://mohammedjabir.me',
    'https://www.mohammedjabir.me',
];

export async function POST(req: NextRequest) {
    try {
        // 1. Rate Limiting
        const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
        if (isRateLimited(ip)) {
            return NextResponse.json({ success: false, message: 'Too many requests. Please wait a minute.' }, { status: 429 });
        }

        // 2. CSRF / Origin Check
        const origin = req.headers.get('origin');
        if (origin && !ALLOWED_ORIGINS.includes(origin)) {
            return NextResponse.json({ success: false, message: 'Forbidden.' }, { status: 403 });
        }

        // 3. Parse & Validate Input
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ success: false, message: 'All fields are required.' }, { status: 400 });
        }

        if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
            return NextResponse.json({ success: false, message: 'Invalid input types.' }, { status: 400 });
        }

        if (name.length > MAX_NAME_LENGTH) {
            return NextResponse.json({ success: false, message: `Name must be under ${MAX_NAME_LENGTH} characters.` }, { status: 400 });
        }

        if (!EMAIL_REGEX.test(email)) {
            return NextResponse.json({ success: false, message: 'Invalid email format.' }, { status: 400 });
        }

        if (message.length > MAX_MESSAGE_LENGTH) {
            return NextResponse.json({ success: false, message: `Message must be under ${MAX_MESSAGE_LENGTH} characters.` }, { status: 400 });
        }

        if (missingEnv.length > 0) {
            console.error('❌ Cannot process contact form — missing env vars:', missingEnv);
            return NextResponse.json({ success: false, message: 'Server configuration error.' }, { status: 500 });
        }

        const now = new Date();
        const date = now.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
        const time = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });

        // 4. Google Sheets (RAW mode to prevent formula injection)
        try {
            const auth = new google.auth.GoogleAuth({
                credentials: {
                    client_email: process.env.GOOGLE_CLIENT_EMAIL,
                    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                },
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });

            const sheets = google.sheets({ version: 'v4', auth });

            await sheets.spreadsheets.values.append({
                spreadsheetId: process.env.GOOGLE_SHEET_ID,
                range: 'Sheet1!A:E',
                valueInputOption: 'RAW',
                requestBody: {
                    values: [[date, time, sanitizeSheetValue(name.trim()), sanitizeSheetValue(email.trim()), sanitizeSheetValue(message.trim())]],
                },
            });
            console.log('✅ Google Sheets: Row appended successfully');
        } catch (sheetError) {
            console.error('❌ Google Sheets Error:', sheetError instanceof Error ? sheetError.message : sheetError);
            const detail = process.env.NODE_ENV === 'development' && sheetError instanceof Error ? sheetError.message : '';
            return NextResponse.json({ success: false, message: `Google Sheets failed. ${detail}`.trim() }, { status: 500 });
        }

        // 5. Email (Awaiting to ensure delivery in Serverless)
        try {
            const safeName = escapeHtml(name.trim());
            const safeEmail = escapeHtml(email.trim());
            const safeMessage = escapeHtml(message.trim());

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER, // Send to yourself
                replyTo: email, // Allow replying to the sender
                subject: `New Portfolio Contact: ${safeName}`,
                text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nMessage: ${message.trim()}`,
                html: `
                    <h3>New Contact Form Submission</h3>
                    <p><strong>Name:</strong> ${safeName}</p>
                    <p><strong>Email:</strong> ${safeEmail}</p>
                    <p><strong>Message:</strong></p>
                    <p>${safeMessage}</p>
                `,
            });

            console.log('✅ Email: Sent successfully');
        } catch (emailError) {
            console.error('❌ Email send error:', emailError instanceof Error ? emailError.message : emailError);
            // We don't fail the request if email fails but sheets succeeded, but we log it.
        }

        return NextResponse.json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('❌ API Error:', error);
        return NextResponse.json({ success: false, message: 'Failed to send message.' }, { status: 500 });
    }
}
