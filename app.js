const path = require('path');
const express = require('express');
const OS = require('os');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected successfully ✔️");
}).catch(err => {
    console.error("MongoDB connection error ❌", err.message);
});

// Schema & Model
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    name: String,
    id: Number,
    description: String,
    image: String,
    velocity: String,
    distance: String
});

const planetModel = mongoose.model('planets', dataSchema);

// Routes

app.post('/planet', async (req, res) => {
    try {
        const id = parseInt(req.body.id);
        if (isNaN(id) || id < 0 || id > 9) {
            return res.status(400).send("Invalid planet ID. Select a number from 0 to 9.");
        }

        const planetData = await planetModel.findOne({ id: id });

        if (!planetData) {
            return res.status(404).send("Planet not found.");
        }

        res.json(planetData);
    } catch (err) {
        console.error("Error finding planet:", err.message);
        res.status(500).send("Error in Planet Data");
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/', 'index.html'));
});

app.get('/os', (req, res) => {
    res.json({
        os: OS.hostname(),
        env: process.env.NODE_ENV || 'development'
    });
});

app.get('/live', (req, res) => {
    res.json({ status: 'live' });
});

app.get('/ready', (req, res) => {
    res.json({ status: 'ready' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
