import React from "react";


//internal import 
import Style from './Error.module.css';
import { error } from "console";


const Error = () => {
  return (
    <div className="Style Error">
      <div className="Style Error_box">
        <h1>Please Fix This Error & Reload Browser</h1>
        {error}
      </div>
    </div>
    )
};

export default Error;
