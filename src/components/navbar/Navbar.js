import React from 'react';
import {useState} from 'react';
import {NavLink}  from 'react-router-dom';

import image from "./logo.png";

import { AiOutlineMenu, AiOutlineUser, AiFillHome, AiFillInfoCircle} from 'react-icons/ai';
import { MdVerifiedUser } from "react-icons/md";
import { FiLogOut, FiLogIn } from "react-icons/fi";


export default function Navbar({setToken, token, setUserId, setUserRole, role, user}) {
  const [click, setClick] = useState(false);

  async function logout() {
    setToken("")
    setUserId("")
    setUserRole("")
    handleClick()
  }

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);
  console.log(role)
  
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
                <a className='navfont'><AiFillHome size={24}/></a>
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
                <a className='navfont'><AiFillInfoCircle size={24}/></a>
              </NavLink>
            </li>
            {user !== "" ? 
            <>
                { role === "admin" ?
                <li className="nav-item">
              <NavLink
                exact
                to="/anvandare"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                <a className='navfont'><MdVerifiedUser size={24}/></a>
              </NavLink>
              </li>
              : role === "customer" ?
              <li className="nav-item">
              <NavLink
                exact
                to="/anvandare"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                <a className='navfont'>< AiOutlineUser size={24}/></a>
              </NavLink>
              </li> :null}
              </>  :
            <li className="nav-item">
            <NavLink
              exact
              to="/loggain"
              activeClassName="active"
              className="nav-links"
              onClick={click ? handleClick : null}
            >
              <a className='navfont'><FiLogIn size={24}/></a>
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
                  <FiLogOut size={24}/>
                </NavLink>
              </li>
            ): null}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}><AiOutlineMenu size={24}/></i>
          </div>
        </div>
      </nav>
    </ div>
  );
}