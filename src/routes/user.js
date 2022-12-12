import React from 'react';
import AdminIndex from './admin/adminindex.js';


export default function User({token, role}) {
    return (
        <div className='body'>
            <div className='kit'>
                {token !== "" ?
                    <div>
                        {role === "admin" ?
                            <AdminIndex/>
                            : role === "customer" ?
                                window.location.replace("http://localhost:3001/")
                                :
                                <div className='body'>
                                    <h1 className='cityname'>Oops... Har du gått vilse?</h1>
                                </div>
                        }
                    </div>
                    :
                    <div className='body'>
                        <h1 className='cityname'>Oops... Har du gått vilse?</h1>
                    </div>}
            </div>
        </div>
    );
}
