import React from 'react';

export default function Client({token, user, role}) {
  return (
    <div  className='body'>
      {role === "admin" ?
        <div>
            <p>Kunddata</p>
      </div>
    : <h1 className='cityname'>Oops... Har du gått vilse?</h1>}
      </div>
  );
};
