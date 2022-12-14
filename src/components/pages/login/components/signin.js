import React from 'react';
import { useState } from 'react';
import {useNavigate}  from 'react-router-dom';

/*
Import model user to work toward rest:api.
*/
import userModel from '../../../../models/users.js';

/*
Component to show loginform and set variables if logged in correctly.
*/
export default function InSigner({setToken, setUserId, setUserRole}) {
    const [newUser, setNewUser] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    function changeHandler(event) {
        let newObject = {};

        newObject[event.target.name] = event.target.value;
        setNewUser({...newUser, ...newObject});
    }

    async function login() {
        if (!Object.prototype.hasOwnProperty.call(newUser, 'username')
            || !Object.prototype.hasOwnProperty.call(newUser, 'password')) {
            setErrorMessage("Vänligen fyll i alla fält.");
        } else {
            const login = await userModel.login(newUser);

            if (login === "error") {
                setErrorMessage("Fel användarnamn eller lösenord");
            } else if (login.token) {
                setErrorMessage(false);
                setToken(login.token);
                setUserId(login._id);
                setUserRole(login.role);
                navigate('/anvandare');
            }
        }
    }

    return (
        <div  className='body'>
            <div className='bodylogin'>
                <div className='Loginfield'>
                    <h3 className='welcometext'>Välkommen tillbaka</h3>
                    <div className='containerlogin'>
                        <div className='inputlogin'>
                            {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
                            <div className='inputcontainer'>
                                <label>ANVÄNDARE</label>
                                <input onChange={event => changeHandler(event)}
                                    placeholder='ange ditt användarnamn' type="username"
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
                            <button onClick={() => login()} className='loginbutton'>
                                LOGGA IN</button>
                        </div>
                    </div>
                    <div className='registerspan'>
                        <span className='spanregister'>Inte registrerad? </span>
                        <button onClick={() => window.location.replace("http://localhost:3001/")}
                            className="registerbtn">
                        Registrera dig
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
