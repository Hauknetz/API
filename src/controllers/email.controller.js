const nodemailerService = require('../services/nodemailer.service');

// Funktion zum Senden einer E-Mail
const sendEmail = async (req, res) => {
    const { to, subject, text, html } = req.body;

    try {
        // Stellen Sie sicher, dass alle erforderlichen Felder vorhanden sind
        if (!to || !subject || (!text && !html)) {
            return res.status(400).json({ message: 'To, subject, and either text or html are required' });
        }

        // Verwenden Sie den E-Mail-Service, um die E-Mail zu senden
        const info = await nodemailerService.sendMail({ to, subject, text, html });

        // Rückgabe der Erfolgsnachricht
        res.status(200).json({
            message: 'Email sent successfully',
            info
        });
    } catch (error) {
        // Fehlerbehandlung
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
};

module.exports = {
    sendEmail
};
