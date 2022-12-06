import React from 'react';

export default function UserCash({token, user, role}) {
  return (
    <div  className='body'>
      {role === "kund" ?
        <div>
            <p>Saldo</p>
      </div>
        : 
        <div className='body'>
            <h1 className='cityname'>Oops... Har du gått vilse?</h1>
        </div>}
      </div>
  );
};
