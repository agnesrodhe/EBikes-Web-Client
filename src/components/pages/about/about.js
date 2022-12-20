import React from 'react';

import videobike from "./media/girlonbike.mp4";
import image1 from "./media/home.png";
import image2 from "./media/enkelt.png";

export default function About() {
    function navigatereg() {
        window.location.replace("http://localhost:3001/");
    }

    return (
        <>
            <video autoPlay loop muted className="video">
                <source src={videobike} type="video/mp4"/>
            </video>
            <div className='body'>
                <div className='kit'>
                    <div className='homepageimages'>
                        <img src={image1} alt="startimage" className="homepicone"></img>
                        <button onClick={() => navigatereg()} className='buttonnewclient'>
                            Registrera dig? Klicka här!</button>
                    </div>
                </div>
            </div>
            <img src={image2} alt="startimage" className="homepicone"></img>
        </>
    );
}
