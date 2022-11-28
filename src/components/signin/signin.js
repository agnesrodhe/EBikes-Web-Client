import React from 'react';
import {NavLink}  from 'react-router-dom';

import { GrGoogle } from "react-icons/gr";

export default function InSigner({setToken, token, setUserId, setUserRole}) {
    return (
        <div  className='body'>
            <div className='bodylogin'>
                <div className='Loginfield'>
                    <h3 className='welcometext'>Välkommen tillbaka</h3>
                    <div className='containerlogin'>
                        <div className='inputlogin'>
                            <div className='inputcontainer'>
                                <label>EMAIL</label>
                                <input placeholder='ange din mail' type="email"></input>
                            </div>
                            <div className='inputcontainer'>
                                <label>LÖSENORD</label>
                                <input placeholder='ange ditt lösenord' type="password"></input>
                            </div>
                            <button className='loginbutton'>LOGGA IN</button>
                            <span className='spanlogin'>eller</span>
                            <button className='loginbuttongoogle'><i><GrGoogle size={11}/></i> Logga in med google</button>
                        </div>
                    </div>
                    <div className='registerspan'>
                        <span className='spanregister'>Inte registrerad? </span>
                        <NavLink exact to="/registrera" className="registerbtn">
                        Registrera dig
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};
