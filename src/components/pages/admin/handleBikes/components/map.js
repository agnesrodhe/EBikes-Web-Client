import React from "react";
import { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF, PolygonF, CircleF }
    from '@react-google-maps/api';
import {TailSpin} from 'react-loading-icons';

//Functions
import functionModel from "./functions/functions";

//Media
import imagegreen from "../media/green.png";
import chargeimage from "../media/charge.png";
import parkingimage from "../media/parking.png";

//Styling map
const containerStyle = {
    width: '100%',
    height: '900px',
};

//Styling for parkingzone.
const options = {
    strokeColor: 'green',
    strokeOpacity: 0.6,
    strokeWeight: 1,
    fillColor: 'green',
    fillOpacity: 0.2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 100,
    zIndex: 1
};

//Url for eventsource.
const baseURL = 'http://localhost:3002/v1/bikes/events/event/';

//Function to set map with parkingzone, chargingzone and active bikes.
export default function MapCity({center, city, cityID}) {
    const [mainZone, setMainZone] = useState("");
    const [parkingPoints, setParkingPoints] = useState("");
    const [selectedParkingStation, setSelectedParkingStation] = useState(null);
    const [chargingPoints, setChargingPoints] = useState("");
    const [selectedChargingStation, setSelectedChargingStation] = useState(null);
    const [bikes, setBikes] = useState("");
    const [selectedBike, setSelectedBike] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(13);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    //UseEffect for initial setBikes and set zones.
    useEffect(() => {
        setBikes("No active bikes in this city");
        if (mainZone === "") {
            functionModel.updateZoneMain("active", city, cityID,
                {setZoomLevel, setMainZone, setBikes,
                    setChargingPoints, setParkingPoints});
        }
        // eslint-disable-next-line
    }, []);

    //UseEffect for eventsouce.
    useEffect(() => {
        if ('EventSource' in window) {
            const source = new EventSource(`${baseURL}${cityID.current}`, {withCredentials: true});

            source.addEventListener('ping', e => {
                setActibeBikesLive(JSON.parse(e.data));
            });
            source.addEventListener('open', function() {
                console.log("connected");
            }, false);
            source.addEventListener('error', function() {
                console.log("error");
            }, false);
            return () => {
                source.close();
            };
        }
        // eslint-disable-next-line
    }, [bikes]);

    // Function to set bikes from eventsource (live)
    function setActibeBikesLive(e) {
        setBikes(e);
    }

    //If map not set, show loading symbole.
    if (loadError) {return "Error loading maps";}
    if (!isLoaded) {
        return <TailSpin stroke="#d4b242"
            style={{ marginLeft: '47%', marginTop: "20%" }}/>;
    }

    return (
        <div>
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
                        strokeWeight: 2,
                        clickable: false,
                        draggable: false,
                        editable: false,
                        geodesic: false,
                        zIndex: 1
                    }}
                />
                <>
                    {bikes === "No active bikes in this city" ?
                        <>
                        </>
                        : bikes &&
                        <>
                            {bikes.map((bike, index) => {
                                return <MarkerF
                                    key={index}
                                    icon={imagegreen}
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
                                    }} onClick={() => {setSelectedChargingStation(position);}}
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
                                    }} onClick={() => {setSelectedParkingStation(position);}}/>;
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
    );
}
