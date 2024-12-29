const express = require('express');
const router = express.Router();
const {login, register} = require('../db-services/auth.service');

router.post('/register', async (req, res) => {
    const { userName, email, password } = req.body;

    // Validate input
    if (!userName || !email || !password) {
        return res.status(400).json({
            status: 400,
            error: 'INVALID_INPUT',
            message: 'Username, email, and password are required'
        });
    }

    try {
        const response = await register(userName, email, password);
        res.status(response.status).json(response);
    } catch (error) {
        console.error('Unexpected error during registration:', error);
        res.status(500).json({ status: 500, message: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    const { userName, password } = req.body;

    try{
        const response = await login(userName, password);
        res.status(response.status).json(response);
    } catch(e){
        console.error('Unexpected error during login at /login-auth.db.route:', e);
        res.status(500).json({ status: 500, message: 'Internal server error' });
    }
});

module.exports = router;