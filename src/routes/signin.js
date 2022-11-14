import React from 'react';
import { useState, useEffect } from 'react';
import Login from '../components/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AiFillFileAdd, AiFillEdit, AiOutlineUserAdd, AiTwotoneDelete } from "react-icons/ai";

export default function About({setToken, token, setUserId, setUserRole, user, role}) {
  const [ extraSection, setExtraSection ] = useState(null);

  //Update and set documents as initial stage.
  useEffect(() => {
    addSection(role)
  }, []);

  async function addSection(value) {
    if (value === "admin") {
      setExtraSection("admin");
    } else if (value === "user") {
      setExtraSection("user");
    }
  };

  return (
    <div  className='body'>
      {token !== "" ?
        <div>
          <div className='navloggedin'>

            </div>
          {extraSection === "admin" ? 
              (
                  <Routes>
                    <Route path="/loggain" element={ <Navigate to="/admin" /> } />
                  </Routes>
              )
            : extraSection === "user" ? 
              (
                  <Routes>
                    <Route path="/loggain" element={ <Navigate to="/user" /> } />
                  </Routes>
              )
          : null}
      </div>
    :
    <Login setToken={setToken} setUserId={setUserId} setUserRole={setUserRole} />}
      </div>
  );
};
