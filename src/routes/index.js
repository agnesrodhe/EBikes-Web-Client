import React from 'react';
import {useState, useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

import image1 from "./images/home.png";


export default function Home() {
  const navigate = useNavigate();
  function navigatereg() {
    navigate('/registrera');
  }

  return (
    <div className='body'>
      <div className='kit'>
        <div className='homepageimages'>
        <img src={image1} alt="image" className="homepicone"></img>
        <button onClick={() => navigatereg()} className='buttonnewclient'>Registrera dig? Klicka här!</button>
        </div>
      </div>
    </div>
  );
};
