import React, { useRef, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';

const Canvas = ({ tool, lines, setLines, redoStack, setRedoStack }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const stageRef = useRef(null);

  const handleMouseDown = () => {
    if (tool === 'pen' || tool === 'eraser') {
      setIsDrawing(true);
      const stage = stageRef.current.getStage();
      const pos = stage.getPointerPosition();
      setLines((prevLines) => [...prevLines, { tool, points: [pos.x, pos.y] }]);
      setRedoStack([]);
    }
  };

  const handleMouseMove = () => {
    if (!isDrawing) return;
    const stage = stageRef.current.getStage();
    const point = stage.getPointerPosition();
    setLines((prevLines) => {
      const lastLine = prevLines[prevLines.length - 1];
      if (!lastLine) return prevLines;
      const newPoints = lastLine.points.concat([point.x, point.y]);
      const newLines = prevLines.slice(0, -1).concat({ ...lastLine, points: newPoints });
      return newLines;
    });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div className="flex-grow bg-white  border-gray-300 relative mt-16 shadow-lg rounded-b-lg">
      <Stage
        width={window.innerWidth}
        height={window.innerHeight - 100}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={stageRef}
        className="cursor-crosshair"
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.tool === 'eraser' ? 'white' : 'black'}
              strokeWidth={line.tool === 'eraser' ? 20 : 3}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
