import React from 'react';
import {useState, useRef} from 'react';
import {NavLink}  from 'react-router-dom';

/*
Import model for users to work toward rest:api.
*/
import userModel from '../../../../models/users.js';

/*
Component for route to update, change or delete user. If used to search for users aswell.
*/
export default function Client({role}) {
    const [advance, setAdvance] = useState(false);
    const [search, setsearch] = useState("");
    const [usr, setUsr] = useState("");
    const [click, setClick] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [deleted, setDeleted] = useState(false);
    const [register, setRegister] = useState(false);
    const handleClick = () => setClick(!click);
    const selectedUserFix = useRef(null);
    const updatedOne = useRef(null);

    //Save and set changes.
    function changeHandler(event) {
        let newObject = {};

        newObject[event.target.name] = event.target.value;
        setsearch({...search, ...newObject});
    }

    //Function to search for user in model user.
    function searcher() {
        updatedOne.current = null;
        setDeleted(false);
        setUsr("");
        if (advance === true) {
            let user = document.getElementById("usrname").value;

            let first = document.getElementById("frstname").value;

            let last = document.getElementById("lstname").value;

            if (user !== "") {
                userModel.getSearchUsername(user).then(function(result) {
                    if (result === "No user found") {
                        setErrorMessage("Ingen användare hittad");
                    } else {
                        setErrorMessage(null);
                        setUsr(result);
                    }
                });
            } else if (first !== "" && last !== "") {
                setErrorMessage(null);
                userModel.getSearchUser(first, last).then(function(result) {
                    if (result === "No user found") {
                        setErrorMessage("Ingen användare hittad");
                    } else {
                        setErrorMessage(null);
                        setUsr(result);
                    }
                });
            } else {
                setErrorMessage("Vänligen fyll i förnamn och efternamn");
            }
        } else {
            userModel.getUser(search.id).then(function(result) {
                if (result === "No user found") {
                    setErrorMessage("Ingen användare hittad");
                } else {
                    setErrorMessage(null);
                    setUsr(result);
                }
            });
        }
    }

    //Set user if found.
    function setAll() {
        setErrorMessage(null);
        userModel.getAllCustomers().then(function(result) {
            if (result === "No user found") {
                setErrorMessage("Ingen användare hittad");
            } else {
                setErrorMessage(null);
                setUsr(result);
            }
        });
    }

    //Select one user.
    function SelectOne(value) {
        selectedUserFix.current = "choosen";
        updatedOne.current = "";
        setSelectedUser(value.history);
    }

    //Update user.
    function updateOne(value) {
        updatedOne.current = "updated";
        selectedUserFix.current = "";
        setSelectedUser(value);
    }

    //Uppdate changes with model users.
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

    //Delete user.
    function deleteUpdate(picked) {
        if (deleted === true) {
            setDeleted(false);
            userModel.deleteUser(picked._id);
            setUsr("");
            selectedUserFix.current = null;
            updatedOne.current = null;
        } else {
            setDeleted(true);
        }
    }

    //Register new client.
    function registerNew() {
        let user = document.getElementById("username2").value;

        let first = document.getElementById("first2").value;

        let last = document.getElementById("last2").value;

        let password = document.getElementById("passw2").value;


        if (user && first && last && password) {
            let value = { username: user,
                firstName: first,
                lastName: last,
                password: password};

            userModel.register(value).then(function(result) {
                setErrorMessage(result);
            });
        } else {
            setErrorMessage("Fyll i alla fält.");
        }
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
                            Tillbaka till startsidan
                        </NavLink>
                        <h1 className='clientdata'>Kundhantering</h1>
                        {advance === false ?
                            <>
                                {register === true ?
                                    <>
                                        <h2 className='h22'>Skapa Kund</h2>
                                        {errorMessage && <p className ="error">{errorMessage}</p>}
                                        <div>
                                            <p className='infonames2'>Förnamn: *</p>
                                            <input id="first2" className="updateinputs2"/>
                                            <p className='infonames2'>Efternamn: *</p>
                                            <input id="last2" className="updateinputs2"/>
                                            <p className='infonames2'>Användarnamn: *</p>
                                            <input id="username2" className="updateinputs2"/>
                                            <p className='infonames2'>Lösenord: *</p>
                                            <input id="passw2" className="updateinputs2"/>
                                            <p className='infonames4'>* får inte lämnas tomt.
                                            </p>
                                            <button onClick={() => registerNew()}
                                                className="buttonsavedata">
                                                    Registrera ny kund</button>
                                        </div>
                                    </>
                                    :
                                    <div className='Loginfield'>
                                        <h3 className='welcometext'>Sök efter användare</h3>
                                        {errorMessage && <p className ="error">{errorMessage}</p>}
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
                                        <div className='registerspan'>
                                            <span className='spanregister'>
                                                Vill du skapa användare? </span>
                                            <button onClick={() =>
                                                setRegister(true)}
                                            className="registerbtn">
                                            Registrera
                                            </button>
                                        </div>
                                    </div>
                                }
                            </>
                            :
                            <div>
                                <div className='Loginfield'>
                                    <h3 className='welcometext'>Sök efter kund</h3>
                                    {errorMessage && <p className ="error">
                                        {errorMessage}</p>}
                                    <div className='containerlogin'>
                                        <div className='inputlogin'>
                                            <div className='inputcontainer'>
                                                <label>Användarnamn</label>
                                                <input onChange={event => changeHandler(event)}
                                                    placeholder='ange användarnamn' type="username"
                                                    name="username" id="usrname">
                                                </input>
                                            </div>
                                            <h4>Kan du inte användarnamnet?</h4>
                                            <h4>Vänligen fyll i förnamnnamn och efternamn:</h4>
                                            <div className='inputcontainer'>
                                                <label>Namn</label>
                                                <input onChange={event => changeHandler(event)}
                                                    placeholder='ange förnamn' type="firstName"
                                                    name="firstName" id="frstname">
                                                </input>
                                            </div>
                                            <div className='inputcontainer'>
                                                <label>Efternamn</label>
                                                <input onChange={event => changeHandler(event)}
                                                    placeholder='ange efternamn' type="lastName"
                                                    name="lastName" id="lstname">
                                                </input>
                                            </div>
                                            <button onClick={() => searcher()}
                                                className='loginbutton'>
                                                AVANCERAD SÖKNING</button>
                                            <button onClick={() => setAll()}
                                                className='loginbutton'>
                                                Alla användare</button>
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
                                        <th>Roll:</th>
                                        <th>Ändra</th>
                                        <th>Resehistorik</th>
                                    </tr>
                                    {Array.isArray(usr)
                                        ?
                                        usr.map(value => {
                                            return (
                                                <tr>
                                                    <td>{value._id}</td>
                                                    <td>{value.firstName}</td>
                                                    <td>{value.lastName}</td>
                                                    <td>{value.username}</td>
                                                    <td>{value.role}</td>
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
                                {deleted ?
                                    <>
                                        <h3 className='del'>
                                            Är du säker på att du vill radera användare: {
                                                selectedUser.username}?</h3>
                                        <h4 className='del'>
                                            Klicka på <i>"Radera anvädare"
                                            </i> igen om du är säker.</h4>
                                    </>
                                    : null}
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
                                    <button onClick={() => deleteUpdate(selectedUser)}
                                        className="buttonsavedata2">Radera användare</button>
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
