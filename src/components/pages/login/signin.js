import React from 'react';

//Import component
import Start from './components/index';

//Function to check if token is set, otherwise show signin form.
export default function Signin({setToken, token, setUserId, setUserRole, setUser}) {
    return (
        <div  className='body'>
            {token !== "" ?
                <div>
                </div>
                :
                <Start setToken={setToken} setUserId={setUserId} setUserRole={setUserRole}
                    setUser={setUser}/>
            }
        </div>
    );
}
