import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListAppartement from './ListAppartement';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <nav className="mb-4 bg-white p-4 shadow rounded">
          <h1 className="text-xl font-bold text-blue-600">AzurImmo</h1>
        </nav>
        
        <Routes>
          <Route path="/" element={<ListAppartement />} />
          <Route path="/appartements" element={<ListAppartement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;