const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for users
const users = new Map();

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// POST /users - Create a new user
app.post('/users', (req, res) => {
    try {
        const { name, email } = req.body;

        // Validation
        if (!name || !email) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: 'Both name and email are required'
            });
        }

        if (typeof name !== 'string' || name.trim().length === 0) {
            return res.status(400).json({
                error: 'Invalid name',
                message: 'Name must be a non-empty string'
            });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({
                error: 'Invalid email',
                message: 'Please provide a valid email address'
            });
        }

        // Check if email already exists
        const existingUser = Array.from(users.values()).find(user => user.email === email);
        if (existingUser) {
            return res.status(409).json({
                error: 'Email already exists',
                message: 'A user with this email already exists'
            });
        }

        // Create new user
        const newUser = {
            id: crypto.randomUUID(),
            name: name.trim(),
            email: email.toLowerCase(),
            createdAt: new Date().toISOString()
        };

        // Store user in memory
        users.set(newUser.id, newUser);

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'An error occurred while creating the user'
        });
    }
});

// GET /users/:id - Get user by ID
app.get('/users/:id', (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                error: 'Missing user ID',
                message: 'User ID is required'
            });
        }

        const user = users.get(id);

        if (!user) {
            return res.status(404).json({
                error: 'User not found',
                message: 'No user found with the provided ID'
            });
        }

        res.json(user);
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'An error occurred while retrieving the user'
        });
    }
});

// GET /users - Get all users (bonus endpoint)
app.get('/users', (req, res) => {
    try {
        const allUsers = Array.from(users.values());
        res.json(allUsers);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'An error occurred while retrieving users'
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Not found',
        message: 'The requested endpoint does not exist'
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        error: 'Internal server error',
        message: 'An unexpected error occurred'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  POST /users - Create a new user');
    console.log('  GET /users/:id - Get user by ID');
    console.log('  GET /users - Get all users');
    console.log('  GET /health - Health check');
});