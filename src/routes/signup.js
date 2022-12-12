import React from 'react';
import StartRegister from '../components/signup/index';

export default function Signup({setToken, setUserId, setUserRole}) {
    return (
        <div  className='body'>
            <StartRegister setToken={setToken} setUserId={setUserId} setUserRole={setUserRole} />
        </div>
    );
}
