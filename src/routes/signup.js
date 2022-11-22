import React from 'react';
import Login from '../components/Login';

export default function Signup({setToken, token, setUserId, setUserRole}) {
  return (
    <div  className='body'>
        <p>Ändra vid oauth</p>
    <Login setToken={setToken} setUserId={setUserId} setUserRole={setUserRole} />
      </div>
  );
};
