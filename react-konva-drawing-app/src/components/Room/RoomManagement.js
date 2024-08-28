import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoomManagement = () => {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    navigate('/create-room');
  };

  const handleJoinRoom = () => {
    navigate('/join-room');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Room Management</h1>
      <div className="flex space-x-2 mb-6">
        <button
          onClick={handleCreateRoom}
          className="px-4 py-2 bg-gray-300 text-black rounded shadow"
        >
          Create Room
        </button>
        <button
          onClick={handleJoinRoom}
          className="px-4 py-2 bg-green-500 text-white rounded shadow"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default RoomManagement;
