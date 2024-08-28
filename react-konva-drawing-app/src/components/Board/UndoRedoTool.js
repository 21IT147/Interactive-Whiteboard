import React from 'react';

const UndoRedoTool = ({ onUndo, onRedo }) => {
  return (
    <div className="flex">
      <button className="p-2 mx-2" onClick={onUndo}>
        Undo
      </button>
      <button className="p-2 mx-2" onClick={onRedo}>
        Redo
      </button>
    </div>
  );
};

export default UndoRedoTool;
