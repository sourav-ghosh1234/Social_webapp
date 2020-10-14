import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image,setImage]=useState("")
  const [url,setUrl]=useState(undefined)
  useEffect(()=>{
    if(url){
      uploadUser();
    }

  },[url])
  function postData() {
    if(image){
      uploadPic();
    }else{
      uploadUser();
    }
   
  }
  
  function uploadPic() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "InstaClone");
    data.append("cloud_name", "sourav1234");
    fetch("	https://api.cloudinary.com/v1_1/sourav1234/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUrl(result.url);
      })
  }
  function uploadUser(){
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      console.log("wrong");
      return M.toast({ html: "invalid email", classes: "#f44336 red" });
    }
    console.log("called");
    fetch("/app/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        pic:url
      }),
    })
      .then((res) => res.json())
      .then((data) => {
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
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your Name"
        />
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
        
      <div className="file-field input-field">
        <div className="btn #5c6bc0 indigo lighten-1">
          <span>Upload Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
        <input
          className="btn #5c6bc0 indigo lighten-1"
          type="submit"
          name="action"
          value="Submit"
          onClick={() => postData()}
        />

        <h5>
          <Link to="/signin">Already have an account?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
