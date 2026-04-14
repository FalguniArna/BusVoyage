const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');

const users = [
  { username: "driver_sajib",    password: "sajib123",    role: "driver", name: "Sajib",    studentId: "" },
  { username: "driver_shahadat", password: "shahadat123", role: "driver", name: "Shahadat", studentId: "" },
  { username: "driver_monir",    password: "monir123",    role: "driver", name: "Monir",    studentId: "" },
  { username: "driver_nasir",    password: "nasir123",    role: "driver", name: "Nasir",    studentId: "" },
  { username: "driver_fahim",    password: "fahim123",    role: "driver", name: "Fahim",    studentId: "" },
  { username: "admin_busvoyage", password: "admin2026",   role: "admin",  name: "Admin",    studentId: "" },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  for (const u of users) {
    const exists = await User.findOne({ username: u.username });
    if (exists) {
      console.log(`Already exists: ${u.username}`);
      continue;
    }
    const hashed = await bcrypt.hash(u.password, 10);
    await User.create({ ...u, password: hashed });
    console.log(`Created: ${u.username}`);
  }

  console.log("Done!");
  process.exit();
}

seed();