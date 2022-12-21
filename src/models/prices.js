// Manage prices

const baseURL = "http://localhost:3002";

const priceModel = {
    getPrice: async function getPrice() {
        const result = fetch(`${baseURL}/v1/prices`, {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch(() => {
                return "No prices found"
            });

        return result;
    },
    updatePrice: async function updateUser(id, body) {
        const result = fetch(`${baseURL}/v1/prices/${id}`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body),
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.log(error);
            });

        return result;
    }
};

export default priceModel;
