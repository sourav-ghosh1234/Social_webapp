import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";

const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [pics, setPics] = useState([]);
  const [image,setImage]=useState("")
  const [url,setUrl]=useState("")
  const [con,setCon]=useState(false);

  useEffect(() => {
    fetch("/post/getmypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result);
        setCon(true)
       
      });
  }, []);


  useEffect(()=>{
    if(image){
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
          localStorage.setItem("user",JSON.stringify({...state,pic:result.url}));
          dispatch({type:"UPDATEPIC",payload:result.url})
          fetch("/app/updatepic", {
            method:"put",
            headers: {
              "Content-Type":"application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
              
            },
            body:JSON.stringify({
              pic:result.url
            })
          }).then((res) => res.json())
            .then((result) => {
             console.log(result)
             localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
             dispatch({type:"UPDATEPIC",payload:result.pic})
              })
            .catch(err=>{
              console.log(err)
            })
          // window.location.reload()
            
            });

    }

  },[image])
  function updatePhoto(file){
    
    setImage(file)
    console.log(image)
  
      
      
  }
  return (
    <div style={{ maxWidth: "580px", margin: "0px auto" }}>
      <div style={{
          margin: "18px 0px",
          borderBottom: "1px solid grey"}}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px"
          
        }}
      >
  
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src={state?state.pic:"loading"}
          />
        </div>
        <div>
          <h4>{state ? state.name : "loading"}</h4>
          <h4>{state ? state.email : "loading"}</h4>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h5>{pics.length} posts</h5>
            <h5>{state? state.followers.length :0} followers</h5>
            <h5>{state ? state.followings.length : 0} followings</h5>
          </div>
        
      </div>
          
        </div>
        
      
      
        <div className="file-field input-field">
        <div className="btn #5c6bc0 indigo lighten-1">
          <span>Update Image</span>
          <input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      </div>
      
        
      <div className="gallery">
        {pics.map((pic) => {
          return <img key={pic._id} className="item" src={pic.photo} />;
        })}
      </div>
    </div>
  );
};

export default Profile;
