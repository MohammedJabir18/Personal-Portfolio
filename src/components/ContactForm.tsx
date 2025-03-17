import React, { useState } from 'react';
import { Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  async function submitFormData(data) {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzjx36eaG1IICX5ToJ28OrypL1hvZA8Ww2rHcbT0GzsiseYdHd5trvgp9UFX5l_vgvF9g/exec', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          name: data.name,
          email: data.email,
          message: data.message
        }).toString()
      });
      
      if (response.ok) {
        console.log('Form submitted successfully to Google Sheets.');
      } else {
        console.error('Failed to submit to Google Sheets:', response.status);
      }
    } catch (error) {
      console.error('Google Sheets Error:', error);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    setIsSubmitting(true);
  
    const dataToSend = { ...formData }; // Capture form data before resetting
  
    emailjs
      .send('service_35dhqcc', 'template_s1m4ycg', dataToSend, 'QPypT13m9YYMUUs0u')
      .then(() => {
        setSubmitMessage("Thanks for your message! I'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
        submitFormData(dataToSend); // Call the function to send data to Google Sheets
        setTimeout(() => setSubmitMessage(''), 5000);
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        setSubmitMessage('Failed to send message. Please try again.');
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      {submitMessage && (
        <div className="mb-6 p-4 bg-neobrutalism-purple/20 border border-neobrutalism-purple text-white">
          {submitMessage}
        </div>
      )}
      
      <div className="mb-6">
        <label htmlFor="name" className="block text-white mb-2">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full p-3 bg-black/30 border-2 ${errors.name ? 'border-red-500' : 'border-neobrutalism-purple'} text-white placeholder-white/50 focus:outline-none focus:border-neobrutalism-cyan transition`}
          placeholder="Your Name"
        />
        {errors.name && <p className="mt-1 text-red-500">{errors.name}</p>}
      </div>
      
      <div className="mb-6">
        <label htmlFor="email" className="block text-white mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full p-3 bg-black/30 border-2 ${errors.email ? 'border-red-500' : 'border-neobrutalism-purple'} text-white placeholder-white/50 focus:outline-none focus:border-neobrutalism-cyan transition`}
          placeholder="Your Email"
        />
        {errors.email && <p className="mt-1 text-red-500">{errors.email}</p>}
      </div>
      
      <div className="mb-6">
        <label htmlFor="message" className="block text-white mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`w-full p-3 bg-black/30 border-2 ${errors.message ? 'border-red-500' : 'border-neobrutalism-purple'} text-white placeholder-white/50 focus:outline-none focus:border-neobrutalism-cyan transition`}
          placeholder="Your Message"
        />
        {errors.message && <p className="mt-1 text-red-500">{errors.message}</p>}
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="neo-button w-full flex justify-center items-center gap-2 disabled:opacity-70"
      >
        {isSubmitting ? 'Sending...' : (
          <>
            <span>Send Message</span>
            <Send size={18} />
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;