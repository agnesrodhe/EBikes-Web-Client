// Set map components functions
import bikesModel from '../../../../../../models/bikes.js';

const functionsModel = {
    updateZoneMain: function updateZoneMain(status, city, cityID,
        {setMainZone, setBikes, setBikesError, setChargingPoints, setParkingPoints, setZoomLevel}) {
        bikesModel.getCityZones().then(function(result) {
            result.forEach((place) => {
                if (place.name === city) {
                    cityID.current = place._id;

                    if (city === "Visby") {
                        console.log("visby");
                        setZoomLevel(14);
                    }
                    if (city === "Borlänge") {
                        setZoomLevel(13.4);
                    }
                    if (city === "Lund") {
                        setZoomLevel(13);
                    }

                    if (status === "active") {
                        bikesModel.getAllActiveBikes(cityID.current).then(function(result) {
                            setBikes(result);
                        });
                    } else if (status === "inactive") {
                        functionsModel.updateInActiveBikes(cityID, {setBikesError, setBikes});
                    }
                    functionsModel.updateZoneParking(place, {setParkingPoints});
                    functionsModel.updateZoneCharging(place, {setChargingPoints});
                    let coordinatesArray = [];

                    place.location.coordinates[0].forEach((value) => {
                        coordinatesArray.push(
                            {lat: parseFloat(value[1]), lng: parseFloat(value[0])});
                    });
                    setMainZone(coordinatesArray);
                }
            });
        });
    },

    updateInActiveBikes: function updateInActiveBikes(cityID, {setBikesError, setBikes}) {
        bikesModel.getAllInActiveBikes(cityID.current).then(function(result) {
            const working = [];
            const notworking = [];

            result.forEach((bike) => {
                if (bike.status === "working") {
                    working.push(bike);
                } else {
                    notworking.push(bike);
                }
            });
            setBikes(working);
            setBikesError(notworking);
        });
    },

    updateZoneCharging: function updateZoneCharging(place, {setChargingPoints}) {
        bikesModel.getAllChargingZones().then(function(result) {
            let array = [];

            result.forEach((result) => {
                if (result.inCity === place._id) {
                    array.push(result);
                }
            });
            setChargingPoints(array);
        });
    },

    updateZoneParking: function updateZoneParking(place, {setParkingPoints}) {
        bikesModel.getAllParkingZones().then(function(result) {
            let array = [];

            result.forEach((result) => {
                if (result.inCity === place._id) {
                    array.push(result);
                }
            });
            setParkingPoints(array);
        });
    },

    counter: function counter(position, bikes) {
        let array = [];

        bikes.forEach((bike) => {
            if (bike.charging === position._id || bike.parked === position._id ) {
                array.push({name: bike.name});
            }
        });
        return array;
    }
};

export default functionsModel;
