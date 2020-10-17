import React, { useState, useContext } from "react";
import { Link, useHistory,useParams } from "react-router-dom";
import M from "materialize-css";

const Newpassword = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const {token}=useParams();
  console.log(token)
  function postData() {
    
    fetch("/app/newpassword", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        
        password: password,
        token:token
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        
        if (data.error) {
          M.toast({ html: data.error, classes: "#f44336 red" });
        } else {
          M.toast({ html: data.message, classes: "#4caf50 green" });
          history.push("/signin");
        }
        console.log(data);
      });
  }
  return (
    <div className="mycard">
      <div className="card auth-card">
        <h2>Instagram</h2>
   
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your New password"
        />
        <button
          className="btn #5c6bc0 indigo lighten-1"
          type="submit"
          name="action"
          onClick={() => postData()}
        >
          Change Password
        </button>
        
      </div>
    </div>
  );
};

export default Newpassword;
