const playwright = require('playwright');
const browserType = 'chromium';

async function main(contactNumber, message) {
    const browser = await playwright[browserType].launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://web.whatsapp.com/");
    await page.waitForLoadState('load');
    await page.waitForTimeout(22000);
    await page.pause();
        await page.click("div[title='New chat']");
        await page.locator("div[data-testid='chat-list-search']").first().fill(contactNumber);
        await page.waitForTimeout(1000);
        await page.click("(//div[@role='button'])[2]");
        await page.waitForTimeout(1000);
        await page.fill("div[title='Type a message']",message);
        await page.waitForTimeout(1000);
        await page.click("button[aria-label='Send']");
        await page.waitForTimeout(1000);
        //this deletes message for me
        await page.locator("(//div[@data-testid='msg-container'])").last().hover();
        await page.waitForTimeout(1000);
        await page.click("div[aria-label='Context Menu']");
        await page.click("div[aria-label='Delete message']");
        await page.waitForTimeout(1000);
        await page.click("div[data-testid='popup-controls-delete']");
        await page.waitForTimeout(4000);
    await browser.close();
}

main("8134531069","Annyeonghaseyo");