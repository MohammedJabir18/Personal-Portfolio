import asyncio
from playwright import async_api

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:3000", wait_until="commit", timeout=10000)

        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass

        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass

        # Interact with the page elements to simulate user flow
        # -> Navigate to http://localhost:3000
        await page.goto("http://localhost:3000", wait_until="commit", timeout=10000)
        
        # -> Click the 'Work' navigation button (index 64) to bring the Projects/Work section into view and then verify the Projects section appears.
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=html/body/div[3]/main/nav/div/div[2]/div[3]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        
        # --> Assertions to verify final state
        frame = context.pages[-1]
        # -> Verify the "View Projects" CTA is present and visible
        view_projects = frame.locator('text=View Projects')
        assert await view_projects.count() > 0, 'View Projects CTA not found on the page'
        assert await view_projects.first.is_visible(), 'View Projects CTA is not visible'
        
        # -> Click the "View Projects" CTA (safe to click even if another navigation already occurred)
        await view_projects.first.click(timeout=5000)
        await page.wait_for_timeout(1000)
        
        # -> Verify the Projects section is visible (try a few likely headings)
        candidates = ['Selected Work', 'Selected Work Projects', 'Projects', 'Work', 'Selected Work Projects']
        projects_section = None
        for txt in candidates:
            loc = frame.locator(f'text={txt}')
            if await loc.count() > 0:
                projects_section = loc.first
                break
        assert projects_section is not None, 'Projects section not found on the page'
        assert await projects_section.is_visible(), 'Projects section is not visible after clicking View Projects'
        
        # -> Verify the URL contains '/'
        assert '/' in page.url, f'Unexpected URL: {page.url}'
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    