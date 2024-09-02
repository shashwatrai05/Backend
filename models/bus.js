// models/Bus.js
import mongoose from 'mongoose';

const busSchema = new mongoose.Schema({
  number: { type: String, required: true },
  route: { type: String, required: true },
  driverName: { type: String },
  seatsAvailable: { type: Number, default: 0 },
  timings: [{ 
    stop: String, 
    arrivalTime: String 
  }]
});

const Bus = mongoose.model('Bus', busSchema);
export default Bus;
