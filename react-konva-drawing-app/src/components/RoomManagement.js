import React, { useState } from 'react';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import { useNavigate } from 'react-router-dom';

const RoomManagement = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();

  const handleRoomCodeGenerated = (code) => {
    setRoomCode(code);
    navigate(`/room/${code}`);
  };

  const handleRoomJoined = (code) => {
    navigate(`/room/${code}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Room Management</h1>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('create')}
          className={`px-4 py-2 rounded ${activeTab === 'create' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Create Room
        </button>
        <button
          onClick={() => setActiveTab('join')}
          className={`px-4 py-2 rounded ${activeTab === 'join' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          Join Room
        </button>
      </div>
      {activeTab === 'create' && <CreateRoom onCodeGenerated={handleRoomCodeGenerated} />}
      {activeTab === 'join' && <JoinRoom onRoomJoined={handleRoomJoined} />}
    </div>
  );
};

export default RoomManagement;
