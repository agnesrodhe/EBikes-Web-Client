import React from 'react';
import {useState, useEffect} from 'react';

import image from "./images/homeone.png";


export default function Home({token}) {

  return (
    <div className='body'>
      <div className='kit'>
      <img src={image} alt="image" className="homepicone"></img>
      </div>
    </div>
  );
};
