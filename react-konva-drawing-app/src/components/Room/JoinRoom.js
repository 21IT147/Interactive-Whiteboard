import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinRoom = () => {
  const [enteredRoomCode, setEnteredRoomCode] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate();

  const handleJoinRoom = async (e) => {
    e.preventDefault();

    if (enteredRoomCode.trim() === '') {
      showToast('Please enter a room code', 'error');
      return;
    }
    if (enteredName.trim() === '') {
      showToast('Please enter your name', 'error');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/verify-room/${enteredRoomCode}`);
      const data = await response.json();

      if (response.ok && data.exists) {
        // Store the entered name in local storage or use it in other logic if needed
        showToast('Joining room...', 'success');
        navigate(`/room/${enteredRoomCode}`,{state:{from:"join-room",roomId:enteredRoomCode}});
      } else {
        showToast(data.message || 'Room code does not match or room does not exist', 'error');
      }
    } catch (error) {
      showToast('Error checking room code', 'error');
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
        <div
          className={`fixed top-4 right-4 p-6 rounded-md text-white text-lg shadow-lg ${
            toast.type === 'success'
              ? 'bg-green-500'
              : toast.type === 'error'
              ? 'bg-red-500'
              : 'bg-blue-500'
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default JoinRoom;
