// backend/app.js
const express = require('express');
const bodyParser = require('body-parser');
const client = require('./db'); // Import the PostgreSQL connection

const app = express();
app.use(bodyParser.json());

// POST endpoint to create a new user
app.post('/api/users', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the email already exists
        const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length > 0) {
            return res.status(400).json({ message: 'Email already in use.' });
        }

        // Insert new user into the users table
        const insertResult = await client.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, password]
        );

        // Return the created user
        const newUser = insertResult.rows[0];
        res.status(201).json({ message: 'User created successfully!', user: newUser });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ message: 'Error creating user', error: err.message });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
