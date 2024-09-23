import React, { useState, useEffect, useRef } from 'react';
import Peer from 'peerjs';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faDesktop } from '@fortawesome/free-solid-svg-icons';
import ToolPanel from './ToolPanel';
import Canvas from './Canvas';

const SharedWhiteBoard = () => {
  const [lines, setLines] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [tool, setTool] = useState('pen');
  const [isCreator, setIsCreator] = useState(true);
  const [peer, setPeer] = useState(null);
  const [peerId, setPeerId] = useState('');
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [remoteStream, setRemoteStream] = useState(null);
  const screenShareStreamRef = useRef(null);
  const peerConnectionsRef = useRef({});

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from;
  const roomId = location.state?.roomId;

  useEffect(() => {
    if (from === 'join-room') {
      setIsCreator(false);
    }

    const newPeer = new Peer();

    newPeer.on('open', async (id) => {
      console.log('My peer ID is: ' + id);
      setPeer(newPeer);
      setPeerId(id);

      if (isCreator) {
        await saveCreatorPeer(id);
      } else {
        await joinRoom(id, newPeer);
      }
    });

    newPeer.on('connection', (conn) => {
      conn.on('open', () => {
        peerConnectionsRef.current[conn.peer] = conn;
        console.log('New peer connected:', conn.peer);
      });

      conn.on('data', (data) => {
        if (data.type === 'join') {
          console.log('Peer joined:', data.peerId);
        } else if (data.type === 'draw') {
          handleRemoteDraw(data);
        }
      });
    });

    newPeer.on('call', handleIncomingCall);

    return () => {
      stopScreenShare();
      Object.values(peerConnectionsRef.current).forEach(conn => conn.close());
      newPeer.destroy();
    };
  }, [from, isCreator, roomId]);

  const saveCreatorPeer = async (peerId) => {
    try {
      const response = await fetch('https://interactive-whiteboard-nodeserver.onrender.com/api/save-creator-peer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomId, peerId }),
      });
      if (!response.ok) {
        throw new Error('Failed to save creator peer');
      }
    } catch (error) {
      console.error('Error saving creator peer:', error);
    }
  };

  const joinRoom = async (joinerId, peerInstance) => {
    try {
      const response = await fetch(`https://interactive-whiteboard-nodeserver.onrender.com/api/get-creator-peer/${roomId}`);
      if (!response.ok) {
        throw new Error('Failed to get creator peer');
      }
      const { creatorPeerId } = await response.json();
      const conn = peerInstance.connect(creatorPeerId);
      conn.on('open', () => {
        console.log('Connected to creator');
        peerConnectionsRef.current[creatorPeerId] = conn;
        conn.send({ type: 'join', peerId: joinerId });
      });
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  const handleIncomingCall = (call) => {
    call.answer();
    call.on('stream', (incomingStream) => {
      setRemoteStream(incomingStream);
    });
  };

  const handleSelectTool = (selectedTool) => {
    setTool(selectedTool);
  };

  const handleUndo = () => {
    if (lines.length === 0) return;
    setRedoStack((prevRedoStack) => [...prevRedoStack, lines[lines.length - 1]]);
    setLines((prevLines) => prevLines.slice(0, -1));
    broadcastDraw({ type: 'undo' });
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    setLines((prevLines) => [...prevLines, redoStack[redoStack.length - 1]]);
    setRedoStack((prevRedoStack) => prevRedoStack.slice(0, -1));
    broadcastDraw({ type: 'redo' });
  };

  const handleClear = () => {
    setLines([]);
    setRedoStack([]);
    broadcastDraw({ type: 'clear' });
  };

  const handleClose = async () => {
    if (isCreator) {
      try {
        await fetch(`https://interactive-whiteboard-nodeserver.onrender.com/api/remove-room/${roomId}`, {
          method: 'DELETE',
        });
        console.log('Room removed from backend.');
      } catch (error) {
        console.error('Error removing room:', error);
      }
    }
    navigate('/');
  };

  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        preferCurrentTab: true,
        video: {
          displaySurface: 'browser',
        },
        audio: false
      });
      
      const videoTrack = stream.getVideoTracks()[0];
      const tabStream = new MediaStream([videoTrack]);
      
      screenShareStreamRef.current = tabStream;
      setIsScreenSharing(true);

      Object.values(peerConnectionsRef.current).forEach((conn) => {
        if (conn.open) {
          const call = peer.call(conn.peer, tabStream);
          call.on('stream', (remoteStream) => {
            // Handle the remote stream if needed
          });
        }
      });

      videoTrack.onended = () => {
        stopScreenShare();
      };

    } catch (error) {
      console.error('Error starting screen share:', error);
      if (error.name === 'NotAllowedError') {
        console.log('Permission denied or user cancelled. Please try again.');
      }
    }
  };

  const stopScreenShare = () => {
    if (screenShareStreamRef.current) {
      screenShareStreamRef.current.getTracks().forEach(track => track.stop());
      screenShareStreamRef.current = null;
    }
    setIsScreenSharing(false);

    Object.values(peerConnectionsRef.current).forEach((conn) => {
      if (conn.open) {
        conn.send({ type: 'screen-share-stop' });
      }
    });
  };

  const broadcastDraw = (drawData) => {
    Object.values(peerConnectionsRef.current).forEach((conn) => {
      if (conn.open) {
        conn.send({ type: 'draw', ...drawData });
      }
    });
  };

  const handleRemoteDraw = (data) => {
    switch (data.type) {
      case 'draw':
        setLines((prevLines) => [...prevLines, data.line]);
        break;
      case 'undo':
        handleUndo();
        break;
      case 'redo':
        handleRedo();
        break;
      case 'clear':
        handleClear();
        break;
      default:
        console.log('Unknown draw type:', data.type);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white relative">
      <button
        className="absolute top-4 right-4 p-2 bg-transparent border-none text-red-500 rounded"
        onClick={handleClose}
        aria-label="Close"
      >
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </button>
      <ToolPanel
        onSelectTool={handleSelectTool}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onClear={handleClear}
      />
      <Canvas
        tool={tool}
        lines={lines}
        setLines={setLines}
        redoStack={redoStack}
        setRedoStack={setRedoStack}
        broadcastDraw={broadcastDraw}
      />
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <button
          className={`p-2 ${isScreenSharing ? 'bg-yellow-500' : 'bg-gray-500'} text-white rounded`}
          onClick={isScreenSharing ? stopScreenShare : startScreenShare}
          aria-label={isScreenSharing ? 'Stop screen sharing' : 'Start screen sharing'}
        >
          <FontAwesomeIcon icon={faDesktop} />
        </button>
      </div>
      {remoteStream && (
        <div className="absolute bottom-4 left-4 w-32 h-24 border rounded bg-black">
          <video
            autoPlay
            playsInline
            className="w-full h-full object-cover"
            srcObject={remoteStream}
          />
        </div>
      )}
    </div>
  );
};

export default SharedWhiteBoard;