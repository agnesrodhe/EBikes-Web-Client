import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState} from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/footer';
import Home from './routes';
import About from './routes/about';
import Client from './routes/admin/handleClient';
import Registrera from './routes/signup';
import Signin from './routes/signin';
import User from './routes/user';
import UserCash from './routes/client/usercash';
import Admin from './routes/admin/admincity';
import Admindata from './routes/admin/admindata';
import Prices from './routes/admin/prices';

function App() {
  const [token, setToken] = useState("");
  const [user, setUserId] = useState("");
  const [role, setUserRole] = useState("");
  return (
    <div className='main'>
      <Router>
      <div className='head'>
      <Navbar setToken={setToken} token={token} setUserId={setUserId} user={user} role={role}/>
      </div>
      <div className='mainbody'>
        <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/om' exact element={<About />} />
            <Route path='/registrera' exact element={<Registrera />} />
            <Route path='/loggain' element={<Signin setToken={setToken} token={token} setUserId={setUserId} user={user} role={role} setUserRole={setUserRole}/>} />
            <Route path='/anvandare' element={<User token={token} user={user} role={role}/>} />
            <Route path='/anvandare/admindata' element={<Admindata token={token} user={user} role={role}/>} />
            <Route path='/anvandare/kostnader' element={<Prices token={token} user={user} role={role}/>} />
            <Route path='/anvandare/kund' element={<Client token={token} user={user} role={role}/>} />
            <Route path='/anvandare/saldo' element={<UserCash token={token} user={user} role={role}/>} />
            <Route path='/anvandare/stad/:stad' element={<Admin token={token} user={user} role={role}/>} />
        </Routes>
      </div>
      <div className='foot'>
        <Footer/>
      </div>
    </Router>
    </div>
  );
}

export default App;
