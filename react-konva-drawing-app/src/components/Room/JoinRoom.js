import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRoomStore from '../Store/store';

const JoinRoom = () => {
  const [enteredRoomCode, setEnteredRoomCode] = useState('');
  const [enteredName, setEnteredName] = useState(''); // State to store the name
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate();
  const { roomId } = useRoomStore();

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (!roomId) {
      showToast('No active room available', 'error');
      return;
    }
    if (enteredRoomCode.trim() === '') {
      showToast('Please enter a room code', 'error');
      return;
    }
    if (enteredName.trim() === '') {
      showToast('Please enter your name', 'error');
      return;
    }

    if (enteredRoomCode === roomId) {
      // Store the entered name in localStorage or some other global state if needed
      navigate(`/room/${roomId}`);
    } else {
      showToast('Room code does not match', 'error');
    }
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleCreateRoom = () => {
    navigate('/create-room');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg border-2 border-blue-500">
        <h1 className="text-4xl font-bold text-blue-400 mb-8">Join Room</h1>
        <form onSubmit={handleJoinRoom} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
              className={`w-full p-3 bg-gray-700 text-white rounded-md border-2 ${
                isInputFocused ? 'border-blue-500' : 'border-gray-600'
              } focus:outline-none focus:border-blue-500`}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter Room Code"
              value={enteredRoomCode}
              onChange={(e) => setEnteredRoomCode(e.target.value)}
              className={`w-full p-3 bg-gray-700 text-white rounded-md border-2 ${
                isInputFocused ? 'border-blue-500' : 'border-gray-600'
              } focus:outline-none focus:border-blue-500`}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-300"
          >
            Join Room
          </button>
        </form>
        <button
          onClick={handleCreateRoom}
          className="w-full mt-6 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300"
        >
          Create Room
        </button>
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

export default JoinRoom;
