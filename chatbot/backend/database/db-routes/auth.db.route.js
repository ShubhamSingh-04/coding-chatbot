const express = require('express');
const router = express.Router();
const {login, register} = require('../db-services/auth.service');

router.post('/register', async (req, res) => {
    const { userName, email, password } = req.body;

    const response = await register(userName, email, password);
    res.status(response.status).json(response);
});

router.post('/login', async (req, res) => {
    const { userName, password } = req.body;

    const response = await login(userName, password);
    res.status(response.status).json(response);
});

module.exports = router;