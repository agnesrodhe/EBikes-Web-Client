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
            console.log(result)
        return result
    },
    getAllActiveBikes: async function getAllBikes() {
        const result = fetch(`${baseURL}/v1/bikes`)
            .then(r => r.json())
            .then(result => {return result})
            .catch((error) => {
                console.log(error)
            });
            console.log(result)
        return result
    }
}

export default bikesModel;