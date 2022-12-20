import React from 'react';
import { CircleF } from '@react-google-maps/api';
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
    radius: 700,
    zIndex: 1
};

function ParkZoneCircles({ parkingZones }) {
    const allZonesMaped = parkingZones.map((zone, index) => {
        return <CircleF
            key={index}
            options={options}
            center={{
                lat: zone.location.coordinates[1],
                lng: zone.location.coordinates[0]
            }}
        />;
    });

    return allZonesMaped;
}

export default ParkZoneCircles;
