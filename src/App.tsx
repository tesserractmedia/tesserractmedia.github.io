import React from 'react';
import { Route, Routes, } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
