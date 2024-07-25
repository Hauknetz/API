const nodemailer = require('nodemailer');
const config = require('../config/app.config');

// Erstellen Sie einen Transporter für Nodemailer
const transporter = nodemailer.createTransport({
    service: config.Email.Service, // E.g., 'gmail'
    auth: {
        user: config.Email.User,
        pass: config.Email.Pass
    }
});

// Funktion zum Senden einer E-Mail
const sendMail = async ({ to, subject, text, html }) => {
    try {
        const mailOptions = {
            from: config.Email.User,
            to,
            subject,
            text,
            html
        };

        // Senden Sie die E-Mail
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        throw new Error(`Failed to send email: ${error.message}`);
    }
};

module.exports = {
    sendMail
};
