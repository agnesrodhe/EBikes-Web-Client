import React from 'react';
import StartRegister from '../components/signup/index';

export default function Signup({setToken, token, setUserId, setUserRole}) {
  return (
    <div  className='body'>
    <StartRegister setToken={setToken} setUserId={setUserId} setUserRole={setUserRole} />
      </div>
  );
};
