import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FamiliesPage from './Pages/FamiliesPage/FamiliesPage';
import ExportHistoryPage from './Pages/ExportHistoryPage/ExportHistoryPage';
import HomePage from './Pages/HomePage/HomePage';
import Layout from './Components/Layout/Layout';
import BuilderPage from './Pages/BuilderPage/BuilderPage';
import ContactPage from './Pages/ContactPage/ContactPage';
import GamePage from './Pages/GamePage/GamePage';
import './App.css'; 

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/families" element={<FamiliesPage />} />
          <Route path="/export-history" element={<ExportHistoryPage />} />
          <Route path="/builder/:phone" element={<BuilderPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
