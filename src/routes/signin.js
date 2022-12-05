import React from 'react';
import Start from '../components/signin/index';

export default function Signin({setToken, token, setUserId, setUserRole, user}) {
  return (
    <div  className='body'>
      {token !== "" ?
        <div>
      </div>
    :
    <Start setToken={setToken} setUserId={setUserId} setUserRole={setUserRole} user={user} />}
      </div>
  );
};
