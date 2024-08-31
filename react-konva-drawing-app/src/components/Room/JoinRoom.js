import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Peer from 'peerjs';

const JoinRoom = () => {
  const [enteredRoomCode, setEnteredRoomCode] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [isSharing, setIsSharing] = useState(false);
  const [peerId, setPeerId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (peerId) {
      // Create a PeerJS instance for the user joining the room
      const peer = new Peer(
        {host: 'localhost',
          port: 9000,
          path: '/',}
      );

      // Once the peer is open and connected, initiate the connection to the creator's peerId
      peer.on('open', (id) => {
        console.log('Peer ID for joining:', id);
        const connection = peer.connect(peerId);

        // Handle data received from the creator
        connection.on('data', (data) => {
          console.log('Received from creator:', data);
        });

        // Handle errors
        connection.on('error', (err) => {
          console.error('Error in peer connection:', err);
          showToast('Error connecting to shared screen', 'error');
        });
      });

      // Handle incoming call to join the screen stream
      peer.on('call', (call) => {
        call.answer(); // Automatically answer calls for now
        call.on('stream', (remoteStream) => {
          const videoElement = document.getElementById('sharedScreenVideo');
          if (videoElement) {
            videoElement.srcObject = remoteStream;
            videoElement.play();
          }
        });
      });

      return () => {
        peer.destroy();
      };
    }
  }, [peerId]);

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
        // Extract peerId from backend response
        const fetchedPeerId = data.peerId;
        console.log('Fetched Peer ID from backend:', fetchedPeerId);

        showToast('Connecting to screen share...', 'success');
        setPeerId(fetchedPeerId); // Set the peerId extracted from the backend
        setTimeout(() => {
          setIsSharing(true);
        }, 2000);
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

  if (isSharing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Viewing Shared Screen</h2>
        <div className="w-full max-w-4xl aspect-video bg-gray-800 rounded-lg border-2 border-blue-500 flex items-center justify-center">
          <video id="sharedScreenVideo" className="w-full h-full" autoPlay></video>
        </div>
        <button
          onClick={() => setIsSharing(false)}
          className="mt-6 p-3 bg-red-600 hover:bg-red-700 text-white rounded-md transition duration-300"
        >
          Leave Screen Share
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg border-2 border-blue-500">
        <h1 className="text-4xl font-bold text-blue-400 mb-8">Join Screen Share</h1>
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
            Join Screen Share
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
