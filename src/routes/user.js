import React from 'react';
import {useState, useEffect} from 'react';

import Client from '../components/client/client.js';
import AdminIndex from './admin/adminindex.js';


export default function User({token, user, role}) {
    return (
        <div className='body'>
            <div className='kit'>
                {token !== "" ?
                    <div>
                    {role === "admin" ?
                        <AdminIndex/>
                    : role === "customer" ? 
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
