const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true },  
  busType: { 
    type: String, 
    enum: ['Metro', 'BRTC'],  
    required: true 
  },
  route: { type: String, required: true },  
  driverName: { type: String, required: true },
  departureTime: { type: String },  
  arrivalTime: { type: String },    
  isActive: { type: Boolean, default: false },  
  currentLocation: { type: String, default: "Not departed yet" },
  crowdStatus: { 
    type: String, 
    enum: ['Seats Available', 'Standing Only', 'Overcrowded', 'Unknown'],
    default: 'Unknown'
  },
  comment: { type: String, default: "" },
  serviceType: { 
    type: String,
    enum: ['Regular', 'Rickabibazar Shuttle', 'Tilagor Shuttle', 'Darbesht Shuttle']
  }
}, { timestamps: true });

module.exports = mongoose.model('Bus', busSchema);