const Profile = require('../models/profile.model');

// Alle Profile abrufen
const getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ein Profil anhand der ID abrufen
const getProfileById = async (req, res) => {
    const { id } = req.params;
    try {
        const profile = await Profile.findById(id);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ein neues Profil erstellen
const createProfile = async (req, res) => {
    try {
        const profile = new Profile(req.body);
        await profile.save();
        res.status(201).json(profile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Ein Profil aktualisieren
const updateProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const profile = await Profile.findByIdAndUpdate(id, req.body, { new: true });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Ein Profil löschen
const deleteProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const profile = await Profile.findByIdAndDelete(id);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllProfiles,
    getProfileById,
    createProfile,
    updateProfile,
    deleteProfile
};
