// Manage bikes

const baseURL = "http://localhost:3002";

const bikesModel = {
    getAllBikes: async function getAllBikes() {
        const result = fetch(`${baseURL}/v1/bikes`)
            .then(r => r.json())
            .then(result => {return result})
            .catch((error) => {
                console.log(error)
            });
        return result
    },
    getAllActiveBikes: async function getAllActiveBikes(cityID) {
        try {
            const response = await fetch(`${baseURL}/v1/bikes/city/${cityID}/active`);
            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error)
        }
    },
    getAllInActiveBikes: async function getAllInActiveBikes(cityID) {
        try {
            const response = await fetch(`${baseURL}/v1/bikes/city/${cityID}/nonActive`);
            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error)
        }
    },
    getCityZones: async function getCityZones() {
        const result = fetch(`${baseURL}/v1/cities`)
            .then(r => r.json())
            .then(result => {return result})
            .catch((error) => {
                console.log(error)
            });
        return result
    }
}

export default bikesModel;