import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import M from "materialize-css";

const Signin = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function postData() {
    console.log(email, password);
    fetch("/app/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
       
        dispatch({ type: "USER", payload: data.user });
        if (data.error) {
          M.toast({ html: data.error, classes: "#f44336 red" });
        } else {
          M.toast({ html: "signed in", classes: "#4caf50 green" });
          history.push("/");
        }
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
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <button
          className="btn #5c6bc0 indigo lighten-1"
          type="submit"
          name="action"
          onClick={() => postData()}
        >
          Sign In
        </button>
        <h5>
          <Link to="/signup">Dont have an account?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signin;
