import React from 'react';
import {useState} from 'react';
import {
  Link,
} from "react-router-dom";
import { AiOutlineSearch } from 'react-icons/ai';
  
const Search = () => {
  const [Comment, setComment] = useState("");
  function commentHandler(event) {
    setComment(key => ({...key, ...{search: event.target.value}}));
  };

  function handleClick(event) {
    document.getElementById("comment").value = "";
  };


  return (
    <>
        <input type="comment" defaultValue={"Sök här"} name="comment" className="comment" onChange={commentHandler} onClick={handleClick} />
        <Link to={`search/${Comment.search}`} className="nav-links" ><AiOutlineSearch /></Link>
    </>
  );
};
  
export default Search;