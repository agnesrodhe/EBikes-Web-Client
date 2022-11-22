import React from 'react';
import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';

import bikesModel from '../../models/bikes.js';
import Map from './map.js';

const containerStyle = { height: '100vh', width: '100%'}

export default function Admin({token, user, role}) {
    const [comp, setComponent] = useState("")
    const city = useParams();

    const centervisby = {
        lat: 57.629472,
        lng: 18.309996
    };

    const centervasteras = {
        lat: 59.611060,
        lng: 16.544369
    };

    const centerlund = {
        lat: 55.703571,
        lng: 13.191943
    };
    const center = null
    //Update and set documents as initial stage.
    useEffect(() => {
        clickhandler("map")
    }, []);

    async function clickhandler(value) {
        if (value === "map"){
            setComponent("map")
        } else if (value === "status"){
            setComponent("status")
        } else if (value === "stations"){
            setComponent("stations")
        } else if (value === "moveviecles"){
            setComponent("moveviecles")
        }
    };


    return (
        <div>
        {role === "admin" ?
        <div className='body'>
                <div className='navloggedin'>
                <ul className='menuloggedin'>
                    <li className='menuitemsloggedin'>
                    <button className='buttonifloggedin' onClick={() => clickhandler("map")}>Livevy aktiva</button>
                    </li>
                    <li className='menuitemsloggedin'>
                    <button className='buttonifloggedin' onClick={() => clickhandler("map")}>Kartvy parkerade</button>
                    </li>
                    <li className='menuitemsloggedin'>
                    <button className='buttonifloggedin' onClick={() => clickhandler("status")}>Statuskontroll</button>
                    </li>
                    <li className='menuitemsloggedin'>
                    <button className='buttonifloggedin' onClick={() => clickhandler("stations")}>Laddstationer</button>
                    </li>
                    <li className='menuitemsloggedin'>
                    <button className='buttonifloggedin' onClick={() => clickhandler("moveviecles")}>Förflytta fordon</button>
                    </li>
                </ul>
            </div>
        <div className='kit'>
            <h1 className='cityname'>Administratör</h1>
            {comp === "map" ?
                <div className='boxes'>
                    {city.stad === "visby" ? 
                    <Map center={centervisby}/> 
                    : city.stad === "västerås" ?
                    <Map center={centervasteras}/> 
                    : city.stad === "lund" ? 
                    <Map center={centerlund}/> : null}
                    
                    <div className='besidemap'> 
                    <h2>Antal aktiva</h2>
                    </div>
                </div>
            : comp === "status" ?
            <p>status</p>
            : null}
        </div>
        </div>
        : <h1 className='cityname'>Oops... Har du gått vilse?</h1>}
        </div>
    );
};
