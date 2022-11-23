import React from 'react';
import {useState, useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';


export default function User({token, user, role}) {
    const [ extraSection, setExtraSection ] = useState(null);
    const navigate = useNavigate();

    //Update and set documents as initial stage.
    useEffect(() => {
        addSection(role)
    }, []);

    async function addSection(value) {
        if (value === "admin") {
            setExtraSection("admin");
        } else if (value === "user") {
            setExtraSection("user");
        }
    };

    function setCity(city){
        if (city === "Visby"){
            navigate('stad/Visby');
        } else if (city === "Borlänge"){
            navigate('stad/Borlänge');
        } else if (city === "Lund"){
            navigate('stad/Lund');
        } else if (city === "Kund"){
            navigate('kund');
        }
    }

    return (
        <div className='body'>
            <div className='kit'>
                {token !== "" ?
                    <div>
                    {extraSection === "admin" ?
                        <div>
                            <h1 className='cityname'>Administratör</h1>
                            <button onClick={() => setCity("Kund")} className="buttonclient">Hantera kund</button>
                            <h2 className='cityname'>Välj stad för att hantera data:</h2>
                            <button onClick={() => setCity("Visby")} className="buttoncity">Visby</button>
                            <button onClick={() => setCity("Borlänge")} className="buttoncity">Borlänge</button>
                            <button onClick={() => setCity("Lund")} className="buttoncity">Lund</button>
                        </div>
                    : extraSection === "user" ? 
                        <h1 className='cityname'>Ditt konto</h1>
                    : <h1 className='cityname'>Oops... Har du gått vilse?</h1>}
                    </div>
                    : <h1 className='cityname'>Oops... Har du gått vilse?</h1>}
            </div>
        </div>
    );
};
