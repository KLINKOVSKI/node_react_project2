const { Client } = require('pg');

// Set up PostgreSQL connection details
const client = new Client({
    host: 'localhost', // e.g., localhost for local or your cloud host for remote
    port: 5432, // Default PostgreSQL port
    user: 'postgres',
    password: 'admin',
    database: 'music_app'
});

// Connect to PostgreSQL
client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Error connecting to PostgreSQL', err));

module.exports = client;
