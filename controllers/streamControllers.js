import Stream from "../models/stream.js";

const saveStream = async (req, res) => {
    const { roomID} = req.body;
    const userID = req.user.id;

    console.log(roomID, userID)
    try {
      const newStream = new Stream({ roomID, userID });
      await newStream.save();
      res.status(201).json({ message: 'Stream created successfully', stream: newStream });
    } catch (err) {
        console.log(err)

      res.status(500).json({ message: 'Error creating stream', error: err.message });
    }
}


const GetStream = async (req, res) => {
  console.log("streams")

    try {
      const stream = await Stream.find({ userID:req.user.id })
      if (!stream) {
        return res.status(404).json({ message: 'Stream not found' });
      }
      res.status(200).json({
        total:stream.length,
        streams:stream
      });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching stream', error: err.message });
    }
  }
const GetStreamByID = async (req, res) => {
    const { roomID } = req.params;

    console.log("roomID", roomID)
    try {

      const stream = await Stream.findOne({roomID:roomID});
    
      if (!stream) {
        return res.status(404).json({ message: 'Stream not found' });
      }

      res.status(200).json(stream);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching stream', error: err.message });
    }
  }

export {GetStream, saveStream, GetStreamByID}