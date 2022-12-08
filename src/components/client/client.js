import React from 'react';
import {useState, useEffect} from 'react';

import userModel from '../../models/users.js';

export default function Client({/*token,*/ user/*, role*/}) {
    const [comp, setComponent] = useState("");
    const [fullUser, setFullUser] = useState("");

    //Update and set documents as initial stage.
    useEffect(() => {
        clickhandler("userdata");
        userModel.getUser(user).then(function(result) {
            setFullUser(result);
            console.log(result);
        });
    }, []);

    //To render one-page
    async function clickhandler(value) {
        if (value === "userdata") {
            setComponent("userdata");
        } else if (value === "saldo") {
            setComponent("saldo");
        } else if (value === "history") {
            setComponent("history");
        }
    }

    return (
        <div>
            <div className='navloggedinuser'>
                <ul className='navloggedinuser'>
                    <li className='menuitemsloggedinuser'>
                        <button className='buttonifloggedin'
                            onClick={() => clickhandler("userdata")}>
                            Mitt konto</button>
                    </li>
                    <li className='menuitemsloggedinuser'>
                        <button className='buttonifloggedin'
                            onClick={() => clickhandler("saldo")}>
                            Saldo</button>
                    </li>
                    <li className='menuitemsloggedinuser'>
                        <button className='buttonifloggedin'
                            onClick={() => clickhandler("history")}>
                            Resehistorik</button>
                    </li>
                </ul>
            </div>
            {comp === "userdata" ?
                <div>
                    <h1 className='cityname'>Välkommen {fullUser.name} </h1>
                    <div className='adminindex'>
                        <h1 className='clientdata'>Min sida</h1>
                    </div>
                </div>
                : comp === "saldo" ?
                    <div>
                        <h1 className='cityname'>Välkommen {fullUser.name} </h1>
                        <div className='adminindex'>
                            <h1 className='clientdata'>Saldo</h1>
                        </div>
                    </div>
                    : comp === "history" ?
                        <div>
                            <h1 className='cityname'>Välkommen {fullUser.name} </h1>
                            <div className='adminindex'>
                                <h1 className='clientdata'>Resehistorik</h1>
                            </div>
                        </div>
                        : null}
        </div>
    );
}
