import React from 'react';
import {useState} from 'react';
import {NavLink}  from 'react-router-dom';

//Functions
import functionsModel from "./components/functions";

/*
Component to route to change prices in all cities.
*/
export default function Prices({role, pricesInit}) {
    const [click, setClick] = useState(false);
    const [pricesMain, setPricesMain] = useState("");
    const [message, setMessage] = useState(false);
    const [error, setError] = useState(false);
    const handleClick = () => setClick(!click);

    return (
        <div className='body'>
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
                        {pricesMain ?
                            <div className='pricebox'>
                                <h2>Uppdatera priser i alla sträder</h2>
                                <h4>Alla summor är i kronor, sek.</h4>
                                {message === true ? <h3>Prisändringen är nu sparad!</h3>:
                                    <h3>{message}</h3>}
                                {error === true ? <h3>Ange priserna med siffra.</h3>:
                                    <h3>{error}</h3>}
                                <div>
                                    <p className='infoname'>Startavgift:</p>
                                    <input id="startfee" className="updateinput"
                                        defaultValue={pricesMain.startfee} onChange={() => {
                                            setMessage(false);
                                            setError(false);
                                        }}/>
                                    <p className='infoname'>Minuttaxa:</p>
                                    <input id="minutetaxa" className="updateinput"
                                        defaultValue={pricesMain.minutetaxa
                                        } onChange={() => {
                                            setMessage(false);
                                            setError(false);
                                        }}/>
                                    <p className='infoname'>Straffavgift:</p>
                                    <input id="penaltyfee" className="updateinput"
                                        defaultValue={pricesMain.penaltyfee}
                                        onChange={() => {
                                            setMessage(false);
                                            setError(false);
                                        }}/>
                                    <p className='infoname'>Bonus:</p>
                                    <input id="bonus" className="updateinput"
                                        defaultValue={pricesMain.bonus} onChange={() => {
                                            setMessage(false);
                                            setError(false);
                                        }}/>
                                    <button onClick={() => {
                                        functionsModel.saveUpdate(
                                            document.getElementById("startfee").value,
                                            document.getElementById("minutetaxa").value,
                                            document.getElementById("penaltyfee").value,
                                            document.getElementById("bonus").value,
                                            {pricesMain, pricesInit, setPricesMain,
                                                setMessage, setError
                                            }
                                        );
                                    }}
                                    className="buttonsavedata">Spara ändring</button>
                                </div>
                            </div>:
                            <div className='pricebox'>
                                <h2>Uppdatera priser i alla sträder</h2>
                                <h4>Alla summor är i kronor, sek.</h4>
                                {message === true ? <h3>Prisändringen är nu sparad!</h3>:
                                    <h3>{message}</h3>}
                                {error === true ? <h3>Ange priserna med siffra.</h3>:
                                    <h3>{error}</h3>}
                                <div>
                                    <p className='infoname'>Startavgift:</p>
                                    <input id="startfee" className="updateinput"
                                        defaultValue={pricesInit.startfee} onChange={() => {
                                            setMessage(false);
                                            setError(false);
                                        }}/>
                                    <p className='infoname'>Minuttaxa:</p>
                                    <input id="minutetaxa" className="updateinput"
                                        defaultValue={pricesInit.minutetaxa
                                        } onChange={() => {
                                            setMessage(false);
                                            setError(false);
                                        }}/>
                                    <p className='infoname'>Straffavgift:</p>
                                    <input id="penaltyfee" className="updateinput"
                                        defaultValue={pricesInit.penaltyfee}
                                        onChange={() => {
                                            setMessage(false);
                                            setError(false);
                                        }}/>
                                    <p className='infoname'>Bonus:</p>
                                    <input id="bonus" className="updateinput"
                                        defaultValue={pricesInit.bonus} onChange={() => {
                                            setMessage(false);
                                            setError(false);
                                        }}/>
                                    <button onClick={() => {
                                        functionsModel.saveUpdate(
                                            document.getElementById("startfee").value,
                                            document.getElementById("minutetaxa").value,
                                            document.getElementById("penaltyfee").value,
                                            document.getElementById("bonus").value,
                                            {pricesMain, pricesInit, setPricesMain,
                                                setMessage, setError,
                                            }
                                        );
                                    }}
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
