import React, { useState } from 'react';
import ToolPanel from './ToolPanel';
import Canvas from './Canvas';

const WhiteBoard = () => {
  const [lines, setLines] = useState([]); // Stores all drawn lines
  const [redoStack, setRedoStack] = useState([]); // Stores lines for redo action
  const [tool, setTool] = useState(null);

  const handleSelectTool = (selectedTool) => {
    setTool(selectedTool);
  };

  const handleUndo = () => {
    if (lines.length === 0) return;
    setRedoStack((prevRedoStack) => [...prevRedoStack, lines[lines.length - 1]]);
    setLines((prevLines) => prevLines.slice(0, -1));
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    setLines((prevLines) => [...prevLines, redoStack[redoStack.length - 1]]);
    setRedoStack((prevRedoStack) => prevRedoStack.slice(0, -1));
  };

  const handleClear = () => {
    setLines([]);
    setRedoStack([]);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
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

export default WhiteBoard;
