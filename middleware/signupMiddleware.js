const bcrypt = require('bcrypt');
const Admin = require('../models/AdminSchema/Admin.model'); // Assuming you have a model for Admin

// Middleware function to check if Admin already exists
const checkAdminExists = async (req, res, next) => {
    const { email } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email: email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        next(); // Move to the next middleware function
    } catch (error) {
        console.error('Error checking admin existence:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Middleware function to hash the password
const hashPassword = async (req, res, next) => {
    const { password } = req.body;

    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        req.hashedPassword = hash; // Store the hashed password in the request object
        next(); // Move to the next middleware function
    } catch (error) {
        console.error('Error hashing password:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = { checkAdminExists, hashPassword };

