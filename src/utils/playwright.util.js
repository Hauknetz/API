const { chromium, firefox, webkit } = require('playwright');
const logger = require('../utils/winston.util');

/**
 * Launches a browser instance.
 * @param {string} browserType - The type of browser to launch ('chromium', 'firefox', 'webkit').
 * @returns {Promise<Object>} - The launched browser instance.
 */
const launchBrowser = async (browserType) => {
    let browser;
    switch (browserType) {
        case 'chromium':
            browser = await chromium.launch();
            break;
        case 'firefox':
            browser = await firefox.launch();
            break;
        case 'webkit':
            browser = await webkit.launch();
            break;
        default:
            throw new Error('Unsupported browser type');
    }
    return browser;
};

/**
 * Opens a new page and navigates to a URL.
 * @param {Object} browser - The browser instance.
 * @param {string} url - The URL to navigate to.
 * @returns {Promise<Object>} - The page instance.
 */
const openPage = async (browser, url) => {
    const page = await browser.newPage();
    await page.goto(url);
    return page;
};

/**
 * Example usage of Playwright utility functions.
 */
const exampleUsage = async () => {
    const browser = await launchBrowser('chromium');
    const page = await openPage(browser, 'https://example.com');

    const title = await page.title();
    logger.info('Page Title:', title);

    await browser.close();
};

module.exports = {
    launchBrowser,
    openPage,
    exampleUsage
};
