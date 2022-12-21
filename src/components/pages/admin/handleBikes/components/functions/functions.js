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
                    functionsModel.updateZoneParking(place._id, {setParkingPoints});
                    functionsModel.updateZoneCharging(place._id, {setChargingPoints});
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
                if (result.inCity === place) {
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
                if (result.inCity === place) {
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
    },

    statusGenerator: function statusGenerator(value, bikes,
        {setStatus, setSelectedOption}) {
        setSelectedOption(value);
        if (value === "Alla") {
            setStatus(bikes);
        } else if (value === "Aktiva") {
            let array = [];

            bikes.forEach((value) => {
                if (value.active !== null) {
                    array.push(value);
                }
                setStatus(array);
            });
        } else if (value === "Parkerade") {
            let array = [];

            bikes.forEach((value) => {
                if (value.parked !== null) {
                    array.push(value);
                }
                setStatus(array);
            });
        } else if (value === "Laddande") {
            let array = [];

            bikes.forEach((value) => {
                if (value.charging !== null) {
                    array.push(value);
                }
                setStatus(array);
            });
        } else if (value === "Felparkerade") {
            let array = [];

            bikes.forEach((value) => {
                if (value.charging === null && value.parked === null && value.active === null) {
                    array.push(value);
                }
                setStatus(array);
            });
        } else if (value === "Behöver laddas") {
            let array = [];

            bikes.forEach((value) => {
                if (value.status === "noBattery" && value.charging === null) {
                    array.push(value);
                }
                setStatus(array);
            });
        } else if (value === "Behöver service") {
            let array = [];

            bikes.forEach((value) => {
                if (value.status === "needService") {
                    array.push(value);
                }
                setStatus(array);
            });
        }
    },

    selectOne: function selectOne(value, pos, cityID, selectedBike, {setBikes, setStatus}) {
        if (pos === "laddning") {
            selectedBike.forEach(element => {
                bikesModel.updateOneBike(element._id,
                    {
                        charging: value._id,
                        parked: null,
                        location: value.location})
                    .then(function() {
                        functionsModel.updateBikes({setBikes, setStatus});
                    });
            });
        } else if (pos === "parkerad") {
            selectedBike.forEach(element => {
                bikesModel.updateOneBike(element._id,
                    {
                        charging: null,
                        parked: value._id,
                        location: value.location})
                    .then(function() {
                        functionsModel.updateBikes(cityID, {setBikes, setStatus});
                    });
            });
        }
    },

    updateBikes: function updateBikes(cityID, {setBikes, setStatus}) {
        bikesModel.getAllBikesCity(cityID.current).then(function(result) {
            setBikes(result);
            setStatus(result);
        });
    },

    selectedOne: function selectedOne(value, {selectedBikeFix,
        updatedOne, setsavedStatus, setStatus, setSelectedBike, selectedOption}) {
        selectedBikeFix.current = "choosen";
        updatedOne.current = null;
        setsavedStatus(selectedOption);
        setStatus([value]);
        setSelectedBike(value.history);
    },

    unSelectOne: function unSelectOne(value, bikes, {selectedBikeFix, updatedOne,
        setSelectedBike, setStatus, setSelectedOption}) {
        selectedBikeFix.current = null;
        updatedOne.current = null;
        functionsModel.statusGenerator(value, bikes,
            {setStatus, setSelectedOption});
        setSelectedBike(null);
    },

    updateOne: function updateOne({updatedOne, setSelectedBike}) {
        updatedOne.current = "updated";
        setSelectedBike(null);
    }
};

export default functionsModel;
