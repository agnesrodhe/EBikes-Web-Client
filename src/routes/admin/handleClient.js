import React from 'react';
import {useState, useRef} from 'react';
import {NavLink}  from 'react-router-dom';

import userModel from '../../models/users.js';

export default function Client({role}) {
    const [advance, setAdvance] = useState(false);
    const [search, setsearch] = useState("");
    const [usr, setUsr] = useState("");
    const [click, setClick] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const handleClick = () => setClick(!click);
    const selectedUserFix = useRef(null);
    const updatedOne = useRef(null);

    function changeHandler(event) {
        let newObject = {};

        newObject[event.target.name] = event.target.value;
        setsearch({...search, ...newObject});
    }

    function searcher() {
        if (advance === true) {
            console.log(search);
        } else {
            userModel.getUser(search.id).then(function(result) {
                console.log(result);
                setUsr(result);
            });
        }
    }

    function SelectOne(value) {
        selectedUserFix.current = "choosen";
        updatedOne.current = null;
        setSelectedUser(value.history);
    }

    function updateOne(value) {
        updatedOne.current = "updated";
        setSelectedUser(value);
    }

    function saveUpdate() {
        let id = document.getElementById("id").value;

        let user = document.getElementById("username").value;

        let first = document.getElementById("first").value;

        let last = document.getElementById("last").value;


        let value = { username: user,
            firstName: first,
            lastName: last};

        userModel.updateUser(id, value)
            .then(function() {
                userModel.getUser(id).then(function(result) {
                    setUsr(result);
                });
            });
        selectedUserFix.current = null;
        updatedOne.current = null;
        setSelectedUser(null);
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
                            onClick={click ? handleClick : null}>
                            Tillbaka
                        </NavLink>
                        <h1 className='clientdata'>Kundhantering</h1>
                        {advance === false ?
                            <div>
                                <div className='Loginfield'>
                                    <h3 className='welcometext'>Sök efter användare</h3>
                                    <div className='containerlogin'>
                                        <div className='inputlogin'>
                                            <div className='inputcontainer'>
                                                <label>Användarens ID:</label>
                                                <input onChange={event => changeHandler(event)}
                                                    placeholder='ange id' type="id"
                                                    name="id">
                                                </input>
                                            </div>
                                            <button onClick={() => searcher()}
                                                className='loginbutton'>
                                                SÖK</button>
                                        </div>
                                    </div>
                                    <div className='registerspan'>
                                        <span className='spanregister'>
                                            Du kan inte kundens id? </span>
                                        <button onClick={() =>
                                            setAdvance(true)}
                                        className="registerbtn">
                                        Avancerad sökning
                                        </button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                <div className='Loginfield'>
                                    <h3 className='welcometext'>Sök efter kund</h3>
                                    <div className='containerlogin'>
                                        <div className='inputlogin'>
                                            <div className='inputcontainer'>
                                                <label>Användarnamn</label>
                                                <input onChange={event => changeHandler(event)}
                                                    placeholder='ange kundens id' type="id"
                                                    name="id">
                                                </input>
                                            </div>
                                            <div className='inputcontainer'>
                                                <label>Namn</label>
                                                <input onChange={event => changeHandler(event)}
                                                    placeholder='ange kundens id' type="id"
                                                    name="id">
                                                </input>
                                            </div>
                                            <div className='inputcontainer'>
                                                <label>Efternamn</label>
                                                <input onChange={event => changeHandler(event)}
                                                    placeholder='ange kundens id' type="id"
                                                    name="id">
                                                </input>
                                            </div>
                                            <button onClick={() => searcher()}
                                                className='loginbutton'>
                                                AVANCERAD SÖKNING</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {Array.isArray(usr)
                            ?
                            <div>
                                <h3 className='welcometext'>Hittade kunder</h3>
                                <tbody className='table3'>
                                    <tr>
                                        <th>ID:</th>
                                        <th>Förnamn:</th>
                                        <th>Efternamn:</th>
                                        <th>Användarnamn:</th>
                                        <th>Ändra</th>
                                        <th>Resehistorik</th>
                                    </tr>
                                    {Array.isArray(usr)
                                        ?
                                        usr.map(value => {
                                            return (
                                                <tr>
                                                    <td>{value._id}</td>
                                                    <td>{value.firstname}</td>
                                                    <td>{value.lastname}</td>
                                                    <td>{value.username}</td>
                                                    <td>
                                                        <button className='buttononselect'
                                                            onClick={() =>{updateOne(value);}}>
                                                                Uppdatera</button>
                                                    </td>
                                                    <td>
                                                        <button className='buttononselect'
                                                            onClick={() =>{SelectOne(value);}}>
                                                                Resehistorik</button>
                                                    </td>
                                                </tr>);
                                        })
                                        : null}
                                </tbody>
                            </div>
                            : usr ?
                                <div>
                                    <h2 className='kundtit'>Hittad kund</h2>
                                    <tbody className='table3'>
                                        <tr>
                                            <th>ID:</th>
                                            <th>Förnamn:</th>
                                            <th>Efternamn:</th>
                                            <th>Användarnamn:</th>
                                            <th>Ändra</th>
                                            <th>Resehistorik</th>
                                        </tr>
                                        <tr>
                                            <td>{usr._id}</td>
                                            <td>{usr.firstName}</td>
                                            <td>{usr.lastName}</td>
                                            <td>{usr.username}</td>
                                            <td>
                                                <button className='buttononselect'
                                                    onClick={() =>{updateOne(usr);}}>
                                                        Uppdatera användaren</button>
                                            </td>
                                            <td>
                                                <button className='buttononselect'
                                                    onClick={() =>{SelectOne(usr);}}>
                                                        Resehistorik</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </div>
                                : null}
                        {selectedUserFix.current === "choosen" ?
                            <>
                                {selectedUser !== null ?
                                    <>
                                        <div className='infobox'>
                                            <h3 className='welcometext'>Resehistorik</h3>
                                            {Array.isArray(selectedUser) && selectedUser.length > 0
                                                ?
                                                <tbody className='tablehistory'>
                                                    <th>Resa:</th>
                                                    <th>Rese ID:</th>
                                                    <th>Starttid:</th>
                                                    <th>Stopptid:</th>
                                                    {selectedUser.map(value => {
                                                        let count = 0;

                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td>{count + 1}</td>
                                                                    <td>{value._id}</td>
                                                                    <td>{value.startTime}</td>
                                                                    <td>{value.stopTime}</td>
                                                                </tr>
                                                            </>
                                                        );
                                                    })}
                                                </tbody> :<h4>Ingen resehistorik</h4>}
                                        </div>
                                    </>
                                    : null}
                            </>
                            : null}
                        {updatedOne.current === "updated" ?
                            <div className='updateboxes'>
                                <h2 className='h2'>Ändra användare</h2>
                                <div>
                                    <p className='infonames'>ID (kan ej ändras):</p>
                                    <input id="id" className="updateinputs"
                                        defaultValue={selectedUser._id} readOnly />
                                    <p className='infonames'>Användarnamn:</p>
                                    <input id="username" className="updateinputs"
                                        defaultValue={selectedUser.username} readOnly/>
                                    <p className='infonames'>Förnamn:</p>
                                    <input id="first" className="updateinputs"
                                        defaultValue={selectedUser.firstName}/>
                                    <p className='infonames'>Efternamn:</p>
                                    <input id="last" className="updateinputs"
                                        defaultValue={selectedUser.lastName}/>
                                    <button onClick={() => saveUpdate()}
                                        className="buttonsavedata">Spara ändring</button>
                                </div>
                            </div>
                            : null}
                    </div>
                </div>
                :
                <div className='body'>
                    <h1 className='cityname'>Oops... Har du gått vilse?</h1>
                </div>}
        </div>
    );
}
