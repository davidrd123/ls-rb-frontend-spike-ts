import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import BinsList from './components/BinsList';
import BinDetail from './components/BinDetail';
import RequestDetail from './components/RequestDetail';


import './App.css';

const App = () => {

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bins" element={<BinsList />} />
          <Route path="/bins/:binId" element={<BinDetail />} />
          <Route path="/bins/:binId/requests/:requestId" element={<RequestDetail />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
