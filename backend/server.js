const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors({
  origin: /^http:\/\/localhost:\d+$/,
  credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.error("Connection error:", err));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const busRoutes = require('./routes/bus');
app.use('/api/buses', busRoutes);

app.get('/', (req, res) => {
    res.send("BusVoyage API is running...");
});

app.get('/api/test-db', async (req, res) => {
  const PreRegisteredStudent = require('./models/PreRegisteredStudent');
  const all = await PreRegisteredStudent.find({});
  res.json(all);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is flying on port ${PORT}`);
});