// Manage bikes

const baseURL = "http://localhost:3002";

const bikesModel = {
    getAllBikes: async function getAllBikes() {
        const result = fetch(`${baseURL}/v1/bikes`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(r => r.json())
            .then(result => {return result})
            .catch((error) => {
                console.log(error)
            });
        return result
    },
    getAllBikesCity: async function getAllBikesCity(cityID) {
        const result = fetch(`${baseURL}/v1/bikes/city/${cityID}`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(r => r.json())
            .then(result => {return result})
            .catch((error) => {
                console.log(error)
            });
        return result
    },
    getAllActiveBikes: async function getAllActiveBikes(cityID) {
        try {
            const response = await fetch(`${baseURL}/v1/bikes/city/${cityID}/active`, {
                method: 'GET',
                credentials: 'include'
            });
            const result = await response.json();
            if (Object.values(result).indexOf('No active bikes in this city') > -1) {
                return 'No active bikes in this city'
            } else {
                return result;
            }
        } catch (error) {
            console.log(error)
        }
    },
    getAllInActiveBikes: async function getAllInActiveBikes(cityID) {
        try {
            const response = await fetch(`${baseURL}/v1/bikes/city/${cityID}/nonActive`, {
                method: 'GET',
                credentials: 'include'
            });
            const result = await response.json();
            if (Object.values(result).indexOf('Only active bikes in this city') > -1) {
                return 'Only active bikes in this city'
            } else {
                return result;
            }
        } catch (error) {
            console.log(error)
        }
    },
    getCityZones: async function getCityZones() {
        const result = fetch(`${baseURL}/v1/cities`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(r => r.json())
            .then(result => {return result})
            .catch((error) => {
                console.log(error)
            });
        return result
    },
    getAllChargingZones: async function getAllChargingZones() {
        const result = fetch(`${baseURL}/v1/chargestations`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(r => r.json())
            .then(result => {return result})
            .catch((error) => {
                console.log(error)
            });
        return result
    },
    getAllParkingZones: async function getAllParkingZones() {
        const result = fetch(`${baseURL}/v1/parking`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(r => r.json())
            .then(result => {return result})
            .catch((error) => {
                console.log(error)
            });
        return result
    },
    updateOneBike: async function updateOneBike(id, value) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(value),
            credentials: 'include'
        };
        const result = fetch(`${baseURL}/v1/bikes/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {return result})
            .catch((error) => {
                console.log(error)
            });
        return result;
    },
}

export default bikesModel;