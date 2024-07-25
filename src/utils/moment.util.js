const moment = require('moment');

// Set default date format
const defaultFormat = 'YYYY-MM-DD HH:mm:ss';

// Function to get the current date and time
const getCurrentDateTime = () => {
    return moment().format(defaultFormat);
};

// Function to format a given date
const formatDate = (date, format = defaultFormat) => {
    return moment(date).format(format);
};

// Function to calculate the difference between two dates
const getDateDifference = (date1, date2) => {
    return moment(date1).diff(moment(date2), 'days');
};

// Function to add days to a given date
const addDays = (date, days) => {
    return moment(date).add(days, 'days').format(defaultFormat);
};

// Function to subtract days from a given date
const subtractDays = (date, days) => {
    return moment(date).subtract(days, 'days').format(defaultFormat);
};

module.exports = {
    getCurrentDateTime,
    formatDate,
    getDateDifference,
    addDays,
    subtractDays
};
