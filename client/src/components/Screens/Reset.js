import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import M from "materialize-css";

const Reset = () => {
  
  const history = useHistory();
  const [email, setEmail] = useState("");
  
  function postData() {
    
    fetch("/app/resetpassword", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        
      }),
    })
      .then((res) => res.json())
      .then((data) => {
     
        
          M.toast({ html: data.message, classes: "#4caf50 green" });
          history.push("/signin");
        
        console.log(data);
      });
  }
  return (
    <div className="mycard">
      <div className="card auth-card">
        <h2>Instagram</h2>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      
        <button
          className="btn #5c6bc0 indigo lighten-1"
          type="submit"
          name="action"
          onClick={() => postData()}
        >
          Reset Password
        </button>
       
      </div>
    </div>
  );
};

export default Reset;
