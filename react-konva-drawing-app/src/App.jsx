import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WhiteBoard from './components/Board/Whiteboard';
import SharedWhiteBoard from './components/Board/SharedWhiteBoard';
import Home from './components/Home';
import NoPage from './components/NoPage';
import CreateRoom from './components/Room/CreateRoom';
import JoinRoom from './components/Room/JoinRoom';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whiteboard" element={<WhiteBoard />} />
        <Route path="/room/:roomId" element={<SharedWhiteBoard />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/join-room" element={<JoinRoom />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
