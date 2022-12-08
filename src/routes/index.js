import React from 'react';
import {NavLink}  from 'react-router-dom';

import videobike from "../components/video/video.mp4";
import videohowto from "../components/video/easy2.mp4";
import laddaner from "../components/images/waving.png";

export default function Home() {
    return (
        <div>
            <video autoPlay loop muted className="video">
                <source src={videobike} type="video/mp4"/>
            </video>
            <div className='videocontainer'>
                <h1 className='videotitle'>Det ska vara enkelt att resa</h1>
                <NavLink exact to="/registrera" className="videobutton">
                Registrera dig här</NavLink>
            </div>
            <div className='body'>
                <img src={laddaner} alt="startimage" className="downloader"></img>
                <div className='boxaroundvideo'>
                    <video autoPlay loop muted className="videotwo">
                        <source src={videohowto} type="video/mp4"/>
                    </video>
                </div>
            </div>
        </div>
    );
}
