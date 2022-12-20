import React from 'react';

import { GiPositionMarker } from "react-icons/gi";
import { IoIosCall, IoIosMail } from "react-icons/io";

export default function Footer() {
    return (
        <div className='footer-section'>
            <div className="footer-cta">
                <div className='footerbox'>
                    <div className="cta-text">
                        <h4>Hitta oss <GiPositionMarker size={25}/></h4>
                        <p>Valhallavägen 1, 371 41 Karlskrona</p>
                    </div>
                </div>
                <div className='footerbox'>
                    <div className="cta-text">
                        <h4>Ring oss <IoIosCall size={25}/></h4>
                        <p>012-3456789</p>
                    </div>
                </div>
                <div className='footerbox'>
                    <div className="cta-text">
                        <h4>Maila oss <IoIosMail size={25}/></h4>
                        <p>mail@mail.se</p>
                    </div>
                </div>
            </div>
            <div className="copyright-area">
                <div className="copyright-text">
                    <p>Copyright &copy; 2023, All Right Reserved WEBIKE AB.</p>
                </div>
                <div className="footer-menu">
                    <ul>
                        <li><a href="/om">Home</a></li>
                        <li><a href="/om">Terms</a></li>
                        <li><a href="/om">Privacy</a></li>
                        <li><a href="/om">Policy</a></li>
                        <li><a href="/om">Contact</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
