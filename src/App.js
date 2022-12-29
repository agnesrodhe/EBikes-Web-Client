import React from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

import priceModel from './models/prices';
import userModel from './models/users';
const baseURL = "http://localhost:3002";

/*
Routes for site
*/
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/footer';
import Home from './components/pages/homepage';
import About from './components/pages/about/about';
import Client from './components/pages/admin/handleUsers/handleClient';
import Signin from './components/pages/login/signin';
import User from './components/pages/login/usercheck';
import Admin from './components/pages/admin/handleBikes/admincity';
import Prices from './components/pages/admin/handlePrices/prices';

/*
Header with navbar, router with routes for pages and footer.
*/
function App() {
    const [token, setToken] = useState("");
    const [user, setUserId] = useState("");
    const [role, setUserRole] = useState("");
    const [fullUser, setUser] = useState("loading");
    const [pricesInit, setPricesInit] = useState("");

    useEffect(() => {
        (async () => {
            const usr = await axios.get(`${baseURL}/v1/user/githubtoken`, {
                withCredentials: true
            })
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    // Error
                    if (error.response) {
                        console.log(error.response);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                });

            const usr2 = Cookies.get('github-jwt');

            if (!usr && !usr2) {
                setUser(null);
                return;
            }

            const fullUser = await userModel.getUser(usr.id || usr._id || usr2._id);

            const prices = await priceModel.getPrice();

            setPricesInit(prices[0]);
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
                        setUserId={setUserId} user={user} role={role} setUserRole={setUserRole}/>
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
                            <Prices token={token} user={user} role={role}
                                pricesInit={pricesInit}/>} />
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
