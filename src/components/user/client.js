import React from 'react';
import {useState, useEffect} from 'react';


export default function Client({token, user, role}) {
    const [comp, setComponent] = useState("")

    //Update and set documents as initial stage.
    useEffect(() => {
        clickhandler("userdata")
    }, []);

    //To render one-page
    async function clickhandler(value) {
        if (value === "userdata"){
            setComponent("userdata")
        } else if (value === "saldo"){
            setComponent("saldo")
        } else if (value === "history"){
            setComponent("history")
        }
    };

    return (
        <div>
            <div className='navloggedinuser'>
                <ul className='navloggedinuser'>
                    <li className='menuitemsloggedinuser'>
                    <button className='buttonifloggedin' onClick={() => clickhandler("userdata")}>Mitt konto</button>
                    </li>
                    <li className='menuitemsloggedinuser'>
                    <button className='buttonifloggedin' onClick={() => clickhandler("saldo")}>Saldo</button>
                    </li>
                    <li className='menuitemsloggedinuser'>
                    <button className='buttonifloggedin' onClick={() => clickhandler("history")}>Resehistorik</button>
                    </li>
                </ul>
            </div>
            {comp === "userdata" ?
                <>
                    <h1 className='cityname'>Mitt konto</h1>
                </>
                : comp === "saldo" ?
                <>
                <h1 className='cityname'>Saldo</h1>
                </>
                : comp === "history" ?
                    <>
                    <h1 className='cityname'>Resehistorik</h1>
                    </>
                : null}
        </div>
    );
};
