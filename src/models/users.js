// Manage users, signin and signup

const baseURL = "http://localhost:3002";

const userModel = {
    login: async function login(user) {
        try {
            const response = await fetch(`${baseURL}/v1/user/signin`, {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include',
            });
            const result = await response.json();
            console.log(result);

            return result;
        } catch (error) {
            return "error";
        }
    },
    register: async function register(user) {
        try {
            const response = await fetch(`${baseURL}/v1/user/signup`, {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    'content-type': 'application/json'
                },
            });

            const result = await response.json();

            return result;
        } catch (error) {
            return "error";
        }
    },
    getAllCustomers: async function getAllCustomers() {
        const result = fetch(`${baseURL}/v1/user/all`
        )
            .then(r => r.json())
            .then(result => {
                return result;
            })
            .catch((error) => {
                console.log(error);
            });
        return result;
    },
    getUser: async function getUser(userId) {
        const result = fetch(`${baseURL}/v1/customers/${userId}`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.log(error);
            });

        return result;
    },
    updateUser: async function updateUser(userId, body) {
        const result = fetch(`${baseURL}/v1/user/${userId}`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body),
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

export default userModel;
