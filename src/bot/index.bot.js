const discordBot = require('./discord/index');
const { BotToken } = require('../config/app.config');
const logger = require('../utils/winston.util');

let botRunning = false;

const startBot = () => {
    if (!botRunning) {
        discordBot.login(BotToken);
        botRunning = true;
        logger.info('Discord bot started.');
    } else {
        logger.warn('Discord bot is already running.');
    }
};

const stopBot = () => {
    if (botRunning) {
        discordBot.destroy();
        botRunning = false;
        logger.info('Discord bot stopped.');
    } else {
        logger.warn('Discord bot is not running.');
    }
};

module.exports = {
    startBot,
    stopBot
}