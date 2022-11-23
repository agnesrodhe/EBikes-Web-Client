import React from "react";
import { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF, Polygon } from '@react-google-maps/api';

import bikesModel from '../../models/bikes.js';

const containerStyle = {
    width: '100%',
    height: '800px',
};


export default function MapCityIn({center, city, cityID, setBikes, bikes}){
    const [mainZone, setMainZone] = useState("");
    const [selectedBike, setSelectedBike] = useState(null);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    useEffect(() => {
        bikesModel.getCityZones().then(function(result){
            result.forEach((place) => {
                if (place.name === city) {
                    cityID.current = place._id;
                    bikesModel.getAllInActiveBikes(cityID.current).then(function(result){
                        setBikes(result);
                        console.log(result)
                    })
                    let coordinatesArray = [];
                    place.location.coordinates[0].forEach((value) => {
                        coordinatesArray.push({lat:parseFloat(value[0]), lng:parseFloat(value[1])} )
                    })
                    setMainZone(coordinatesArray)
                }
            })
        })
    }, [])

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps";

return (
    <div>
        <GoogleMap
                mapContainerStyle={containerStyle}
                center= {center}
                zoom={13}
            >
            <Polygon
            path={mainZone}
            options={{
                fillColor: "lightblue",
                fillOpacity: 1,
                strokeColor: "red",
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
                {bikes && 
                    <>
                    {bikes.map((bike, index) => {
                        return <MarkerF 
                                    key={index} 
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
                        <p>{selectedBike.name}</p>
                        <p>Batterinivå: {selectedBike.batterylevel}%</p>
                    </>
                    </InfoWindowF>
                </> : null}
                </>
            </GoogleMap>

    </div>
)
}