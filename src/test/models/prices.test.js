import priceModel from '../../models/prices';

describe('priceModel', () => {
    describe('getPrice', () => {
        it('sends a GET request to the correct URL', () => {
            // Create a mock fetch function that returns a resolved promise
            // with a fake response object
            global.fetch = jest.fn().mockResolvedValue({
            json: () => ({})
            });

            // Call the getPrice function
            priceModel.getPrice();

            // Expect the fetch function to have been called with the correct URL
            expect(global.fetch).toHaveBeenCalledWith('http://localhost:3002/v1/prices', {
            method: 'GET',
            credentials: 'include'
            });
        });

        it('returns the expected data when the request is successful', async () => {
            // Create a mock fetch function that returns a resolved promise
            // with a fake response object
            global.fetch = jest.fn().mockResolvedValue({
            json: () => ({ data: 'test data' })
            });

            // Call the getPrice function and save the result
            const result = await priceModel.getPrice();

            // Expect the result to be the expected data
            expect(result).toEqual({ data: 'test data' });
        });

        it('returns the expected error message when the request fails', async () => {
            // Create a mock fetch function that returns a rejected promise
            global.fetch = jest.fn().mockRejectedValue(new Error());

            // Call the getPrice function and save the result
            const result = await priceModel.getPrice();

            // Expect the result to be the expected error message
            expect(result).toEqual('No prices found');
        });
    });
});

describe('priceModel', () => {
    describe('updatePrice', () => {
        it('sends a PUT request to the correct URL', () => {
        // Create a mock fetch function that returns a resolved promise
        // with a fake response object
        global.fetch = jest.fn().mockResolvedValue({
            json: () => ({})
        });

        // Call the updatePrice function with an ID of 1 and a body object
        priceModel.updatePrice(1, { name: 'Test Price' });

        // Expect the fetch function to have been called with the correct URL
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3002/v1/prices/1', {
            method: 'PUT',
            headers: {
            "Content-type": "application/json"
            },
            body: JSON.stringify({ name: 'Test Price' }),
            credentials: 'include',
        });
        });

        it('returns the expected data when the request is successful', async () => {
        // Create a mock fetch function that returns a resolved promise
        // with a fake response object
        global.fetch = jest.fn().mockResolvedValue({
            json: () => ({ data: 'test data' })
        });

        // Call the updatePrice function with an ID of 1 and a body object, and save the result
        const result = await priceModel.updatePrice(1, { name: 'Test Price' });

        // Expect the result to be the expected data
        expect(result).toEqual({ data: 'test data' });
        });
    });
    });
