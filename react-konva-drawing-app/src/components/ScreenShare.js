import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const ScreenShare = ({ roomCode, isCreator }) => {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (isCreator) {
      const startScreenShare = async () => {
        try {
          const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
          setStream(screenStream);
          if (videoRef.current) {
            videoRef.current.srcObject = screenStream;
          }
          // Broadcast screen share stream to other clients in the room
          socket.emit('screenShare', { roomCode, stream: screenStream });
        } catch (error) {
          console.error('Error accessing display media.', error);
        }
      };
      startScreenShare();
    } else {
      socket.on('screenShare', (receivedStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = receivedStream;
        }
      });
    }

    socket.emit('joinRoom', roomCode);

    return () => {
      socket.off('screenShare');
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [roomCode, isCreator]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <video
        ref={videoRef}
        autoPlay
        className="w-full h-full border border-gray-300 rounded shadow"
      />
    </div>
  );
};

export default ScreenShare;
