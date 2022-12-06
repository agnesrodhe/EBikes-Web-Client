// Manage users, signin and signup

const baseURL = "http://localhost:3002";

const userModel = {
    login: async function login(user) {
        console.log(user)
        try {
            const response = await fetch(`${baseURL}/v1/user/signin`, {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    'content-type': 'application/json'
                },
            });
    
            const result = await response.json();
            
            return result;
        } catch {
            return "error"
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
        } catch {
            return "error"
        }
    },
    getAllCustomers: async function getAllCustomers() {
        const result = fetch(`${baseURL}/v1/user/allUsers`)
            .then(r => r.json())
            .then(result => {return result})
            .catch((error) => {
                console.log(error)
            });
        return result
    }
}

export default userModel;