import React from 'react';
import {NavLink}  from 'react-router-dom';

import { GrGoogle } from "react-icons/gr";

export default function Register({setToken, token, setUserId, setUserRole}) {
    return (
        <div  className='body'>
            <div className='bodylogin'>
                <div className='Loginfield'>
                    <h3 className='welcometext'>Skapa ny användare</h3>
                    <div className='containerlogin'>
                        <div className='inputlogin'>
                        <div className='inputcontainer'>
                                <label>FÖRNAMN</label>
                                <input placeholder='ange ditt förnamn' type="email"></input>
                            </div>
                            <div className='inputcontainer'>
                                <label>EFTERNAMN</label>
                                <input placeholder='ange ditt efternamn' type="email"></input>
                            </div>
                            <div className='inputcontainer'>
                                <label>EMAIL</label>
                                <input placeholder='ange din mail' type="email"></input>
                            </div>
                            <div className='inputcontainer'>
                                <label>LÖSENORD</label>
                                <input placeholder='ange ditt lösenord' type="password"></input>
                            </div>
                            <div className='inputcontainer'>
                                <label>UPPREPA LÖSENORD</label>
                                <input placeholder='ange ditt lösenord igen' type="password"></input>
                            </div>
                            <button className='loginbutton'>Registrera</button>
                            <span className='spanlogin'>eller</span>
                            <button className='loginbuttongoogle'><i><GrGoogle size={11}/></i> Registrera med google</button>
                        </div>
                    </div>
                    <div className='registerspan'>
                        <span className='spanregister'>Redan registrerad? </span>
                        <NavLink exact to="/registrera" className="registerbtn">
                        Logga in
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};
