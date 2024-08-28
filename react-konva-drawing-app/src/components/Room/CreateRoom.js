import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Function to generate a numeric room code
const generateNumericRoomCode = () => {
  const length = 6;
  let roomCode = '';
  for (let i = 0; i < length; i++) {
    roomCode += Math.floor(Math.random() * 10); // Generate a digit from 0 to 9
  }
  return roomCode;
};

const CreateRoom = () => {
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [isRoomCreated, setIsRoomCreated] = useState(false);
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    if (!name) {
      alert('Please enter your name.');
      return;
    }
    const numericCode = generateNumericRoomCode();
    const code = `${name}-${numericCode}`;
    setRoomCode(code);
    setIsRoomCreated(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomCode);
    alert('Room code copied to clipboard!');
  };

  const handleNavigateToJoinRoom = () => {
    navigate('/join-room');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={handleNavigateToJoinRoom}
          className="px-6 py-3 bg-green-500 text-white rounded shadow hover:bg-green-600 transition duration-200"
        >
          Join Room
        </button>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-gray-500 text-white rounded shadow hover:bg-gray-600 transition duration-200"
        >
          Home
        </button>
      </div>
      <h2 className="text-3xl font-bold mb-4">Create a Room</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-4 py-2 mb-4 border rounded shadow"
      />
      <button
        onClick={handleCreateRoom}
        className="px-6 py-3 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-200"
      >
        Generate Room Code
      </button>
      {isRoomCreated && (
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold mb-2">Room Created Successfully!</p>
          <div 
            className="px-4 py-2 mb-4 bg-white border rounded shadow cursor-pointer" 
            onClick={handleCopyCode}
          >
            {roomCode}
          </div>
          <button
            onClick={() => navigate(`/room/${roomCode}`)}
            className="px-6 py-3 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-200"
          >
            Start
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateRoom;
