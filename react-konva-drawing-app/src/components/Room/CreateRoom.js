import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRoomStore from '../Store/store';

const CreateRoom = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const { roomId, generateRoomId } = useRoomStore();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      showToast('Name must have at least 2 characters', 'error');
    } else {
      generateRoomId(name);
      showToast('Room created successfully!', 'success');
    }
  };

  const handleCopyCode = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
      showToast('Room code copied to clipboard!', 'info');
    }
  };

  const handleJoinRoom = () => {
    navigate('/join-room');
  };

  const handleGoToRoom = () => {
    if (roomId) {
      navigate(`/room/${roomId}`);
    }
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="p-8 bg-gray-800 rounded-lg border-2 border-blue-500">
          <h1 className="text-4xl font-bold text-blue-400 mb-8">Create Room</h1>
          <form onSubmit={handleCreateRoom} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full p-3 bg-gray-700 text-white rounded-md border-2 ${
                  isInputFocused ? 'border-blue-500' : 'border-gray-600'
                } focus:outline-none focus:border-blue-500`}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                required
              />
            </div>
            <div className="h-12 bg-gray-700 text-blue-400 font-semibold p-3 rounded-md">
              {roomId || " "}
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-2/3 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300"
              >
                Generate Room Code
              </button>
              <button
                type="button"
                onClick={handleCopyCode}
                disabled={!roomId}
                className={`w-1/3 p-3 ${
                  roomId
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-gray-600 cursor-not-allowed'
                } text-white rounded-md transition duration-300`}
              >
                Copy Code
              </button>
            </div>
          </form>
        </div>
        <button
          onClick={handleJoinRoom}
          className="w-full mt-4 p-3 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-300"
        >
          Join Room
        </button>
        {roomId && (
          <button
            onClick={handleGoToRoom}
            className="w-full mt-4 p-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition duration-300"
          >
            Go
          </button>
        )}
      </div>
      {toast.show && (
        <div className={`fixed top-4 right-4 p-6 rounded-md text-white text-lg shadow-lg ${
          toast.type === 'success' ? 'bg-green-500' :
          toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        }`}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default CreateRoom;
