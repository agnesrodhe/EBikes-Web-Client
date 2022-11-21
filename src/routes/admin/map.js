import React from "react";
import { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';

import bikesModel from '../../models/bikes.js';

const defaultMapOptions = {
    fullscreenControl: false,
    streetViewControl: false,
};

const containerStyle = {
    width: '100%',
    height: '800px',
    overflow: 'visible'
  };

  const centervisby = {
    lat: 57.629472,
    lng: 18.309996
};

export default function MapCity({center}){
    const [bikes, setbikes] = useState("");
    const [selectedBike, setSelectedBike] = useState(null);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    useEffect(() => {
        bikesModel.getAllBikes().then(function(result){
            setbikes(result);
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