import React from 'react';
import {useState, useEffect} from 'react';
import {NavLink}  from 'react-router-dom';

/*
Import model to work towars prices in rest:api.
*/
import priceModel from '../../../../models/prices';

/*
Component to route to change prices in all cities.
*/
export default function Prices({role}) {
    const [click, setClick] = useState(false);
    const [prices, setPrices] = useState("");
    const [message, setMessage] = useState(false);
    const [error, setError] = useState(false);
    const handleClick = () => setClick(!click);

    useEffect(() => {
        priceModel.getPrice().then(function(result) {
            setPrices(result);
        });
    }, []);

    function saveUpdate() {
        let start = document.getElementById("startfee").value;

        let minutetaxa = document.getElementById("minutetaxa").value;

        let penaltyfee = document.getElementById("penaltyfee").value;

        let bonus = document.getElementById("bonus").value;

        if (!isNaN(+start) && !isNaN(+minutetaxa) && !isNaN(+penaltyfee) && !isNaN(+bonus)) {
            let value = { bonus: bonus,
                startfee: start,
                minutetaxa: minutetaxa,
                penaltyfee: penaltyfee};

            priceModel.updatePrice(prices[0]._id, value)
                .then(function() {
                    priceModel.getPrice().then(function(result) {
                        setPrices(result);
                        setMessage(true);
                    });
                });
        } else {
            setError(true);
        }
    }

    function changeHandler() {
        setMessage(false);
        setError(false);
    }

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
                        {prices &&
                            <div className='pricebox'>
                                <h2>Uppdatera priser i alla sträder</h2>
                                <h4>Alla summor är i kronor, sek.</h4>
                                {message && <h3>Prisändringen är nu sparad!</h3>}
                                {error && <h3>Ange priserna med siffra.</h3>}
                                <div>
                                    <p className='infoname'>Startavgift:</p>
                                    <input id="startfee" className="updateinput"
                                        defaultValue={prices[0].startfee} onChange={changeHandler}/>
                                    <p className='infoname'>Minuttaxa:</p>
                                    <input id="minutetaxa" className="updateinput"
                                        defaultValue={prices[0].minutetaxa
                                        } onChange={changeHandler}/>
                                    <p className='infoname'>Straffavgift:</p>
                                    <input id="penaltyfee" className="updateinput"
                                        defaultValue={prices[0].penaltyfee}
                                        onChange={changeHandler}/>
                                    <p className='infoname'>Bonus:</p>
                                    <input id="bonus" className="updateinput"
                                        defaultValue={prices[0].bonus} onChange={changeHandler}/>
                                    <button onClick={() => saveUpdate()}
                                        className="buttonsavedata">Spara ändring</button>
                                </div>
                            </div>}
                    </div>
                </div>
                :
                <div className='body'>
                    <h1 className='cityname'>Oops... Har du gått vilse?</h1>
                </div>}
        </div>
    );
}
