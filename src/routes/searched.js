import React from 'react';
import {
  useParams
} from "react-router-dom";
  
const Searched = () => {
  let { id } = useParams();

  if (id === "function search() { [native code] }") {
    id = ""
  }

  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};
  
export default Searched;
