import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListAppartement from './ListAppartement';
import Home from './Home';
import AppartementDetail from './AppartementDetail';
 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appartements" element={<ListAppartement />} />
        <Route path="/appartements/:id" element={<AppartementDetail />} />
      </Routes>
    </Router>
  );
}
 
export default App;
 