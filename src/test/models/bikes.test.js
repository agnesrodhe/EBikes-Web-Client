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

describe('getAllBikesCity', () => {
  it('should return an array of bikes for the specified city', async () => {
    // Arrange
    const cityID = 1;
    const mockResponse = [{ id: 1, name: 'Bike 1' }, { id: 2, name: 'Bike 2' }];
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    );

    // Act
    const result = await bikesModel.getAllBikesCity(cityID);

    // Assert
    expect(result).toEqual(mockResponse);
  });
});

describe('getAllActiveBikes', () => {
  it('should return an array of active bikes for the specified city', async () => {
    // Arrange
    const cityID = 1;
    const mockResponse = [{ id: 1, name: 'Bike 1' }, { id: 2, name: 'Bike 2' }];
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    );

    // Act
    const result = await bikesModel.getAllActiveBikes(cityID);

    // Assert
    expect(result).toEqual(mockResponse);
  });
});

describe('getAllInActiveBikes', () => {
  it('should return an array of inactive bikes for the specified city', async () => {
    // Arrange
    const cityID = 1;
    const mockResponse = [{ id: 1, name: 'Bike 1' }, { id: 2, name: 'Bike 2' }];
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    );

    // Act
    const result = await bikesModel.getAllInActiveBikes(cityID);

    // Assert
    expect(result).toEqual(mockResponse);
  });

  it('should return "Only active bikes in this city" if there are no inactive bikes in the city', async () => {
    // Arrange
    const cityID = 1;
    const mockResponse = { message: 'Only active bikes in this city' };
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    );

    // Act
    const result = await bikesModel.getAllInActiveBikes(cityID);

    // Assert
    expect(result).toEqual('Only active bikes in this city');
  });
});

describe('getCityZones', () => {
  it('should return an array of cities', async () => {
    // Arrange
    const mockResponse = [{ id: 1, name: 'City 1' }, { id: 2, name: 'City 2' }];
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    );

    // Act
    const result = await bikesModel.getCityZones();

    // Assert
    expect(result).toEqual(mockResponse);
  });
});

describe('getAllChargingZones', () => {
  it('should return an array of charging zones', async () => {
    // Arrange
    const mockResponse = [{ id: 1, name: 'Charging Zone 1' }, { id: 2, name: 'Charging Zone 2' }];
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    );

    // Act
    const result = await bikesModel.getAllChargingZones();

    // Assert
    expect(result).toEqual(mockResponse);
  });
});

describe('getAllParkingZones', () => {
  it('should return an array of parking zones', async () => {
    // Arrange
    const mockResponse = [{ id: 1, name: 'Parking Zone 1' }, { id: 2, name: 'Parking Zone 2' }];
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    );

    // Act
    const result = await bikesModel.getAllParkingZones();

    // Assert
    expect(result).toEqual(mockResponse);
  });
});


describe('updateOneBike', () => {
  it('should update a bike and return the updated bike', async () => {
    // Arrange
    const id = 1;
    const value = { name: 'Updated Bike' };
    const mockResponse = { id: 1, name: 'Updated Bike' };
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    );

    // Act
    const result = await bikesModel.updateOneBike(id, value);

    // Assert
    expect(result).toEqual(mockResponse);
  });
});

