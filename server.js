// Backend Server for MongoDB Integration
// Install dependencies: npm install express mongoose cors dotenv

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5500', process.env.FRONTEND_URL].filter(Boolean),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('ERROR: MONGODB_URI environment variable is not set');
    process.exit(1);
}

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✓ Connected to MongoDB');
    console.log(`✓ Database: ${mongoose.connection.db.getName()}`);
})
.catch(err => {
    console.error('✗ MongoDB connection error:', err.message);
    process.exit(1);
});

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Contact = mongoose.model('Contact', contactSchema);

// API Routes
app.get('/', (req, res) => {
    res.json({ message: 'Portfolio API is running' });
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
    try {
        console.log('Received contact form:', req.body);
        const { name, email, phone, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            console.log('Validation failed:', { name, email, subject, message });
            return res.status(400).json({ 
                message: 'Please fill in all required fields' 
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log('Invalid email:', email);
            return res.status(400).json({ 
                message: 'Please enter a valid email address' 
            });
        }

        // Create new contact
        const newContact = new Contact({
            name,
            email,
            phone: phone || '',
            subject,
            message
        });

        await newContact.save();
        console.log('Contact saved successfully:', newContact);

        res.status(201).json({ 
            message: 'Contact form submitted successfully!',
            data: {
                id: newContact._id,
                name: newContact.name,
                email: newContact.email
            }
        });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ 
            message: 'Server error. Please try again later.' 
        });
    }
});

// Get all contacts (for admin purposes - add authentication in production)
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({ contacts });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ 
            message: 'Server error. Please try again later.' 
        });
    }
});

// Get single contact by ID
app.get('/api/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({ contact });
    } catch (error) {
        console.error('Error fetching contact:', error);
        res.status(500).json({ 
            message: 'Server error. Please try again later.' 
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`\n✓ Server is running on port ${PORT}`);
    console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`✓ Ready to accept requests\n`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n✓ Server shutting down gracefully...');
    mongoose.connection.close(() => {
        console.log('✓ MongoDB connection closed');
        process.exit(0);
    });
});

