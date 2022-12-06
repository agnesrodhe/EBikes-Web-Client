import React from 'react';
import {useState, useEffect} from 'react';
import {NavLink}  from 'react-router-dom';


const BaseURL = "http://localhost:3002/v1/test/test";


export default function Client({token, user, role}) {
  const [click, setClick] = useState(false);
  const [Data, setData] = useState("")

  useEffect(() => {
    function setter(e) {
      setData(e)
      return
    }
    if ('EventSource' in window) {
      let source = new EventSource(BaseURL, {withCredentials: true})
      source.onmessage = e => {
        console.log('onmessage');
        console.log(e);
        setter(e.data)
      }
      source.addEventListener('ping', e => {
        console.log(e);
        setter(e.data)
      });
      source.addEventListener('open', function(e) {
        console.log("connected")
      }, false);
      source.addEventListener('error', function(e) {
        console.log("error")
      }, false);
    }
  }, []);

  const handleClick = () => setClick(!click);
  return (
    <div  className='body'>
      {role === "admin" ?
            <div>
            <h1 className='cityname'>Administratör</h1>
            <div className='adminindex'>
            <NavLink
                    exact
                    to="/anvandare"
                    activeClassName="active"
                    className="nav-links-back"
                    onClick={click ? handleClick : null}
                >
                    Tillbaka
                </NavLink>
            <h1 className='clientdata'>Kunder</h1>
            <h1 className='clientdata'>{Data}</h1>
            </div>
        </div>
        : 
        <div className='body'>
            <h1 className='cityname'>Oops... Har du gått vilse?</h1>
        </div>}
      </div>
  );
};
