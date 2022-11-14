import React from 'react';
import './App.css';
import { useState} from 'react';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './routes';
import About from './routes/about';
import Registrera from './routes/registrera';
import Signin from './routes/signin';
import User from './routes/user';
import Admin from './routes/admin';
import Searched from './routes/searched';
  
function App() {
  const [token, setToken] = useState("");
  const [user, setUserId] = useState("");
  const [role, setUserRole] = useState("");
  return (
    <div className='main'>
      <Router>
      <Navbar setToken={setToken} token={token} setUserId={setUserId} user={user}/>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/om' exact element={<Home />} />
          <Route path='/registrera' exact element={<Registrera />} />
          <Route path='/loggain' element={<Signin setToken={setToken} token={token} setUserId={setUserId} user={user} role={role} setUserRole={setUserRole}/>} />
          <Route path='/anvandare' element={<User token={token} user={user} role={role}/>} />
          <Route path='/anvandare/saldo' element={<User token={token} user={user} role={role}/>} />
          <Route path='/anvandare/:stad' element={<Admin token={token} user={user} role={role}/>} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
