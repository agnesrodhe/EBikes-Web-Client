import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useState, useEffect} from 'react';
import './App.css';

import userModel from './models/users';

/*
Routes for site
*/
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/footer';
import Home from './routes';
import About from './routes/about';
import Client from './routes/admin/handleClient';
import Signin from './routes/signin';
import User from './routes/user';
import Admin from './routes/admin/admincity';
import Prices from './routes/admin/prices';

/*
Header with navbar, router with routes for pages and footer.
*/
function App() {
    const [token, setToken] = useState("");
    const [user, setUserId] = useState("");
    const [role, setUserRole] = useState("");
    const [fullUser, setUser] = useState("loading");

    useEffect(() => {
        (async () => {
            const usr = await axios
                .get('http://localhost:3002/v1/user/githubtoken', {
                    withCredentials: true
                })
                .then((res) => res.data);

            const usr2 = Cookies.get('github-jwt');

            if (!usr && !usr2) {
                setUser(null);
                return;
            }

            const fullUser = await userModel.getUser(usr.id || usr._id || usr2._id);

            setUser(fullUser);
            setUserId(fullUser._id);
            setToken(fullUser.token);
            setUserRole(fullUser.role);
        })();
    }, []);

    return (
        <div className='main'>
            <Router>
                <div className='head'>
                    <Navbar setToken={setToken} token={token}
                        setUserId={setUserId} user={user} role={role}/>
                </div>
                <div className='mainbody'>
                    <Routes>
                        <Route path='/' exact element={<Home />} />
                        <Route path='/om' exact element={<About />} />
                        <Route path='/loggain' element={
                            <Signin setToken={setToken} token={token} setUserId={setUserId}
                                user={user} role={role} setUser={setUser}
                                setUserRole={setUserRole}/>} />
                        <Route path='/anvandare' element={
                            <User token={token} user={user} role={role} fullUser={fullUser}/>} />
                        <Route path='/anvandare/kostnader' element={
                            <Prices token={token} user={user} role={role}/>} />
                        <Route path='/anvandare/kund' element={
                            <Client token={token} user={user} role={role}/>} />
                        <Route path='/anvandare/stad/:stad' element={
                            <Admin token={token} user={user} role={role}/>} />
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
