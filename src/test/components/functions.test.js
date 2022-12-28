import bikesModel from '../../models/bikes';
import functionsModel from '../../components/pages/admin/handleBikes/components/functions/functions';

jest.mock('../../models/bikes');

describe('updateZoneMain function', () => {
  it('should update state variables with data from bikesModel', async () => {
    // Mock the return value of the getCityZones function
    bikesModel.getCityZones.mockResolvedValue([
      {
        _id: 'city1',
        name: 'city1',
        location: {
          coordinates: [[[1, 1], [1, 2], [2, 2], [2, 1], [1, 1]]]
        }
      },
      {
        _id: 'city2',
        name: 'city2',
        location: {
          coordinates: [[[3, 3], [3, 4], [4, 4], [4, 3], [3, 3]]]
        }
      }
    ]);

    // Mock the return value of the getAllActiveBikes function
    bikesModel.getAllActiveBikes.mockResolvedValue([
      { _id: 'bike1', name: 'bike1', status: 'active', inCity: 'city1' },
      { _id: 'bike2', name: 'bike2', status: 'active', inCity: 'city1' }
    ]);

    // Mock the return value of the getAllChargingZones function
    bikesModel.getAllChargingZones.mockResolvedValue([
      { _id: 'charging1', inCity: 'city1' },
      { _id: 'charging2', inCity: 'city1' }
    ]);

    // Mock the return value of the getAllParkingZones function
    bikesModel.getAllParkingZones.mockResolvedValue([
      { _id: 'parking1', inCity: 'city1' },
      { _id: 'parking2', inCity: 'city1' }
    ]);

    // Declare mock functions for the state variables
    const setMainZone = jest.fn();
    const setBikes = jest.fn();
    const setBikesError = jest.fn();
    const setChargingPoints = jest.fn();
    const setParkingPoints = jest.fn();
    const setZoomLevel = jest.fn();

    // Declare a mock ref object to use as the cityID argument
    const cityID = { current: null };

    // Call the updateZoneMain function
    functionsModel.updateZoneMain('active', 'city1', cityID, {
      setMainZone,
      setBikes,
      setBikesError,
      setChargingPoints,
      setParkingPoints,
      setZoomLevel
    });

    expect(bikesModel.getCityZones).toHaveBeenCalled();
    expect(functionsModel.updateZoneMain).toBeDefined();
    expect(bikesModel.getAllParkingZones).toBeDefined();
    expect(bikesModel.getAllChargingZones).toBeDefined();
    expect(bikesModel.getAllActiveBikes).toBeDefined();
  })});

  describe('counter function', () => {
    it('should return an array of bikes that are parked in the specified position', () => {
      const position = { _id: '1' };
      const bikes = [      { name: 'Bike 1', charging: '2', parked: '1' },      { name: 'Bike 2', charging: '0', parked: '2' },      { name: 'Bike 3', charging: '1', parked: '1' },    ];
      const result = functionsModel.counter(position, bikes);
      expect(result).toEqual([{ name: 'Bike 1' }, { name: 'Bike 3' }]);
    });
  
    it('should return an empty array if there are no bikes parked in the specified position', () => {
      const position = { _id: '1' };
      const bikes = [      { name: 'Bike 1', charging: '2', parked: '3' },      { name: 'Bike 2', charging: '3', parked: '2' },      { name: 'Bike 3', charging: '4', parked: '4' },    ];
      const result = functionsModel.counter(position, bikes);
      expect(result).toEqual([]);
    });
  });


  describe('statusGenerator function', () => {
    it('should set the select option and return all bikes if the "Alla" option is selected', () => {
      const value = 'Alla';
      const bikes = [      { name: 'Bike 1', status: 'active' },      { name: 'Bike 2', status: 'inactive' },      { name: 'Bike 3', status: 'active' },    ];
      const setStatus = jest.fn();
      const setSelectedOption = jest.fn();
      functionsModel.statusGenerator(value, bikes, { setStatus, setSelectedOption });
      expect(setSelectedOption).toHaveBeenCalledWith(value);
      expect(setStatus).toHaveBeenCalledWith(bikes);
    });
  
    it('should set the select option and return only active bikes if the "Aktiva" option is selected', () => {
      const value = 'Aktiva';
      const bikes = [      { name: 'Bike 1', active: 'active' },      { name: 'Bike 2', active: null },      { name: 'Bike 3', active: 'active' },    ];
      const setStatus = jest.fn();
      const setSelectedOption = jest.fn();
      functionsModel.statusGenerator(value, bikes, { setStatus, setSelectedOption });
      expect(setSelectedOption).toHaveBeenCalledWith(value);
      expect(setStatus).toHaveBeenCalledWith([{ name: 'Bike 1', active: 'active' }, { name: 'Bike 3', active: 'active' }]);
    });
  });

  describe('unSelectOne', () => {
    it('should reset the state variables when a bike is unselected', () => {
      // Arrange
      const value = 'Alla';
      const bikes = [      {        id: 1,        name: 'Bike 1',        status: 'active',        location: { lat: 55.676098, lng: 12.568337 }      },      {        id: 2,        name: 'Bike 2',        status: 'inactive',        location: { lat: 55.676098, lng: 12.568337 }      },      {        id: 3,        name: 'Bike 3',        status: 'inactive',        location: { lat: 55.676098, lng: 12.568337 }      }    ];
      const setSelectedBike = jest.fn();
      const setStatus = jest.fn();
      const setSelectedOption = jest.fn();
      const selectedBikeFix = { current: { id: 1 } };
      const updatedOne = { current: { id: 1 } };
  
      // Act
      functionsModel.unSelectOne(value, bikes, {
        selectedBikeFix,
        updatedOne,
        setSelectedBike,
        setStatus,
        setSelectedOption
      });
  
      // Assert
      expect(selectedBikeFix.current).toBe(null);
      expect(updatedOne.current).toBe(null);
      expect(setSelectedBike).toHaveBeenCalledWith(null);
      expect(setStatus).toHaveBeenCalled();
      expect(setSelectedOption).toHaveBeenCalled();
    });
  });

  describe('updateOne', () => {
    it('should update the state variables when the update button is clicked', () => {
      // Arrange
      const setSelectedBike = jest.fn();
      const updatedOne = { current: null };
  
      // Act
      functionsModel.updateOne({ updatedOne, setSelectedBike });
  
      // Assert
      expect(updatedOne.current).toBe('updated');
      expect(setSelectedBike).toHaveBeenCalledWith(null);
    });
  });

  describe('selectedOne', () => {
    it('should update the state variables when a bike is selected', () => {
      // Arrange
      const value = {
        id: 1,
        name: 'Bike 1',
        status: 'active',
        location: { lat: 55.676098, lng: 12.568337 },
        history: [
          {
            date: '2022-01-01',
            action: 'checked out',
            location: { lat: 55.676098, lng: 12.568337 }
          },
          {
            date: '2022-01-02',
            action: 'returned',
            location: { lat: 55.676098, lng: 12.568337 }
          }
        ]
      };
      const setsavedStatus = jest.fn();
      const setStatus = jest.fn();
      const setSelectedBike = jest.fn();
      const selectedBikeFix = { current: null };
      const updatedOne = { current: null };
      const selectedOption = 'Aktiva';
  
      // Act
      functionsModel.selectedOne(value, {
        selectedBikeFix,
        updatedOne,
        setsavedStatus,
        setStatus,
        setSelectedBike,
        selectedOption
      });
  
      // Assert
      expect(selectedBikeFix.current).toBe('choosen');
      expect(updatedOne.current).toBe(null);
      expect(setsavedStatus).toHaveBeenCalledWith('Aktiva');
      expect(setStatus).toHaveBeenCalledWith([value]);
      expect(setSelectedBike).toHaveBeenCalledWith(value.history);
    })});

    describe('updateBikes', () => {
        it('should retrieve all the bikes in a given city and update the state variables', async () => {
          // Arrange
          const cityID = { current: '123' };
          const bikes = [
            {
              id: 1,
              name: 'Bike 1',
              status: 'active',
              location: { lat: 55.676098, lng: 12.568337 }
            },
            {
              id: 2,
              name: 'Bike 2',
              status: 'inactive',
              location: { lat: 55.676098, lng: 12.568337 }
            },
            {
              id: 3,
              name: 'Bike 3',
              status: 'inactive',
              location: { lat: 55.676098, lng: 12.568337 }
            }
          ];
          bikesModel.getAllBikesCity.mockResolvedValue(bikes);
          const setBikes = jest.fn();
          const setStatus = jest.fn();
      
          // Act
          functionsModel.updateBikes(cityID, { setBikes, setStatus });
      
          // Assert
          expect(bikesModel.getAllBikesCity).toHaveBeenCalledWith('123');
        });
      });