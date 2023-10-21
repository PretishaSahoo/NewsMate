
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import  News  from './Components/News';

export default function App() {
  const apiKey=process.env.REACT_APP_NEWS_API
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={< News apiKey={apiKey} key="general" pageSize={6} country={'in'} category={'general'} />} />
            <Route exact path="/business" element={< News  apiKey={apiKey} key="business" pageSize={6} country={'in'} category={'business'} />} />
            <Route exact path="/entertainment" element={< News apiKey={apiKey} key="entertainment" pageSize={6} country={'in'} category={'entertainment'} />} />
            <Route exact path="/health" element={< News apiKey={apiKey}key="health" pageSize={6} country={'in'} category={'health'} />} />
            <Route exact path="/science" element={< News apiKey={apiKey} key="science" pageSize={6} country={'in'} category={'science'} />} />
            <Route exact path="/sports" element={< News apiKey={apiKey}key="sports" pageSize={6} country={'in'} category={'sports'} />} />
            <Route exact path="/technology" element={< News apiKey={apiKey} key="technology" pageSize={6} country={'in'} category={'technology'} />} />
          </Routes>
        </Router>
      </div>
    );
}

