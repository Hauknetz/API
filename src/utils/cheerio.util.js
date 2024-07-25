const cheerio = require('cheerio');
const logger = require('./winston.util');

// Function to load HTML into cheerio
const loadHtml = (html) => {
    return cheerio.load(html);
};

// Function to extract text from an HTML string
const extractText = (html) => {
    const $ = loadHtml(html);
    return $.text().trim();
};

// Function to extract an element's text by selector
const extractTextBySelector = (html, selector) => {
    const $ = loadHtml(html);
    return $(selector).text().trim();
};

// Function to extract attributes from an element by selector
const extractAttributesBySelector = (html, selector) => {
    const $ = loadHtml(html);
    const attributes = {};
    $(selector).each((index, element) => {
        Object.assign(attributes, $(element).attr());
    });
    return attributes;
};

// Function to manipulate HTML content (e.g., add a class to all <p> tags)
const manipulateHtml = (html, manipulationFunction) => {
    const $ = loadHtml(html);
    manipulationFunction($);
    return $.html();
};

// Example manipulation function that adds a class to all <p> tags
const addClassToParagraphs = (html, className) => {
    return manipulateHtml(html, ($) => {
        $('p').addClass(className);
    });
};

// Example usage of cheerio utility functions
const exampleUsage = () => {
    const html = `
        <html>
            <body>
                <h1>Hello World</h1>
                <p>Welcome to the example page.</p>
                <p>Enjoy exploring Cheerio!</p>
            </body>
        </html>
    `;

    logger.info('Extracted Text:', extractText(html));
    logger.info('Extracted Text by Selector:', extractTextBySelector(html, 'h1'));
    logger.info('Attributes of <p> tags:', extractAttributesBySelector(html, 'p'));

    const manipulatedHtml = addClassToParagraphs(html, 'highlight');
    logger.info('Manipulated HTML:', manipulatedHtml);
};

module.exports = {
    loadHtml,
    extractText,
    extractTextBySelector,
    extractAttributesBySelector,
    manipulateHtml,
    addClassToParagraphs,
    exampleUsage
};
