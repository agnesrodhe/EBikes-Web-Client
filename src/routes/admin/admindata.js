import React from 'react';
import {useState} from 'react';
import {NavLink}  from 'react-router-dom';

export default function Admindata({token, user, role}) {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    return (
        <div  className='body'>
        {role === "admin" ?
            <div>
            <h1 className='cityname'>Administratör</h1>
            <div className='adminindex'>
            <NavLink
                    exact
                    to="/anvandare"
                    activeClassName="active"
                    className="nav-links-back"
                    onClick={click ? handleClick : null}
                >
                    Tillbaka
                </NavLink>
                <h1 className='clientdata'>Hantera administratörer</h1>
            </div>
        </div>
            : 
            <div className='body'>
                <h1 className='cityname'>Oops... Har du gått vilse?</h1>
            </div>}
        </div>
    );
    };
