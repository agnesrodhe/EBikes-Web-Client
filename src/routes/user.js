import React from 'react';
import {useState, useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

import Client from '../components/user/client.js';
import AdminIndex from './admin/adminindex.js';


export default function User({token, user, role}) {
    const [ extraSection, setExtraSection ] = useState(null);
    const [comp, setComponent] = useState("")
    const navigate = useNavigate();

    //Update and set documents as initial stage.
    useEffect(() => {
        clickhandler("userdata")
        addSection(role)
    }, []);

    //To render one-page
    async function clickhandler(value) {
        if (value === "userdata"){
            setComponent("userdata")
        } else if (value === "saldo"){
            setComponent("saldo")
        } else if (value === "history"){
            setComponent("history")
        }
    };

    async function addSection(value) {
        if (value === "admin") {
            setExtraSection("admin");
        } else if (value === "customer") {
            setExtraSection("customer");
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
                        <AdminIndex/>
                    : extraSection === "customer" ? 
                        <Client role={role} token={token} user={user}/>
                        : 
                        <div className='body'>
                            <h1 className='cityname'>Oops... Har du gått vilse?</h1>
                        </div>}
                    </div>
                : 
                <div className='body'>
                    <h1 className='cityname'>Oops... Har du gått vilse?</h1>
                </div>}
            </div>
        </div>
    );
};
