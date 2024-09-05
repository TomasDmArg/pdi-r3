import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TaskDetail from './pages/TaskDetail';
import CreateTask from './pages/CreateTask';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/task/:id" element={<TaskDetail />} />
      <Route path="/create" element={<CreateTask />} />
    </Routes>
  </Router>
);

export default AppRoutes;