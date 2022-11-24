import React from 'react';
import {useState, useEffect, useRef} from 'react';
import { useParams } from "react-router-dom";

import Map from './map.js';
import MapIn from './mapinactive.js';
import StatusCheck from './statuscheck.js';

//Cities location and zones
const centervisby = {
    lat: 57.629472,
    lng: 18.309996
};

const centerborlange = {
    lat: 60.4824,
    lng: 15.4463
};

const centerlund = {
    lat: 55.703571,
    lng: 13.191943
};

export default function Admin({token, user, role}) {
    const [comp, setComponent] = useState("")
    const city = useParams();
    const cityID = useRef("");

    //Update and set documents as initial stage.
    useEffect(() => {
        clickhandler("map")
    }, []);

    //To render one-page
    async function clickhandler(value) {
        if (value === "map"){
            setComponent("map")
        } else if (value === "mapinactive"){
            setComponent("mapinactive")
        } else if (value === "status"){
            setComponent("status")
        } else if (value === "moveviecles"){
            setComponent("moveviecles")
        }
    };

    return (
        <div>
        {role === "admin" ?
        <div className='body'>
                <div className='navloggedin'>
                <ul className='navloggedin'>
                    <li className='menuitemsloggedin'>
                    <button className='buttonifloggedin' onClick={() => clickhandler("map")}>Livevy aktiva</button>
                    </li>
                    <li className='menuitemsloggedin'>
                    <button className='buttonifloggedin' onClick={() => clickhandler("mapinactive")}>Kartvy parkerade</button>
                    </li>
                    <li className='menuitemsloggedin'>
                    <button className='buttonifloggedin' onClick={() => clickhandler("status")}>Statuskontroll</button>
                    </li>
                    <li className='menuitemsloggedin'>
                    <button className='buttonifloggedin' onClick={() => clickhandler("moveviecles")}>Förflytta fordon</button>
                    </li>
                </ul>
            </div>
        <div className='kit'>
            {comp === "map" ?
            <>
                <h1 className='cityname'>Administratör - {city.stad} (Aktiva)</h1>
                <div className='boxes'>
                    {city.stad === "Visby" ? 
                    <Map center={centervisby} city={city.stad} cityID={cityID}/> 
                    : city.stad === "Borlänge" ?
                    <Map center={centerborlange} city={city.stad} cityID={cityID}/> 
                    : city.stad === "Lund" ? 
                    <Map center={centerlund} city={city.stad} cityID={cityID}/> : null}
                    
                    <div className='besidemap'> 
                    </div>
                </div>
            </>
            : comp === "mapinactive" ?
            <>
            <h1 className='cityname'>Administratör - {city.stad} (Inaktiva)</h1>
                <div className='boxes'>
                    {city.stad === "Visby" ? 
                    <MapIn center={centervisby} city={city.stad} cityID={cityID}/> 
                    : city.stad === "Borlänge" ?
                    <MapIn center={centerborlange} city={city.stad} cityID={cityID}/> 
                    : city.stad === "Lund" ? 
                    <MapIn center={centerlund} city={city.stad} cityID={cityID}/> : null}
                </div>
            </>
        : comp === "status" ?
                <>
                <h1 className='cityname'>Administratör - {city.stad} (Statuskontroll)</h1>
                <StatusCheck city={city.stad} cityID={cityID}/>
                </>
            : null}
        </div>
        </div>
        : <h1 className='cityname'>Oops... Har du gått vilse?</h1>}
        </div>
    );
};
