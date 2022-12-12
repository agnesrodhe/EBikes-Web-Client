import React from 'react';
import { useEffect, useState } from 'react';

import bikesModel from '../../models/bikes.js';

export default function MoveViecles({city, cityID}) {
    const [bikes, setBikes] = useState("");
    const [selectedOption, setSelectedOption] = useState("Alla");
    const [selectedBike, setSelectedBike] = useState([]);
    const [status, setStatus] = useState(null);
    const [parkingPoints, setParkingPoints] = useState("");
    const [chargingPoints, setChargingPoints] = useState("");

    useEffect(() => {
        setBikes("No active bikes in this city");
        updateBikes();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        bikesModel.getAllChargingZones().then(function(result) {
            let array = [];

            result.forEach((result) => {
                if (result.inCity === cityID.current) {
                    array.push(result);
                }
            });
            setChargingPoints(array);
        });
        bikesModel.getAllParkingZones().then(function(result) {
            let arraytwo = [];


            result.forEach((result) => {
                if (result.inCity === cityID.current) {
                    arraytwo.push(result);
                }
            });
            setParkingPoints(arraytwo);
        });
    }, []);

    function updateBikes() {
        bikesModel.getAllBikesCity(cityID.current).then(function(result) {
            setBikes(result);
            setStatus(result);
        });
    }

    function statusGenerator(value) {
        setSelectedOption(value);
        if (value === "Alla") {
            setStatus(bikes);
        } else if (value === "Aktiva") {
            let array = [];

            bikes.forEach((value) => {
                if (value.active !== null) {
                    array.push(value);
                }
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

    const handleOnChange = (value) => {
        if (selectedBike.includes(value)) {
            const index = selectedBike.indexOf(value);

            selectedBike.splice(index, 1);
        } else {
            setSelectedBike(selectedBike => [...selectedBike, value]);
        }
    };

    function SelectOne(value, pos) {
        console.log(value);
        if (pos === "laddning") {
            selectedBike.forEach(element => {
                bikesModel.updateOneBike(element._id,
                    {
                        charging: value._id,
                        parked: null,
                        location: value.location})
                    .then(function() {
                        updateBikes();
                    });
            });
        } else if (pos === "parkerad") {
            selectedBike.forEach(element => {
                bikesModel.updateOneBike(element._id,
                    {
                        charging: null,
                        parked: value._id,
                        location: value.location})
                    .then(function() {
                        updateBikes();
                    });
            });
        }
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
                    <h3>Välj fordon som ska förflyttas:</h3>
                    <h4><i>Det går inte att förflytta aktiva fordon. <br></br>
                        Välj fordon inom alla statusområden, välj sedan destination.</i></h4>
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
                                <th>Välj:</th>
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
                                            <td>
                                                {value.active === null ?
                                                    <input
                                                        type="checkbox"
                                                        className='checkbox'
                                                        name={value.name}
                                                        value={value}
                                                        selected={selectedBike.includes(value)}
                                                        onChange={() => handleOnChange(value)}/>
                                                    : <p>Aktiv</p>}
                                            </td>
                                        </tr>);
                                })
                                : null}
                        </tbody>
                        <div>
                            <h2>Valda:</h2>
                            {Array.isArray(selectedBike) ?
                                <tbody className='table2'>
                                    <tr>
                                        <th>ID:</th>
                                        <th>Namn:</th>
                                        <th>Statuskod:</th>
                                        <th>Aktiv (kund id):</th>
                                        <th>Laddar:</th>
                                        <th>Parkerad:</th>
                                        <th>Batterinivå:</th>
                                    </tr>
                                    {Array.isArray(status)
                                        ?
                                        selectedBike.map(value => {
                                            return (
                                                <tr>
                                                    <td>{value._id}</td>
                                                    <td>{value.name}</td>
                                                    <td>{value.status}</td>
                                                    {value.active !== null ?
                                                        <td>{value.active}</td> :
                                                        <td>Inte aktiv</td>}
                                                    {value.charging !== null ?
                                                        <td>Ja</td> : <td>Nej</td>}
                                                    {value.parked !== null ?
                                                        <td>Ja</td> :<td>Nej</td>}
                                                    <td>{value.batterylevel.toString()}%</td>
                                                </tr>);
                                        })
                                        : null}
                                </tbody>
                                :null }
                            <button className='buttonunselect'
                                onClick={() =>{setSelectedBike([]);}}>
                                Rensa lista</button>
                            <h3 className='h3border'>Laddstationer</h3>
                            <div>
                                {chargingPoints &&
                                    chargingPoints.map((place) => {
                                        return (
                                            <button className='buttononmove'
                                                onClick={() =>{SelectOne(place, "laddning");}}>
                                                {place.name.toString()}</button>
                                        );
                                    })}
                            </div>
                            <h3 className='h3border'>Parkeringsplatser</h3>
                            <div>
                                {parkingPoints && parkingPoints.map((place) => {
                                    return (
                                        <button className='buttononmove'
                                            onClick={() =>{SelectOne(place, "parkering");}}>
                                            {place.name.toString()}</button>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}
