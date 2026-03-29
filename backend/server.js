const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.error("Connection error:", err));

app.get('/', (req, res) => {
    res.send("BusVoyage API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is flying on port ${PORT}`);
});