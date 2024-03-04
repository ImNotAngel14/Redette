import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
// import './App.css'
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/Register';
import Login from './pages/Login';
//import Home from './pages/Home'

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={ <Login/> } />
        <Route path="/register" element={ <Register/> } />
        {/*<Route path="/home" element={ <Home/> } />*/}
      </Routes>
    </Router>
    
  );
}


export default App
