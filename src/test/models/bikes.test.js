import bikesModel from '../../models/bikes';

describe('getAllBikes', () => {
  it('should return a list of all bikes', async () => {
    // Setup a mock for the fetch function
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve([{ id: 1, name: 'Bike 1' }, { id: 2, name: 'Bike 2' }])
    }));

    // Call the getAllBikes method
    const bikes = await bikesModel.getAllBikes();

    // Verify that the correct URL was called
    expect(fetch).toHaveBeenCalledWith('http://localhost:3002/v1/bikes', {
      method: 'GET',
      credentials: 'include'
    });

    // Verify that the correct result was returned
    expect(bikes).toEqual([{ id: 1, name: 'Bike 1' }, { id: 2, name: 'Bike 2' }]);
  });
});

