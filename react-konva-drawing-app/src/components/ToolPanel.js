import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faUndo, faRedo, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

const ToolPanel = ({ onSelectTool, onUndo, onRedo, onClear }) => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [penSize] = useState(6); // Fixed pen size

  const handleToolClick = useCallback((tool) => {
    if (selectedTool === tool) {
      setSelectedTool(null);
      onSelectTool(null);
    } else {
      setSelectedTool(tool);
      if (tool === 'pen') {
        onSelectTool('pen', penSize);
      } else if (tool === 'eraser') {
        onSelectTool('eraser');
      } else {
        onSelectTool(tool);
      }
    }
  }, [selectedTool, penSize, onSelectTool]);

  return (
    <div className="flex justify-center items-center p-4 bg-gray-800 text-white fixed w-full top-0 z-10 shadow-md space-x-6">
      <div className="flex space-x-6 items-center">
        {/* Pen Tool Button */}
        <button
          onClick={() => handleToolClick('pen')}
          className={`p-3 rounded-full shadow-lg focus:outline-none transition duration-200 ${
            selectedTool === 'pen' ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {/* Display fixed pen size as the icon */}
          <FontAwesomeIcon icon={faPen}  />
        </button>

        {/* Eraser Tool Button */}
        <button
          onClick={() => handleToolClick('eraser')}
          className={`p-3 rounded-full shadow-lg focus:outline-none transition duration-200 ${
            selectedTool === 'eraser' ? 'bg-red-600' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {/* Eraser icon */}
          <FontAwesomeIcon icon={faEraser} />
        </button>

        {/* Undo Button */}
        <button
          onClick={onUndo}
          className="p-3 rounded-full shadow-lg focus:outline-none transition duration-200 bg-yellow-500 hover:bg-yellow-600"
        >
          <FontAwesomeIcon icon={faUndo} />
        </button>

        {/* Redo Button */}
        <button
          onClick={onRedo}
          className="p-3 rounded-full shadow-lg focus:outline-none transition duration-200 bg-green-500 hover:bg-green-600"
        >
          <FontAwesomeIcon icon={faRedo} />
        </button>

        {/* Clear Button */}
        <button
          onClick={onClear}
          className="p-3 rounded-full shadow-lg focus:outline-none transition duration-200 bg-gray-700 hover:bg-gray-800"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default ToolPanel;
