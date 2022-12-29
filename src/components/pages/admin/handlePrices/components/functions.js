/*
Import model for users to work toward rest:api.
*/
import priceModel from '../../../../../models/prices';

/*
Model for functions for prices.js.
*/
const functionsModel = {
    /*
    Check if values if integer and not empty string. Save result.
    */
    saveUpdate: function saveUpdate(start, minutetaxa, penaltyfee, bonus,
        {pricesMain, pricesInit, setPricesMain, setMessage, setError}) {
        if (!isNaN(+start) && !isNaN(+minutetaxa) && !isNaN(+penaltyfee) && !isNaN(+bonus)
            && start !== "" && minutetaxa !== "" && penaltyfee !== "" && bonus !== "") {
            let value = { bonus: bonus,
                startfee: start,
                minutetaxa: minutetaxa,
                penaltyfee: penaltyfee};

            if (pricesMain !== "") {
                priceModel.updatePrice(pricesMain._id, value)
                    .then(function() {
                        priceModel.getPrice().then(function(result) {
                            setPricesMain(result[0]);
                            setMessage(true);
                        });
                    });
            } else {
                priceModel.updatePrice(pricesInit._id, value)
                    .then(function() {
                        priceModel.getPrice().then(function(result) {
                            setPricesMain(result[0]);
                            setMessage(true);
                        });
                    });
            }
        } else {
            setError(true);
        }
    },

    /*
    Reser error handlers at new input.
    */
    changeHandler: function changeHandler({setMessage, setError}) {
        setMessage(false);
        setError(false);
    }
};

export default functionsModel;
