import React from 'react';
import {useState, useEffect, useRef} from 'react';
import { useParams } from "react-router-dom";

/*
Import components.
*/
import Map from './components/map';
import MapIn from './components/mapinactive';
import MoveViecles from './components/moveviecles';
import StatusCheck from './components/statuscheck.js';

//Cities center coordinates.
const centervisby = {
    lat: 57.629472,
    lng: 18.309996
};
const centerborlange = {
    lat: 60.4841,
    lng: 15.418
};
const centerlund = {
    lat: 55.700000,
    lng: 13.199143
};

/*
Function for one page render. Navbar if admin to administer bikes in city.
*/
export default function Admin({role}) {
    const [comp, setComponent] = useState("");
    const city = useParams();
    const cityID = useRef("");

    //Update and set documents as initial stage.
    useEffect(() => {
        clickhandler("map");
    }, []);

    //To render one-page
    async function clickhandler(value) {
        if (value === "map") {
            setComponent("map");
        } else if (value === "mapinactive") {
            setComponent("mapinactive");
        } else if (value === "status") {
            setComponent("status");
        } else if (value === "moveviecles") {
            setComponent("moveviecles");
        }
    }

    return (
        <div>
            {role === "admin" ?
                <div className='body'>
                    <div className='navloggedin'>
                        <ul className='navloggedin'>
                            <li className='menuitemsloggedin'>
                                <button className='buttonifloggedin'
                                    onClick={() => clickhandler("map")}>
                                        Livevy aktiva</button>
                            </li>
                            <li className='menuitemsloggedin'>
                                <button className='buttonifloggedin'
                                    onClick={() => clickhandler("mapinactive")}>
                                        Kartvy inaktiva</button>
                            </li>
                            <li className='menuitemsloggedin'>
                                <button className='buttonifloggedin'
                                    onClick={() => clickhandler("status")}>
                                        Statuskontroll</button>
                            </li>
                            <li className='menuitemsloggedin'>
                                <button className='buttonifloggedin'
                                    onClick={() => clickhandler("moveviecles")}>
                                        F??rflytta fordon</button>
                            </li>
                        </ul>
                    </div>
                    <div className='kit'>
                        {comp === "map" ?
                            <>
                                <h1 className='cityname'>Administrat??r - {city.stad} (Aktiva)</h1>
                                <div className='boxes'>
                                    {city.stad === "Visby" ?
                                        <Map center={centervisby}
                                            city={city.stad} cityID={cityID}/>
                                        : city.stad === "Borl??nge" ?
                                            <Map center={centerborlange}
                                                city={city.stad} cityID={cityID}/>
                                            : city.stad === "Lund" ?
                                                <Map center={centerlund}
                                                    city={city.stad} cityID={cityID}/> : null}
                                </div>
                            </>
                            : comp === "mapinactive" ?
                                <>
                                    <h1 className='cityname'>
                                        Administrat??r - {city.stad} (Inaktiva)</h1>
                                    <div className='boxes'>
                                        {city.stad === "Visby" ?
                                            <MapIn center={centervisby}
                                                city={city.stad} cityID={cityID}/>
                                            : city.stad === "Borl??nge" ?
                                                <MapIn center={centerborlange}
                                                    city={city.stad} cityID={cityID}/>
                                                : city.stad === "Lund" ?
                                                    <MapIn center={centerlund}
                                                        city={city.stad} cityID={cityID}/>
                                                    : null
                                        }
                                    </div>
                                </>
                                : comp === "status" ?
                                    <>
                                        <h1 className='cityname'>
                                            Administrat??r - {city.stad} (Statuskontroll)
                                        </h1>
                                        <StatusCheck city={city.stad} cityID={cityID}/>
                                    </>
                                    : comp === "moveviecles" ?
                                        <>
                                            <h1 className='cityname'>
                                                Administrat??r - {city.stad} (F??rflytta fordon)
                                            </h1>
                                            <MoveViecles city={city.stad} cityID={cityID}/>
                                        </>
                                        : null}
                    </div>
                </div>
                :
                <div className='body'>
                    <h1 className='cityname'>Oops... Har du g??tt vilse?</h1>
                </div>
            }
        </div>
    );
}
