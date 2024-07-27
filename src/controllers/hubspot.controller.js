const hubspotService = require('../services/hubspot.service');

const getAuthUrl = (req, res) => {
    const url = hubspotService.getAuthUrl();
    res.status(200).json({ url });
};

const getToken = async (req, res) => {
    try {
        const tokens = await hubspotService.getToken(req.body.code);
        res.status(200).json(tokens);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getContacts = async (req, res) => {
    try {
        const contacts = await hubspotService.getContacts();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCompanies = async (req, res) => {
    try {
        const companies = await hubspotService.getCompanies();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getDeals = async (req, res) => {
    try {
        const deals = await hubspotService.getDeals();
        res.status(200).json(deals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createContact = async (req, res) => {
    try {
        const contact = await hubspotService.createContact(req.body);
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createCompany = async (req, res) => {
    try {
        const company = await hubspotService.createCompany(req.body);
        res.status(201).json(company);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createDeal = async (req, res) => {
    try {
        const deal = await hubspotService.createDeal(req.body);
        res.status(201).json(deal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAuthUrl,
    getToken,
    getContacts,
    getCompanies,
    getDeals,
    createContact,
    createCompany,
    createDeal,
};
