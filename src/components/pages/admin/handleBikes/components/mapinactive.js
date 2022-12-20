import React from "react";
import { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF, PolygonF, CircleF }
    from '@react-google-maps/api';
import {TailSpin} from 'react-loading-icons';

import functionModel from "./functions/mapfunc";

import imagered from "./media/red.png";
import imagegrey from "../media/grey.png";
import chargeimage from "../media/charge.png";
import parkingimage from "../media/parking.png";

const containerStyle = {
    width: '100%',
    height: '900px',
};

const options = {
    strokeColor: 'green',
    strokeOpacity: 0.6,
    strokeWeight: 2,
    fillColor: 'green',
    fillOpacity: 0.2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 100,
    zIndex: 1
};

export default function MapCityIn({center, city, cityID}) {
    const [status, setStatus] = useState(null);
    const [selectedZone, setSelectedZone] = useState(null);
    const [mainZone, setMainZone] = useState("");
    const [parkingPoints, setParkingPoints] = useState("");
    const [selectedParkingStation, setSelectedParkingStation] = useState(null);
    const [chargingPoints, setChargingPoints] = useState("");
    const [selectedChargingStation, setSelectedChargingStation] = useState(null);
    const [bikes, setBikes] = useState("");
    const [bikesError, setBikesError] = useState("");
    const [selectedBike, setSelectedBike] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(13);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    useEffect(() => {
        setBikes("No inactive bikes in this city");
        setBikesError("No bikes with error");

        functionModel.updateZoneMain("inactive", city, cityID,
            {setZoomLevel, setMainZone, setBikes, setBikesError,
                setChargingPoints, setParkingPoints});
        // eslint-disable-next-line
    }, [])

    function statusGenerator(value) {
        setSelectedZone(value);
        console.log(value);
        let array = [];

        bikes.forEach((bike) => {
            if (bike.charging === value) {
                array.push(bike);
            } else if (bike.parked === value) {
                array.push(bike);
            }
        });

        if (array.length === 0) {
            setStatus("tom");
        } else {
            setStatus(array);
        }
    }

    if (loadError) {return "Error loading maps";}
    if (!isLoaded) {
        return <TailSpin stroke="#d4b242"
            style={{ marginLeft: '47%', marginTop: "20%" }}/>;
    }

    return (
        <div>
            <div className='boxselect'>
                <h3>
                    <label for="cars">Parkeringsplatser och laddstationer:</label>
                </h3>
                <div className='selectoption'>
                    <select value={selectedZone}
                        onChange={e => statusGenerator(e.target.value)}
                        name="areastatus" id="areastatus">
                        <option className='optionbox' value="Alla"> Ingen vald </option>
                        {parkingPoints &&
                            parkingPoints.map((zone) => {
                                return <option className='optionbox' value={zone._id}>
                                    {zone.name} </option>;
                            })
                        }
                        {chargingPoints &&
                            chargingPoints.map((zone) => {
                                return <option className='optionbox' value={zone._id}>
                                    {zone.name} </option>;
                            })
                        }
                    </select>
                </div>
            </div>
            <div>
                {status === null ?
                    <>
                    </>
                    : status === "tom" ?
                        <>
                            <h4>Tom laddstation eller parkeringsplats.</h4>
                        </>
                        : <>
                            <tbody className='tablehistory'>
                                <tr>
                                    <th>ID:</th>
                                    <th>Namn:</th>
                                    <th>Statuskod:</th>
                                    <th>Laddar:</th>
                                    <th>Parkerad:</th>
                                    <th>Batterinivå:</th>
                                </tr>
                                {Array.isArray(status)
                                    ?
                                    status.map(value => {
                                        return (
                                            <tr>
                                                <td>{value._id}</td>
                                                <td>{value.name}</td>
                                                <td>{value.status}</td>
                                                {value.charging !== null ?
                                                    <td>Ja</td> : <td>Nej</td>}
                                                {value.parked !== null ?
                                                    <td>Ja</td> :<td>Nej</td>}
                                                <td>{value.batterylevel.toString()}%</td>
                                            </tr>);
                                    })
                                    : null}
                            </tbody>
                        </>
                }
            </div>
            <div className="map">
                <h2>Karta</h2>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center= {center}
                    zoom={zoomLevel}>
                    <PolygonF
                        path={mainZone}
                        options={{
                            fillOpacity: 0,
                            strokeColor: "black",
                            strokeOpacity: 1,
                            strokeWeight: 1.5,
                            clickable: false,
                            draggable: false,
                            editable: false,
                            geodesic: false,
                            zIndex: 1
                        }}
                    />
                    <>
                        {bikes === "No inactive bikes in this city" ?
                            <>
                            </>
                            : bikes &&
                            <>
                                {bikes.map((bike, index) => {
                                    return <MarkerF
                                        key={index}
                                        icon={imagegrey}
                                        position={{
                                            lat: bike.location.coordinates[1],
                                            lng: bike.location.coordinates[0]
                                        }}
                                        onClick={() => {setSelectedBike(bike);}}/>;
                                })};
                            </>
                        }
                        {bikesError === "No bikes with error" ?
                            <>
                            </>
                            : bikesError &&
                            <>
                                {bikesError.map((bike, index) => {
                                    return <MarkerF
                                        key={index}
                                        icon={imagered}
                                        position={{
                                            lat: bike.location.coordinates[1],
                                            lng: bike.location.coordinates[0]
                                        }}
                                        onClick={() => {setSelectedBike(bike);}}/>;
                                })};
                            </>
                        }
                        {selectedBike ? <>
                            <InfoWindowF
                                position={{
                                    lat: selectedBike.location.coordinates[1],
                                    lng: selectedBike.location.coordinates[0]
                                }} onCloseClick={() => {setSelectedBike(null);}}>
                                <>
                                    <p>Namn: {selectedBike.name}</p>
                                    <p>ID: {selectedBike._id}</p>
                                    <p>Status: {selectedBike.status}</p>
                                    <p>Batterinivå: {selectedBike.batterylevel}%</p>
                                    {selectedBike.parked !== null ?<p><b>Parkerad</b></p>:null}
                                    {selectedBike.charging !== null ?<p><b>Laddar</b></p>:null}
                                    {selectedBike.active !== null ?<p><b>Uthyrd</b></p>:null}
                                    {selectedBike.active === null ?
                                        <>
                                            {selectedBike.charging === null ?
                                                <>
                                                    {selectedBike.parked === null ?
                                                        <>
                                                            <p><b>Felparkerad</b></p>
                                                        </>
                                                        :null}
                                                </>
                                                :null}
                                        </>
                                        :null}
                                </>
                            </InfoWindowF>
                        </> : null}
                        {chargingPoints &&
                            <>
                                {chargingPoints.map((position, index) => {
                                    return <MarkerF
                                        key={index}
                                        icon={chargeimage}
                                        position={{
                                            lat: position.location.coordinates[1],
                                            lng: position.location.coordinates[0]
                                        }} onMouseOver={
                                            () => {setSelectedChargingStation(position);}}
                                    />;
                                })};
                            </>
                        }
                        {selectedChargingStation ? <>
                            <InfoWindowF
                                position={{
                                    lat: selectedChargingStation.location.coordinates[1],
                                    lng: selectedChargingStation.location.coordinates[0]
                                }}
                                onCloseClick={() => {setSelectedChargingStation(null);}}
                            >
                                <>
                                    <p>{selectedChargingStation.name}</p>
                                </>
                            </InfoWindowF>
                        </> : null}
                        {parkingPoints &&
                            <>
                                {parkingPoints.map((position, index) => {
                                    return <MarkerF
                                        key={index}
                                        icon={parkingimage}
                                        position={{
                                            lat: position.location.coordinates[1],
                                            lng: position.location.coordinates[0]
                                        }} onMouseOver={
                                            () => {setSelectedParkingStation(position);}}/>;
                                })};
                                {parkingPoints.map((position, index) => {
                                    return <CircleF
                                        key={index}
                                        options={options}
                                        center={{
                                            lat: position.location.coordinates[1] + 0.0008,
                                            lng: position.location.coordinates[0]
                                        }}/>;
                                })};
                            </>
                        }
                        {selectedParkingStation ? <>
                            <InfoWindowF
                                position={{
                                    lat: selectedParkingStation.location.coordinates[1],
                                    lng: selectedParkingStation.location.coordinates[0]
                                }} onCloseClick={() => {setSelectedParkingStation(null);}}>
                                <>
                                    <p>{selectedParkingStation.name}</p>
                                </>
                            </InfoWindowF>
                        </> : null}
                    </>
                </GoogleMap>
            </div>
        </div>
    );
}
