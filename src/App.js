import React from 'react';
import './App.css';
import { useState} from 'react';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes';
import Client from './routes/admin/client';
import Registrera from './routes/signup';
import Signin from './routes/signin';
import User from './routes/client/user';
import UserCash from './routes/client/usercash';
import Admin from './routes/admin/admin';

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
          <Route path='/anvandare/kund' element={<Client token={token} user={user} role={role}/>} />
          <Route path='/anvandare/saldo' element={<UserCash token={token} user={user} role={role}/>} />
          <Route path='/anvandare/stad/:stad' element={<Admin token={token} user={user} role={role}/>} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
