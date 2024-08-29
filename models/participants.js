import mongoose from "mongoose"
const ParticipantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  joinedAt: { type: Date, default: Date.now }
});

const  Participant = mongoose.model('Participant', ParticipantSchema);
export default Participant