import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';

//CSS
import './css/index.css';

//JSX
import Header from './jsx/header.jsx';
import Home from './jsx/home.jsx';
import Profile from './jsx/profile.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/profile/:steamId' element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <body className='main-body'>
    <Header/>
    <App className='content-body'/>
  </body>
);
