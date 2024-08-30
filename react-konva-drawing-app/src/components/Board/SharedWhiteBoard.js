import React, { useState, useEffect } from 'react';
import ToolPanel from './ToolPanel';
import { useLocation, useNavigate } from 'react-router-dom';
import Canvas from './Canvas';

const SharedWhiteBoard = () => {
  const [lines, setLines] = useState([]); 
  const [redoStack, setRedoStack] = useState([]); 
  const [tool, setTool] = useState();
  const [isCreator, setIsCreator] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from;
  const roomId = location.state?.roomId; 

  useEffect(() => {
    if (from === 'join-room') {
      setIsCreator(false);
    }
  }, [from]);

  // Handles the selection of drawing tools
  const handleSelectTool = (selectedTool) => {
    setTool(selectedTool);
  };

  // Handles undo action
  const handleUndo = () => {
    if (lines.length === 0) return;
    setRedoStack((prevRedoStack) => [...prevRedoStack, lines[lines.length - 1]]);
    setLines((prevLines) => prevLines.slice(0, -1));
  };

  // Handles redo action
  const handleRedo = () => {
    if (redoStack.length === 0) return;
    setLines((prevLines) => [...prevLines, redoStack[redoStack.length - 1]]);
    setRedoStack((prevRedoStack) => prevRedoStack.slice(0, -1));
  };

  // Clears the entire board
  const handleClear = () => {
    setLines([]);
    setRedoStack([]);
  };

  // Handles the close of the whiteboard
  const handleClose = async () => {
    if (isCreator) {
      try {
        await fetch(`http://localhost:5000/api/remove-room/${roomId}`, {
          method: 'DELETE',
        });
        console.log('Room removed from backend.');
      } catch (error) {
        console.error('Error removing room:', error);
      }
    }
    navigate('/'); // Redirect to the home or another appropriate page
  };


  return (
    <div className="flex flex-col h-screen bg-white">
      <button
        className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded"
        onClick={handleClose}
      >
        Close
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
      />
    </div>
  );
};

export default SharedWhiteBoard;
