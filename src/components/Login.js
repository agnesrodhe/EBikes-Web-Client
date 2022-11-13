import { useState } from 'react';

//import authModel from '../models/auth';

//Login function to register new user and login if user is found and set value token when logged in.
export default function Login({setToken, setUserId, setUserRole}) {
    const [user, setUser] = useState({});

    function changeHandler(event) {
        let newObject = {};

        newObject[event.target.name] = event.target.value;

        setUser({...user, ...newObject});
    }

    function printer() {
        console.log("hej")
    }
/*
    async function register() {
        await authModel.register(user).then(function(result){
            alert("User successfully created, please login.")
        });
    }

    async function login() {
        const loginResult = await authModel.login(user);

        if (loginResult.data.token) {
            setToken(loginResult.data.token);
            setUserId(loginResult.data._id);
        } else {
            alert("No user found with this data. Check if email and password are correct.")
        }
    }
*/
    return (
        <>
            <div className="login-card">
                <h2 className='h2login'>Logga in</h2>
                    <div className="form-group">
                        <input type="email" className="emailinput" placeholder="Enter email" name="email" onChange={changeHandler}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="emailinput" placeholder="Enter password" name="password" onChange={changeHandler}/>
                    </div>
                    <button onClick={printer()} className="button">Logga in</button>
            </div>
        </>
    );
}