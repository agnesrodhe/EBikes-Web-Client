import userModel from '../../models/users';

describe('userModel', () => {
    describe('login', () => {
        it('should send a POST request to the /v1/user/signin endpoint with the specified user object in the body and return the result', async () => {
        // Mock the fetch function to return a successful response
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
            json: () => Promise.resolve({ success: true }),
            })
        );

        const user = { username: 'test', password: 'password' };
        const result = await userModel.login(user);

        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:3002/v1/user/signin',
            expect.objectContaining({
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
            })
        );
        expect(result).toEqual({ success: true });
        });
    });

    describe('register', () => {
        it('should send a POST request to the /v1/user/signup endpoint with the specified user object in the body and return a success message if the registration was successful', async () => {
        // Mock the fetch function to return a successful response
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
            json: () => Promise.resolve({ success: true }),
            })
        );

        const user = { username: 'test', password: 'password' };
        const result = await userModel.register(user);

        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:3002/v1/user/signup',
            expect.objectContaining({
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
            })
        );
        expect(result).toEqual('Användaren är nu registrerad!');
        });

        it('should return a message indicating that the username is already taken if the server returns an error', async () => {
        // Mock the fetch function to return an error response
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
            json: () =>
                Promise.resolve({
                error: 'user already exists',
                }),
            })
        );

        const user = { username: 'test', password: 'password' };
        const result = await userModel.register(user);

        expect(result).toEqual('Användarnamn upptaget');
        });
    });
});

describe('getUser', () => {
    it('should send a GET request to the /v1/customers/{userId} endpoint and return the user information', async () => {
        // Mock the fetch function to return a successful response
        jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
            json: () =>
            Promise.resolve({
                id: '123',
                username: 'test',
                firstName: 'Test',
                lastName: 'User',
            }),
        })
        );

        const userId = '123';
        const result = await userModel.getUser(userId);

        expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3002/v1/customers/123',
        expect.objectContaining({
            method: 'GET',
            credentials: 'include',
        })
        );
        expect(result).toEqual({
        id: '123',
        username: 'test',
        firstName: 'Test',
        lastName: 'User',
        });
    });

    it('should return a "No user found" message if the server returns an error', async () => {
        // Mock the fetch function to return an error response
        jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.reject('Error'),
        })
        );

        const userId = '123';
        const result = await userModel.getUser(userId);

        expect(result).toEqual('No user found');
    });
    });

    describe('getSearchUsername', () => {
    it('should send a GET request to the /v1/user/search/{user} endpoint and return the user information', async () => {
        // Mock the fetch function to return a successful response
        jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
            json: () =>
            Promise.resolve({
                id: '123',
                username: 'test',
                firstName: 'Test',
                lastName: 'User',
            }),
        })
        );

        const user = 'test';
        const result = await userModel.getSearchUsername(user);

        expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3002/v1/user/search/test',
        expect.objectContaining({
            method: 'GET',
            credentials: 'include',
        })
        );
        expect(result).toEqual({
        id: '123',
        username: 'test',
        firstName: 'Test',
        lastName: 'User',
        });
    });
    });

    describe('getSearchUser', () => {
    it('should send a GET request to the /v1/user/search/{first}/{last} endpoint and return the user information', async () => {
        // Mock the fetch function to return a successful response
        jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
            json: () =>
            Promise.resolve({
                id: '123',
                username: 'test',
                firstName: 'Test',
                lastName: 'User',
            }),
        })
        );

        const first = 'Test';
        const last = 'User';
        const result = await userModel.getSearchUser(first, last);

        expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3002/v1/user/search/Test/User',
        expect.objectContaining({
            method: 'GET',
            credentials: 'include',
        })
        );
        expect(result).toEqual({
        id: '123',
        username: 'test',
        firstName: 'Test',
        lastName: 'User',
        });
    });

    it('should return a "No user found" message if the server returns an error', async () => {
        // Mock the fetch function to return an error response
        jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.reject('Error'),
        })
        );

        const first = 'Test';
        const last = 'User';
        const result = await userModel.getSearchUser(first, last);

        expect(result).toEqual('No user found');
    });
});