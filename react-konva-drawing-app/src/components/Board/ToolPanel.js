import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faUndo, faRedo, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

const ToolPanel = ({ onSelectTool, onUndo, onRedo, onClear }) => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [penSize] = useState(6); // Fixed pen size
  const [hoveredTool, setHoveredTool] = useState(null); // State to track hovered tool


  const handleToolClick = useCallback(
    (tool) => {
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
    },
    [selectedTool, penSize, onSelectTool]
  );


 

  return (
    <div className="relative">
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white fixed top-4 left-1/2 transform -translate-x-1/2 z-10 shadow-xl rounded-lg space-x-6 w-11/12 max-w-screen-lg">
        <div className="flex space-x-6 items-center">
          {/* Pen Tool Button */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredTool('Pen')}
            onMouseLeave={() => setHoveredTool(null)}
          >
            <button
              onClick={() => handleToolClick('pen')}
              className={`focus:outline-none transition duration-200 ${
                selectedTool === 'pen' ? 'text-white' : 'text-blue-500 hover:text-blue-600'
              }`}
            >
              <FontAwesomeIcon icon={faPen} size="lg" />
            </button>
            {hoveredTool === 'Pen' && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded-md shadow-lg">
                Pen
              </div>
            )}
          </div>

          {/* Eraser Tool Button */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredTool('Eraser')}
            onMouseLeave={() => setHoveredTool(null)}
          >
            <button
              onClick={() => handleToolClick('eraser')}
              className={`focus:outline-none transition duration-200 ${
                selectedTool === 'eraser' ? 'text-white' : 'text-red-500 hover:text-red-600'
              }`}
            >
              <FontAwesomeIcon icon={faEraser} size="lg" />
            </button>
            {hoveredTool === 'Eraser' && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded-md shadow-lg">
                Eraser
              </div>
            )}
          </div>

          {/* Undo Button */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredTool('Undo')}
            onMouseLeave={() => setHoveredTool(null)}
          >
            <button
              onClick={onUndo}
              className="focus:outline-none transition duration-200 text-yellow-500 hover:text-yellow-600"
            >
              <FontAwesomeIcon icon={faUndo} size="lg" />
            </button>
            {hoveredTool === 'Undo' && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded-md shadow-lg">
                Undo
              </div>
            )}
          </div>

          {/* Redo Button */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredTool('Redo')}
            onMouseLeave={() => setHoveredTool(null)}
          >
            <button
              onClick={onRedo}
              className="focus:outline-none transition duration-200 text-green-500 hover:text-green-600"
            >
              <FontAwesomeIcon icon={faRedo} size="lg" />
            </button>
            {hoveredTool === 'Redo' && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded-md shadow-lg">
                Redo
              </div>
            )}
          </div>

          {/* Clear Button */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredTool('Clear')}
            onMouseLeave={() => setHoveredTool(null)}
          >
            <button
              onClick={onClear}
              className="focus:outline-none transition duration-200 text-gray-500 hover:text-gray-600"
            >
              <FontAwesomeIcon icon={faTrash} size="lg" />
            </button>
            {hoveredTool === 'Clear' && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded-md shadow-lg">
                Clear
              </div>
            )}
          </div>
        </div>
      </div>

      {/* //Close/Exit Button
      <button
        onClick={handleNavigateHome}
        className="absolute top-0 right-0 m-4 text-red-500 hover:text-red-600 focus:outline-none transition duration-200"
      >
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </button> */}
    </div>
  );
};

export default ToolPanel;
