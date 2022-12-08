import React from "react";
import { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF, PolygonF } from '@react-google-maps/api';
import {TailSpin} from 'react-loading-icons'

import bikesModel from '../../models/bikes.js';
import imagegreen from "../images/green.png"
import chargeimage from "../images/charge.png"
import parkingimage from "../images/parking.png"
import {useNavigate} from 'react-router-dom';

const containerStyle = {
    width: '100%',
    height: '800px',
};

const BaseURL = "http://localhost:3002/v1/bikes/events/event/";

export default function MapCity({center, city, cityID}){
    const [mainZone, setMainZone] = useState("");
    const [parkingPoints, setParkingPoints] = useState("");
    const [selectedParkingStation, setSelectedParkingStation] = useState(null);
    const [chargingPoints, setChargingPoints] = useState("");
    const [selectedChargingStation, setSelectedChargingStation] = useState(null);
    const [bikesActive, setBikesActive] = useState("");
    const [selectedBike, setSelectedBike] = useState(null);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });
    const [close, setClose] = useState(false);
    const navigate = useNavigate();
    function navigatereg() {
        fetch(`${BaseURL}`);
        setClose(true);
        navigate('/registrera');
    }

    useEffect(() => {
        setBikesActive("No active bikes in this city")
        if (mainZone === "") {
            updateZoneMain()
        } 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
            if (close !== true) {
                // if ('EventSource' in window) {
                    const source = new EventSource(`http://localhost:3002/v1/bikes/events/event/${cityID.current}`, {withCredentials: true});
                    function setter(e) {
                        setBikesActive(e)
                        return () => {
                            source.close();
                        };
                    }
                    if (close === true) {
                        source.close()
                    } else {
                        source.onmessage = e => {
                            console.log('onmessage');
                            console.log(e);
                            setter(e.data)
                            }
                            source.addEventListener('ping', e => {
                                console.log("Hej")
                                console.log(JSON.parse(e.data))
                            setter(JSON.parse(e.data))
                            });
                            source.addEventListener('open', function(e) {
                            console.log("connected")
                            }, false);
                            source.addEventListener('error', function(e) {
                            console.log("error")
                            }, false);
                    // }
                }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bikesActive])

    function updateZoneMain(){
        bikesModel.getCityZones().then(function(result){
            result.forEach((place) => {
                if (place.name === city) {
                    cityID.current = place._id;
                    updateZoneCharging(place)
                    bikesModel.getAllActiveBikes(cityID.current).then(function(result){
                        setBikesActive(result);
                    })
                    updateZoneParking(place)
                    let coordinatesArray = [];
                    place.location.coordinates[0].forEach((value) => {
                        coordinatesArray.push({lat:parseFloat(value[1]), lng:parseFloat(value[0])} )
                    })
                    setMainZone(coordinatesArray)
                }
            })
        })
    }


    function updateZoneCharging(place){
        bikesModel.getAllChargingZones().then(function(result){
            let array = [];
            result.forEach((result) => {
                if (result.inCity === place._id){
                    array.push(result)
                }
            })
            setChargingPoints(array);
        })
    }

    function updateZoneParking(place){
        bikesModel.getAllParkingZones().then(function(result){
            let arraytwo = [];
            result.forEach((result) => {
                if (result.inCity === place._id){
                    arraytwo.push(result)
                }
            })
            setParkingPoints(arraytwo);
        })
    }

    if (loadError) return "Error loading maps";
    if (!isLoaded) return <TailSpin stroke="#d4b242" style={{ marginLeft: '47%', marginTop: "20%" }}/>;

return (
    <div>
        <GoogleMap
                mapContainerStyle={containerStyle}
                center= {center}
                zoom={13}
            >
            <PolygonF
            path={mainZone}
            options={{
                fillOpacity: 0,
                strokeColor: "black",
                strokeOpacity: 1,
                strokeWeight: 2,
                clickable: false,
                draggable: false,
                editable: false,
                geodesic: false,
                zIndex: 1
            }}
            />
                <>
                {bikesActive === "No active bikes in this city" ?
                    <>
                    </>
                    : bikesActive &&
                    <>
                    {bikesActive.map((bike, index) => {
                        return <MarkerF 
                                    key={index} 
                                    icon={imagegreen}
                                    position={{
                                        lat: bike.location.coordinates[1],
                                        lng: bike.location.coordinates[0]
                                    }}
                                    onClick={() => {setSelectedBike(bike)}}
                                />
                    })}
                    </>
                }
                {selectedBike ? <>
                    <InfoWindowF
                        position={{
                            lat: selectedBike.location.coordinates[1],
                            lng: selectedBike.location.coordinates[0]
                        }}
                        onCloseClick={() => {setSelectedBike(null)}}
                    ><>
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
                                    }}
                                    onClick={() => {setSelectedChargingStation(position)}}
                                />
                    })}
                    </>
                }
                {selectedChargingStation ? <>
                    <InfoWindowF
                        position={{
                            lat: selectedChargingStation.location.coordinates[1],
                            lng: selectedChargingStation.location.coordinates[0]
                        }}
                        onCloseClick={() => {setSelectedChargingStation(null)}}
                    ><>
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
                                    }}
                                    onClick={() => {setSelectedParkingStation(position)}}
                                />
                    })}
                    </>
                }
                {selectedParkingStation ? <>
                    <InfoWindowF
                        position={{
                            lat: selectedParkingStation.location.coordinates[1],
                            lng: selectedParkingStation.location.coordinates[0]
                        }}
                        onCloseClick={() => {setSelectedParkingStation(null)}}
                    ><>
                        <p>{selectedParkingStation.name}</p>
                    </>
                    </InfoWindowF>
                </> : null}
                </>
            </GoogleMap>
            {/* <button onClick={async () => {await fetch(`${BaseURL}`)}}>Stäng</button> */}
            <button onClick={() => navigatereg()} className='buttonnewclient'>Registrera dig? Klicka här!</button>
    </div>
)
}