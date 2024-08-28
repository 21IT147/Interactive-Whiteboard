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
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => navigate('/create-room')}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-200"
        >
          Create Room
        </button>
        <button
          onClick={() => navigate('/join-room')}
          className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition duration-200"
        >
          Join Room
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-4">Join a Room</h1>
      <input
        type="text"
        placeholder="Room Code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
        className="px-4 py-2 mb-4 border rounded shadow"
      />
      <input
        type="text"
        placeholder="Your Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="px-4 py-2 mb-4 border rounded shadow"
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
