import React from 'react';

//Import component
import AdminIndex from '../admin/indexpage/startpage';

//Function to determine role for user. If customer renatigate to app. If admin continue.
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
