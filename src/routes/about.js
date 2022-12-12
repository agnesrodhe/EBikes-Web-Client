import React from 'react';

import videobike from "../components/video/girlonbike.mp4";
import image1 from "../components/images/home.png";
import image2 from "../components/images/enkelt.png";

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
