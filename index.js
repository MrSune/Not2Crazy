const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();

require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.connect('your_mongo_db_connection_string', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// register endpoint
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send('Error registering user: ' + error.message);
    }
});

// login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});



document.getElementById('authForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const isRegistering = document.getElementById('submitBtn').textContent === 'Register';

    const url = isRegistering ? '/register' : '/login';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    if (response.ok) {
        alert(isRegistering ? 'Registration successful!' : 'Login successful! Token: ' + result.token);
        // Optionally store the token in localStorage
        if (!isRegistering) localStorage.setItem('token', result.token);
    } else {
        alert(result.message);
    }
});

// Toggle between login and registration
document.getElementById('registerLink').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('formTitle').textContent = 'Register';
    document.getElementById('submitBtn').textContent = 'Register';
    document.getElementById('toggleLink').innerHTML = 'Already have an account? <a href="#" id="loginLink">Login</a>';
});

// Handle the switch back to login
document.addEventListener('click', (e) => {
    if (e.target.id === 'loginLink') {
        e.preventDefault();
        document.getElementById('formTitle').textContent = 'Login';
        document.getElementById('submitBtn').textContent = 'Login';
        document.getElementById('toggleLink').innerHTML = 'Don\'t have an account? <a href="#" id="registerLink">Register</a>';
    }
});
