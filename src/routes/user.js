import React from 'react';
import AdminIndex from './admin/adminindex.js';


export default function User({token, role, fullUser}) {
    return (
        <div className='body'>
            <div className='kit'>
                {token !== "" ?
                    <div>
                        {fullUser === "loading" ?
                            <div className="spinner-container-center">
                                <div className="loading-spinner"></div>
                            </div>
                            :
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
