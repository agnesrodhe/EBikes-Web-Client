import React from 'react';
import { useEffect, useState } from 'react';

/*
Import model.
*/
import functionModel from "./functions/functions";

/*
Component for one-page render "Förflytta fordon".
*/
export default function MoveViecles({city, cityID}) {
    const [bikes, setBikes] = useState("");
    const [selectedOption, setSelectedOption] = useState("Alla");
    const [selectedBike, setSelectedBike] = useState([]);
    const [status, setStatus] = useState(null);
    const [parkingPoints, setParkingPoints] = useState("");
    const [chargingPoints, setChargingPoints] = useState("");

    useEffect(() => {
        setBikes("No active bikes in this city");
        functionModel.updateBikes(cityID, {setBikes, setStatus});
        functionModel.updateZoneCharging(cityID.current, {setChargingPoints});
        functionModel.updateZoneCharging(cityID.current, {setParkingPoints});
        // eslint-disable-next-line
    }, []);

    //Set changes.
    const handleOnChange = (value) => {
        if (selectedBike.includes(value)) {
            const index = selectedBike.indexOf(value);

            selectedBike.splice(index, 1);
        } else {
            setSelectedBike(selectedBike => [...selectedBike, value]);
        }
    };

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
                            onChange={e => functionModel.statusGenerator(e.target.value, bikes,
                                {setStatus, setSelectedOption})}
                            name="areastatus" id="areastatus">
                            <option className='optionbox' value="Alla"> Alla </option>
                            <option className='optionbox' value="Aktiva">Aktiva</option>
                            <option className='optionbox' value="Parkerade">
                                Inom parkeringszoner</option>
                            <option className='optionbox' value="Laddande">Laddande</option>
                            <option className='optionbox' value="Felparkerade">Felparkerade</option>
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
                                                onClick={() =>{
                                                    functionModel.selectOne(
                                                        place, "laddning", cityID, selectedBike,
                                                        {setBikes, setStatus});
                                                }}>
                                                {place.name.toString()}</button>
                                        );
                                    })}
                            </div>
                            <h3 className='h3border'>Parkeringsplatser</h3>
                            <div>
                                {parkingPoints && parkingPoints.map((place) => {
                                    return (
                                        <button className='buttononmove'
                                            onClick={() =>{
                                                functionModel.selectOne(
                                                    place, "parkering", cityID, selectedBike,
                                                    {setBikes, setStatus});
                                            }}>
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
