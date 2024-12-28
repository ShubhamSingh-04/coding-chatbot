const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const register = async (userName, email, password) => {
    try {
        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
        if (existingUser) {
            const errorField = existingUser.userName === userName ? 'USERNAME' : 'EMAIL';
            return { status: 400, error: `${errorField}_EXISTS`, message: `${errorField.toLowerCase()} is already in use` };
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            userName,
            email,
            passwordHash
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        // Send success response
        return { status: 201, userID: savedUser._id.toString(), message: 'User registered successfully' };
        
    } catch (error) {
        console.error('Error during registration at auth.db.js:', error);
        return { status: 500, message: 'Server error' };
    }
}

const login = async (userName, password) => {
    try {
        // Find the user
        const user = await User.findOne({ userName });
        if (!user) {
            return { status: 400, error: 'USER_DOES_NOT_EXIST', message: 'Invalid credentials' };
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return { status: 400, error: 'INVALID_CREDENTIALS', message: 'Invalid credentials' };
        }

        // Authentication successful
        return { status: 200, userID: user._id.toString(), message: 'Login successful' };
    } catch (error) {
        console.error('Error during login at auth.db.js:', error);
        return { status: 500, message: 'Server error' };
    }
}

module.exports = { register, login };
