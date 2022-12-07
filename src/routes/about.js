import React from 'react';
import {useNavigate} from 'react-router-dom';

import image1 from "../components/images/home.png";

export default function About() {
  const navigate = useNavigate();
  function navigatereg() {
    navigate('/registrera');
  }

  return (
        <div className='body'>
        <div className='kit'>
          <div className='homepageimages'>
          <img src={image1} alt="startimage" className="homepicone"></img>
          <button onClick={() => navigatereg()} className='buttonnewclient'>Registrera dig? Klicka här!</button>
          </div>
        </div>
      </div>
  );
};
