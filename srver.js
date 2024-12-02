
 javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/patientDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define patient schema and model
const patientSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    records: [String]
});

const Patient = mongoose.model('Patient', patientSchema);

// API route to login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const patient = await Patient.findOne({ username, password });

    if (patient) {
        res.json({ name: patient.name, records: patient.records });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

