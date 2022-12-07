import React from 'react';
import {NavLink, useNavigate}  from 'react-router-dom';

import videobike from "../components/video/video.mp4"
import videohowto from "../components/video/videotoabout.mp4"

export default function Home() {
  const navigate = useNavigate();

  return (
      <div>
          <video autoPlay loop muted className="video">
            <source src={videobike} type="video/mp4"/>
          </video>
          <div className='videocontainer'>
          <h1 className='videotitle'>Det ska vara enkelt att resa</h1>
          <NavLink exact to="/registrera" className="videobutton"> Registrera dig här</NavLink>
        </div>
        <div className='body'>
          <video autoPlay loop muted className="video">
              <source src={videohowto} type="video/mp4"/>
            </video>
        </div>
    </div>
  );
};
