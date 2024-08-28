import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WhiteBoard from './components/Whiteboard';
import Home from './components/Home';
import NoPage from './components/NoPage';
import RoomManagement from './components/RoomManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whiteboard" element={<WhiteBoard />} />
        <Route path="/room-management" element={<RoomManagement />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
