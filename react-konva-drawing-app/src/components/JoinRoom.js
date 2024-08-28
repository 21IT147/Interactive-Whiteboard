import React from 'react';
import { useNavigate } from 'react-router-dom';

const JoinRoom = ({ onRoomJoined }) => {
  const [roomCode, setRoomCode] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if (roomCode.trim() === '' || userName.trim() === '') {
      alert('Please enter both room code and your name.');
      return;
    }

    onRoomJoined(roomCode); // Notify parent component with room code

    // Show success alert and navigate
    alert('Successfully joined the room!');
    navigate(`/room/${roomCode}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Join a Room</h1>
      <input
        type="text"
        placeholder="Room Code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
        className="mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Your Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="mb-2 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleJoinRoom}
        className="px-6 py-3 bg-green-500 text-white rounded shadow hover:bg-green-600 transition duration-200"
      >
        Join Room
      </button>
    </div>
  );
};

export default JoinRoom;
