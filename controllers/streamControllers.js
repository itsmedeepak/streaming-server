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
    const { userID } = req.body;
    console.log(req.body);

    console.log("roomID", roomID);
    try {
        // Find the stream by roomID
        const stream = await Stream.findOne({ roomID });

        if (!stream) {
            return res.status(404).json({ message: 'Stream not found' });
        }

        // Convert userID to string and compare
        const id = stream.userID.toString();

        console.log(id, userID);

        if (id === userID) {
            return res.status(200).json({stream, role:"Host"});
        }
        return res.status(200).json({stream, role:"Audience"});
    } catch (err) {
        console.error(err); // Log error for debugging
        return res.status(500).json({ message: 'Error fetching stream', error: err.message });
    }
};

export {GetStream, saveStream, GetStreamByID}