// ⚠️ TEMPORARY: Allow self-signed certs for Twilio during local dev
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load .env variables

const Routes = require('./routes/route.js'); // Your single route file

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Debug: Check if MONGO_URI is loaded
console.log('MongoDB URI:', process.env.MONGO_URI);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ Connected to MongoDB');
    // Start server after successful DB connection
    app.listen(process.env.PORT || 5000, () => {
        console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
})
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/', Routes);
