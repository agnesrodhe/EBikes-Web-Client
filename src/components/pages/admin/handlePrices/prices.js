import React from 'react';
import {useState, useEffect} from 'react';
import {NavLink}  from 'react-router-dom';

import priceModel from '../../../../models/prices';

export default function Prices({role}) {
    const [click, setClick] = useState(false);
    const [prices, setPrices] = useState("");

    const handleClick = () => setClick(!click);

    useEffect(() => {
        priceModel.getPrice().then(function(result) {
            setPrices(result);
            console.log(result);
            console.log(prices);
        });
    }, []);

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
                        <h1 className='clientdata'>Kostnader och priser</h1>
                    </div>
                </div>
                :
                <div className='body'>
                    <h1 className='cityname'>Oops... Har du gått vilse?</h1>
                </div>}
        </div>
    );
}
