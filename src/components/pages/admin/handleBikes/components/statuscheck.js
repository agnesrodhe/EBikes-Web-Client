import React from 'react';
import { useEffect, useState, useRef } from 'react';

import bikesModel from '../../../../../models/bikes.js';

export default function StatusCheck({city, cityID}) {
    const [bikes, setBikes] = useState("");
    const [selectedOption, setSelectedOption] = useState("Alla");
    const [selectedBike, setSelectedBike] = useState(null);
    const [status, setStatus] = useState(null);
    const [savedStatus, setsavedStatus] = useState(null);
    const selectedBikeFix = useRef(null);
    const updatedOne = useRef(null);

    useEffect(() => {
        selectedBikeFix.current = null;
        setBikes("No active bikes in this city");
        updateBikes();
        // eslint-disable-next-line
    }, []);

    function updateBikes() {
        bikesModel.getAllBikesCity(cityID.current).then(function(result) {
            setBikes(result);
            setStatus(result);
        });
    }

    function statusGenerator(value) {
        selectedBikeFix.current = null;
        updatedOne.current = null;
        setSelectedBike(null);
        setSelectedOption(value);
        if (value === "Alla") {
            setStatus(bikes);
        } else if (value === "Aktiva") {
            let array = [];

            bikes.forEach((value) => {
                if (value.active !== null) {
                    array.push(value);
                }
                console.log(array);
                setStatus(array);
            });
        } else if (value === "Parkerade") {
            let array = [];

            bikes.forEach((value) => {
                if (value.parked !== null) {
                    array.push(value);
                }
                setStatus(array);
            });
        } else if (value === "Laddande") {
            let array = [];

            bikes.forEach((value) => {
                if (value.charging !== null) {
                    array.push(value);
                }
                setStatus(array);
            });
        } else if (value === "Behöver laddas") {
            let array = [];

            bikes.forEach((value) => {
                console.log(value.status);
                if (value.status === "noBattery" && value.charging === null) {
                    array.push(value);
                }
                setStatus(array);
            });
        } else if (value === "Behöver service") {
            let array = [];

            bikes.forEach((value) => {
                if (value.status === "needService") {
                    array.push(value);
                }
                setStatus(array);
            });
        }
    }

    function SelectOne(value) {
        selectedBikeFix.current = "choosen";
        updatedOne.current = null;
        setsavedStatus(selectedOption);
        setStatus([value]);
        setSelectedBike(value.history);
        console.log(value.history);
    }

    function unSelectOne(value) {
        selectedBikeFix.current = null;
        updatedOne.current = null;
        statusGenerator(value);
        setSelectedBike(null);
    }

    function updateOne() {
        updatedOne.current = "updated";
        setSelectedBike(null);
    }

    function saveUpdate() {
        let id = document.getElementById("id").value;

        let name = document.getElementById("name").value;

        let cityid = document.getElementById("city").value;

        let works = document.getElementById("works").value;

        let battery = document.getElementById("battery").value;


        let value = { name: name,
            inCity: cityid,
            status: works,
            batterylevel: battery,
            location: status[0].location};

        bikesModel.updateOneBike(id, value)
            .then(function() {
                updateBikes();
                statusGenerator(savedStatus);
            });
    }

    function changeHandler() {
    }

    return (
        <div className='body'>
            <div className='bodystatus'>
                <div className='boxselect'>
                    <h2 className='h2status'>{selectedOption} i {city}</h2>
                    <h3>
                        <label for="cars">Val av statusområde: </label>
                    </h3>
                    <div className='selectoption'>
                        <select value={selectedOption}
                            onChange={e => statusGenerator(e.target.value)}
                            name="areastatus" id="areastatus">
                            <option className='optionbox' value="Alla"> Alla </option>
                            <option className='optionbox' value="Aktiva">Aktiva</option>
                            <option className='optionbox' value="Parkerade">Parkerade</option>
                            <option className='optionbox' value="Laddande">Laddande</option>
                            <option className='optionbox' value="Behöver laddas">
                                Behöver laddas</option>
                            <option className='optionbox' value="Behöver service">
                                Behöver service</option>
                        </select>
                    </div>
                </div>
                {status === null ?
                    <>
                    </>
                    :
                    <>
                        <tbody className='table'>
                            <tr>
                                <th>ID:</th>
                                <th>Namn:</th>
                                <th>Statuskod:</th>
                                <th>Aktiv (kund id):</th>
                                <th>Laddar:</th>
                                <th>Parkerad:</th>
                                <th>Batterinivå:</th>
                                {selectedBikeFix.current !== null ?
                                    <th>Hantering:</th>
                                    : <th>Historik:</th>}
                            </tr>
                            {Array.isArray(status)
                                ?
                                status.map(value => {
                                    return (
                                        <tr>
                                            <td>{value._id}</td>
                                            <td>{value.name}</td>
                                            <td>{value.status}</td>
                                            {value.active !== null ?
                                                <td>{value.active}</td> :<td>Inte aktiv</td>}
                                            {value.charging !== null ?
                                                <td>Ja</td> : <td>Nej</td>}
                                            {value.parked !== null ?
                                                <td>Ja</td> :<td>Nej</td>}
                                            <td>{value.batterylevel.toString()}%</td>
                                            {selectedBikeFix.current !== null ?
                                                <button className='buttononselect'
                                                    onClick={() =>{updateOne(value);}}>
                                                        Uppdatera</button>
                                                :
                                                <button className='buttononselect'
                                                    onClick={() =>{SelectOne(value);}}>
                                                        Resehistorik</button>
                                            }
                                        </tr>);
                                })
                                : null}
                        </tbody>
                        {selectedBikeFix.current === "choosen" ?
                            <>
                                <button className='buttononselect'
                                    onClick={() =>{unSelectOne(savedStatus);}}>
                                    Tillbaka till "{savedStatus}"</button>
                                {selectedBike !== null ?
                                    <div className='infobox'>
                                        <h2>Resehistorik</h2>
                                        <tbody className='tablehistory'>
                                            <th>Hyrd av: (användarens id)</th>
                                            <th>Starttid:</th>
                                            <th>Stopptid:</th>
                                            <th>Restid:</th>
                                            <th>Kostnad:</th>
                                            {Array.isArray(selectedBike)
                                                ?
                                                selectedBike.map(value => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <td>{value.userId}</td>
                                                                <td>{value.startTime}</td>
                                                                <td>{value.stopTime}</td>
                                                                <td>{value.duration.minutes}.
                                                                    {value.duration.seconds}min</td>
                                                                <td>{value.cost}kr</td>
                                                            </tr>
                                                        </>
                                                    );
                                                }): null}
                                        </tbody>
                                    </div>
                                    : null}
                            </>
                            : null}
                        {updatedOne.current === "updated" ?
                            <div className='updatebox'>
                                <h2>Uppdatera elsparkcykel: {status[0].name}</h2>
                                <div>
                                    <p className='infoname'>ID (kan ej ändras):</p>
                                    <input id="id" className="updateinput"
                                        defaultValue={status[0]._id} readOnly
                                        onChange={changeHandler}/>
                                    <p className='infoname'>Namn:</p>
                                    <input id="name" className="updateinput"
                                        defaultValue={status[0].name} onChange={changeHandler}/>
                                    <p className='infoname'>
                                        Stadens ID: (värden: Visby: 6378989b6a6403d2a9c6edb1,
                                        Lund: 637c7018050e0887ebe8b491,
                                        Borlänge: 637e2a5a22f175ffd136d0d7)</p>
                                    <input id="city" className="updateinput"
                                        defaultValue={status[0].inCity} onChange={changeHandler}/>
                                    <p className='infoname'>Maxhastighet (kan ej ändras):</p>
                                    <input id="maxspeed" className="updateinput"
                                        defaultValue={status[0].maxspeed} readOnly
                                        onChange={changeHandler}/>
                                    <p className='infoname'>Status:</p>
                                    <input id="works" className="updateinput"
                                        defaultValue={status[0].status} onChange={changeHandler}
                                        readOnly/>
                                    <p className='infoname'>Laddstation:
                                        (använd fliken förflytta fordon för flytt)</p>
                                    <input id="charging" className="updateinput"
                                        defaultValue={status[0].charging} onChange={changeHandler}
                                        readOnly/>
                                    <p className='infoname'>Parkeringsplats:
                                        (använd fliken förflytta fordon för flytt)</p>
                                    <input id="parked" className="updateinput"
                                        defaultValue={status[0].parked} onChange={changeHandler}/>
                                    <p className='infoname'>Batterinivå (värden: positiv siffra):
                                    </p>
                                    <input id="battery" className="updateinput"
                                        defaultValue={status[0].batterylevel}
                                        onChange={changeHandler}/>
                                    <button onClick={() => saveUpdate()}
                                        className="buttonsavedata">Spara ändring</button>
                                </div>
                            </div>
                            : null}
                    </>
                }
            </div>
        </div>
    );
}
