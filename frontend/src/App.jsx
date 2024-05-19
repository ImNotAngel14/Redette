import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
// import './App.css'
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Post from './pages/Post';
 import Community from './pages/Community'
 import ProfileCom from './pages/ProfileCom'
 import ProfilePosts from './pages/ProfilePosts'
 import ProfileSaved from './pages/ProfileSaved'
 import SearchCommunity from './pages/SearchCommunity'


function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={ <Login/> } />
        <Route path="/register" element={ <Register/> } />
        {<Route path="/home" element={ <Home/> } />}
        {<Route path="/post" element={ <Post/> } />}
        {<Route path="/comm" element={ <Community/> } />}
        {<Route path="/pfcomm" element={ <ProfileCom/> } />}
        {<Route path="/pfposts" element={ <ProfilePosts/> } />}
        {<Route path="/pfsaved" element={ <ProfileSaved/> } />}
        {<Route path="/search" element={ <SearchCommunity/> } />}


      </Routes>
    </Router>
    // <Community/>

    // <Post/>

    // <ProfileCom/>
    
    // <ProfilePosts/>   

    // <ProfileSaved/>  
  );
}


export default App
