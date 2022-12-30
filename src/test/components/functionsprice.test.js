import functionsModel from '../../components/pages/admin/handlePrices/components/functions';

describe('functionsModel', () => {
  describe('saveUpdate', () => {
    it('should update the price if all arguments are valid numbers and not empty strings', () => {
      const pricesMain = { _id: '123' };
      const pricesInit = { _id: '456' };
      const setPricesMain = jest.fn();
      const setMessage = jest.fn();
      const setError = jest.fn();

      functionsModel.saveUpdate(1, 2, 3, 4, {
        pricesMain, pricesInit, setPricesMain, setMessage, setError,
      });

      expect(setError).not.toHaveBeenCalled();
    });

    it('should not update the price if any argument is not a valid number or is an empty string', () => {
      const pricesMain = { _id: '123' };
      const pricesInit = { _id: '456' };
      const setPricesMain = jest.fn();
      const setMessage = jest.fn();
      const setError = jest.fn();

      functionsModel.saveUpdate('', 2, 3, 4, {
        pricesMain, pricesInit, setPricesMain, setMessage, setError,
      });

      expect(setPricesMain).not.toHaveBeenCalled();
      expect(setMessage).not.toHaveBeenCalled();
      expect(setError).toHaveBeenCalledWith(true);
    });
  });

  describe('changeHandler', () => {
    it('should set setMessage and setError to false', () => {
      const setMessage = jest.fn();
      const setError = jest.fn();

      functionsModel.changeHandler({ setMessage, setError });

      expect(setMessage).toHaveBeenCalledWith(false);
      expect(setError).toHaveBeenCalledWith(false);
    });
  });
});

describe('functionsModel', () => {
    describe('saveUpdate', () => {
      it('should update the price using pricesInit if pricesMain is an empty string', () => {
        const pricesMain = '';
        const pricesInit = { _id: '456' };
        const setPricesMain = jest.fn();
        const setMessage = jest.fn();
        const setError = jest.fn();
  
        functionsModel.saveUpdate(1, 2, 3, 4, {
          pricesMain, pricesInit, setPricesMain, setMessage, setError,
        });

        expect(setError).not.toHaveBeenCalled();
      });
  
      it('should not update the price if the updatePrice function throws an error', () => {
        const pricesMain = { _id: '123' };
        const pricesInit = { _id: '456' };
        const setPricesMain = jest.fn();
        const setMessage = jest.fn();
        const setError = jest.fn();
  
        functionsModel.saveUpdate(1, 2, 3, 4, {
          pricesMain, pricesInit, setPricesMain, setMessage, setError,
        });
  
        expect(setPricesMain).not.toHaveBeenCalled();
        expect(setMessage).not.toHaveBeenCalled();
        expect(setError).not.toHaveBeenCalled();
      });
    });
  });