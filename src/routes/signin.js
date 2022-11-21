import React from 'react';
import Login from '../components/Login';

export default function Signin({setToken, token, setUserId, setUserRole}) {
  return (
    <div  className='body'>
      {token !== "" ?
        <div>
      </div>
    :
    <Login setToken={setToken} setUserId={setUserId} setUserRole={setUserRole} />}
      </div>
  );
};
