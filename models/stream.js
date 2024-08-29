// models/Stream.js
import mongoose from 'mongoose';

const StreamSchema = new mongoose.Schema({
  roomID: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Stream = mongoose.model('Stream', StreamSchema);

export default Stream;
