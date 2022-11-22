import React from 'react';
import {useState} from 'react';
import {NavLink}  from 'react-router-dom';

import image from "./logo.png";

import { AiOutlineMenu} from 'react-icons/ai';
import { FiLogOut } from "react-icons/fi";

export default function Navbar({setToken, token, setUserId, setUserRole, role, user}) {
  const [click, setClick] = useState(false);
  //const userID = useRef("")

  async function logout() {
    setToken("")
    setUserId("")
    setUserRole("")
    handleClick()
  }

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);
  
  return (
    <div className='header'>
    <div className={click ? "main-container" : ""}  onClick={()=>Close()} />
      <nav className="navbar" onClick={e => e.stopPropagation()}>
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
          <img src={image} alt="logo" className="logo"></img>
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                <a className='navfont'>Hem</a>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/om"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                <a className='navfont'>Om</a>
              </NavLink>
            </li>
            {user !== "" ? (
            <li className="nav-item">
              <NavLink
                exact
                to="/anvandare"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                <a className='navfont'>Användare</a>
              </NavLink>
              </li>
            ) : 
            <li className="nav-item">
            <NavLink
              exact
              to="/loggain"
              activeClassName="active"
              className="nav-links"
              onClick={click ? handleClick : null}
            >
              <a className='navfont'>Logga in</a>
            </NavLink>
          </li>}
            {token !== "" ? (
                <li className="nav-item">
                <NavLink
                  exact
                  to="/"
                  activeClassName="active"
                  className="nav-links"
                  onClick={logout}
                >
                  <FiLogOut/>
                </NavLink>
              </li>
            ) : null}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}><AiOutlineMenu></AiOutlineMenu></i>
          </div>
        </div>
      </nav>
    </ div>
  );
}