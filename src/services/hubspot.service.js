const hubspot = require('@hubspot/api-client');
const config = require('../config/app.config');

const hubspotClient = new hubspot.Client({
    clientId: config.Hubspot.clientId,
    clientSecret: config.Hubspot.clientSecret,
    redirectUri: config.Hubspot.redirectUri,
});

// Set the OAuth2 client credentials
const setAccessToken = (token) => {
    hubspotClient.setAccessToken(token);
};

// Generate a URL for the user to authenticate with HubSpot
const getAuthUrl = () => {
    const scopes = [
        'contacts',
        'crm.objects.contacts.read',
        'crm.objects.contacts.write',
        'crm.objects.companies.read',
        'crm.objects.companies.write',
        'crm.schemas.companies.read',
        'crm.schemas.companies.write',
        'crm.objects.deals.read',
        'crm.objects.deals.write',
        'content',
        'reports',
    ];

    return hubspotClient.oauth.getAuthorizationUrl(scopes);
};

// Get the tokens after the user authenticates with HubSpot
const getToken = async (code) => {
    const response = await hubspotClient.oauth.tokensApi.createToken(
        'authorization_code',
        code,
        config.hubspot.redirectUri,
        config.hubspot.clientId,
        config.hubspot.clientSecret
    );
    setAccessToken(response.accessToken);
    return response;
};

// Example: Get CRM contacts
const getContacts = async () => {
    const response = await hubspotClient.crm.contacts.basicApi.getPage();
    return response.body.results;
};

// Example: Get CRM companies
const getCompanies = async () => {
    const response = await hubspotClient.crm.companies.basicApi.getPage();
    return response.body.results;
};

// Example: Get CRM deals
const getDeals = async () => {
    const response = await hubspotClient.crm.deals.basicApi.getPage();
    return response.body.results;
};

// Example: Create a new contact
const createContact = async (contact) => {
    const response = await hubspotClient.crm.contacts.basicApi.create(contact);
    return response.body;
};

// Example: Create a new company
const createCompany = async (company) => {
    const response = await hubspotClient.crm.companies.basicApi.create(company);
    return response.body;
};

// Example: Create a new deal
const createDeal = async (deal) => {
    const response = await hubspotClient.crm.deals.basicApi.create(deal);
    return response.body;
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
