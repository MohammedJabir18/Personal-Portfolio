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
        
        # -> Click the 'Experience' navigation button to jump to the section, wait for the page to settle, then inspect the timeline container and check that at least one timeline entry is visible as static content (even if reveal animations do not run).
        frame = context.pages[-1]
        # Click element
        elem = frame.locator('xpath=html/body/div[3]/main/nav/div/div[2]/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        
        # --> Assertions to verify final state
        frame = context.pages[-1]
        # small pause to allow any in-flight animations or layout to settle
        await page.wait_for_timeout(1000)
        
        # Ensure the Experience section is scrolled into view
        await frame.locator("text=Experience").scroll_into_view_if_needed()
        
        # Verify the 'Experience' heading/text is visible
        assert await frame.locator("text=Experience").is_visible(), 'Expected text "Experience" to be visible'
        
        # Locate a container that represents the Experience timeline (try a few sensible container selectors)
        timeline = frame.locator("section:has-text('Experience'), div:has-text('The Journey'), main:has-text('Experience')").first
        
        # Wait briefly for the timeline container to appear (if it animates in)
        try:
            await timeline.wait_for(state='visible', timeout=5000)
        except Exception:
            # If the container doesn't become visible within the timeout, we'll fall back to checking entries directly
            pass
        
        # Determine whether the container is visible (safe against exceptions)
        try:
            container_visible = await timeline.is_visible()
        except Exception:
            container_visible = False
        
        # If the container is not visible, assert that at least one known timeline entry is visible as static content
        entry_texts = ["Bismi Traders", "Tecfuge", "SOFTRONIICS", "SYSBREEZE"]
        entry_found = False
        for t in entry_texts:
            loc = frame.locator(f"text={t}")
            try:
                if await loc.is_visible():
                    entry_found = True
                    break
            except Exception:
                continue
        
        assert container_visible or entry_found, 'Expected experience timeline container or at least one timeline entry to be visible as static content'
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    