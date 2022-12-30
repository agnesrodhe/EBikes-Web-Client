/*
Import model for users to work toward rest:api.
*/
import userModel from '../../../../../models/users';

const functionsModel = {
    //Save and set changes.
    changeHandler: function changeHandler(event, {setsearch, search}) {
        let newObject = {};

        newObject[event.target.name] = event.target.value;
        setsearch({...search, ...newObject});
    },

    //Function to search for user in model user.
    searcher: function searcher(user, first, last,
        {setErrorMessage, setUsr, setDeleted, updatedOne, advance, search}) {
        updatedOne.current = null;
        setDeleted(false);
        setUsr("");
        if (advance === true) {
            if (user !== "") {
                userModel.getSearchUsername(user).then(function(result) {
                    if (result === "No user found") {
                        setErrorMessage("Ingen användare hittad");
                    } else {
                        setErrorMessage(null);
                        setUsr(result);
                    }
                });
            } else if (first !== "" && last !== "") {
                setErrorMessage(null);
                userModel.getSearchUser(first, last).then(function(result) {
                    if (result === "No user found") {
                        setErrorMessage("Ingen användare hittad");
                    } else {
                        setErrorMessage(null);
                        setUsr(result);
                    }
                });
            } else {
                setErrorMessage("Vänligen fyll i förnamn och efternamn");
            }
        } else {
            userModel.getUser(search.id).then(function(result) {
                if (result === "No user found") {
                    setErrorMessage("Ingen användare hittad");
                } else {
                    setErrorMessage(null);
                    setUsr(result);
                }
            });
        }
    },

    //Set user if found.
    setAll: function setAll({setErrorMessage, setUsr}) {
        setErrorMessage(null);
        userModel.getAllCustomers().then(function(result) {
            if (result === "No user found") {
                setErrorMessage("Ingen användare hittad");
            } else {
                setErrorMessage(null);
                setUsr(result);
            }
        });
    },

    //Select one user.
    SelectOne: function SelectOne(value, {updatedOne, selectedUserFix, setSelectedUser}) {
        selectedUserFix.current = "choosen";
        updatedOne.current = "";
        setSelectedUser(value.history);
    },

    //Update user.
    updateOne: function updateOne(value, {updatedOne, selectedUserFix, setSelectedUser}) {
        updatedOne.current = "updated";
        selectedUserFix.current = "";
        setSelectedUser(value);
    },

    //Uppdate changes with model users.
    saveUpdate: function saveUpdate(id, user, first, last,
        {selectedUserFix, updatedOne, setSelectedUser, setUsr}) {
        let value = { username: user,
            firstName: first,
            lastName: last};

        userModel.updateUser(id, value)
            .then(function() {
                userModel.getUser(id).then(function(result) {
                    setUsr(result);
                });
            });
        selectedUserFix.current = null;
        updatedOne.current = null;
        setSelectedUser(null);
    },

    //Delete user.
    deleteUpdate: function deleteUpdate(picked,
        {deleted, setDeleted, setUsr, selectedUserFix, updatedOne}) {
        if (deleted === true) {
            setDeleted(false);
            userModel.deleteUser(picked._id);
            setUsr("");
            selectedUserFix.current = null;
            updatedOne.current = null;
        } else {
            setDeleted(true);
        }
    },

    //Register new client.
    registerNew: function registerNew(user, first, last, password,
        {setErrorMessage}) {
        if (user && first && last && password) {
            let value = { username: user,
                firstName: first,
                lastName: last,
                password: password};

            userModel.register(value).then(function(result) {
                setErrorMessage(result);
            });
        } else {
            setErrorMessage("Fyll i alla fält.");
        }
    }
};

export default functionsModel;
