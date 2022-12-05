import React from 'react';
import { useState } from 'react';
import {NavLink, useNavigate}  from 'react-router-dom';

import userModel from '../../models/users.js';

export default function InSigner({setToken, token, setUserId, setUserRole, user}) {
    const [newUser, setNewUser] = useState("")
    const [errorCatcher, seterrorCatcher] = useState(false)
    const navigate = useNavigate();

    function changeHandler(event) {
        let newObject = {};
        newObject[event.target.name] = event.target.value;
        setNewUser({...newUser, ...newObject});
    }

    async function login() {
        await userModel.login(newUser).then(function(res){
            console.log(res)
            if (res.error) {
                seterrorCatcher(true)
            } else if (res.token) {
                seterrorCatcher(false)
                setToken(res.token);
                setUserId(res._id);
                setUserRole(res.role);
                navigate('/anvandare');
            }
        })
    }

    return (
        <div  className='body'>
            <div className='bodylogin'>
                <div className='Loginfield'>
                    <h3 className='welcometext'>Välkommen tillbaka</h3>
                    <div className='containerlogin'>
                        <div className='inputlogin'>
                        {errorCatcher ? <span className='spanregister'>Felaktigt lösenord eller email. Försök igen.</span> :null}
                            <div className='inputcontainer'>
                                <label>ANVÄNDARE</label>
                                <input onChange={event => changeHandler(event)} placeholder='ange ditt användarnamn' type="username" name="username"></input>
                            </div>
                            <div className='inputcontainer'>
                                <label>LÖSENORD</label>
                                <input onChange={event => changeHandler(event)} placeholder='ange ditt lösenord' type="password" name="password"></input>
                            </div>
                            <button onClick={() => login()} className='loginbutton'>LOGGA IN</button>
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
