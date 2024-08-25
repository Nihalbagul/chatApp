const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/user', async (req, res) => {
    try {
        const { name, role } = req.body;
        const newUser = new User({ name, role });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

module.exports = router;
