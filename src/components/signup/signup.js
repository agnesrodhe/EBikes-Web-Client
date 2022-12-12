import React from 'react';
import { useState } from 'react';
import {NavLink, useNavigate}  from 'react-router-dom';

import userModel from '../../models/users.js';

export default function Register() {
    const [newUser, setNewUser] = useState("");
    const [errorCatcher, seterrorCatcher] = useState(false);
    const navigate = useNavigate();

    function changeHandler(event) {
        let newObject = {};

        newObject[event.target.name] = event.target.value;
        setNewUser({...newUser, ...newObject});
    }

    async function sendNewUser() {
        await userModel.register(newUser).then(function(res) {
            if (res.error) {
                seterrorCatcher(true);
            } else if (res.token) {
                navigate('/loggain');
            }
        });
    }

    return (
        <div  className='body'>
            <div className='bodylogin'>
                <div className='Loginfield'>
                    <h3 className='welcometext'>Skapa ny användare</h3>
                    <div className='containerlogin'>
                        <div className='inputlogin'>
                            {errorCatcher ?
                                <span className='spanregister'>
                                    Användare med denna email existerar redan.
                                </span>
                                :null}
                            <div className='inputcontainer'>
                                <label>FÖRNAMN</label>
                                <input onChange={event => changeHandler(event)}
                                    placeholder='ange ditt förnamn' type="firstname"
                                    name="firstname">
                                </input>
                            </div>
                            <div className='inputcontainer'>
                                <label>EFTERNAMN</label>
                                <input onChange={event => changeHandler(event)}
                                    placeholder='ange ditt efternamn' type="lastname"
                                    name="lastname">
                                </input>
                            </div>
                            <div className='inputcontainer'>
                                <label>ANVÄNDARE</label>
                                <input onChange={event => changeHandler(event)}
                                    placeholder='ange ett användarnamn' type="username"
                                    name="username">
                                </input>
                            </div>
                            <div className='inputcontainer'>
                                <label>LÖSENORD</label>
                                <input onChange={event => changeHandler(event)}
                                    placeholder='ange ditt lösenord' type="password"
                                    name="password">
                                </input>
                            </div>
                            <div className='inputcontainer'>
                                <label>UPPREPA LÖSENORD</label>
                                <input placeholder='ange ditt lösenord igen' type="password">
                                </input>
                            </div>
                            <button onClick={() => sendNewUser()} className='loginbutton'>
                                Registrera</button>
                        </div>
                    </div>
                    <div className='registerspan'>
                        <span className='spanregister'>Redan registrerad? </span>
                        <NavLink exact to="/loggain" className="registerbtn">
                        Logga in
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
