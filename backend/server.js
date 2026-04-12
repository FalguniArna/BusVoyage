const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();

app.use(cors({
  origin: [/^http:\/\/localhost:\d+$/, /https:\/\/bus-voyage\.vercel\.app$/],
  credentials: true
}));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.error("Connection error:", err));

const authRoutes         = require('./routes/auth');
const busRoutes          = require('./routes/bus');
const announcementRoutes = require('./routes/announcements');
const complaintRoutes    = require('./routes/complaints');
const lostFoundRoutes    = require('./routes/lostfound');

app.use('/api/auth',          authRoutes);
app.use('/api/buses',         busRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/complaints',    complaintRoutes);
app.use('/api/lostfound',     lostFoundRoutes);

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