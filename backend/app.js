const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory storage for rooms (replace with a database for persistence)
let rooms = [];

// Route to fetch all rooms
app.get('/api/rooms', (req, res) => {
  res.json(rooms);
});

// Route to verify a room exists
app.get('/api/verify-room/:roomId', (req, res) => {
  const { roomId } = req.params;
  const roomExists = rooms.some((room) => room.roomId === roomId);
  
  if (roomExists) {
    res.json({ message: 'Room exists', exists: true });
  } else {
    res.status(404).json({ message: 'Room not found', exists: false });
  }
});

// Route to add a new room
app.post('/api/add-room', (req, res) => {
  const { roomId, name } = req.body;

  // Check if roomId already exists
  const roomExists = rooms.some((room) => room.roomId === roomId);
  if (roomExists) {
    return res.status(400).json({ message: 'Room already exists' });
  }

  // Add the new room
  const newRoom = { roomId, name, createdAt: new Date() };
  rooms.push(newRoom);
  res.status(201).json({ message: 'Room added successfully', room: newRoom });
});

// Route to remove a room
app.delete('/api/remove-room/:roomId', (req, res) => {
  const { roomId } = req.params;

  // Remove the room from the list
  rooms = rooms.filter((room) => room.roomId !== roomId);
  res.json({ message: 'Room removed successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
