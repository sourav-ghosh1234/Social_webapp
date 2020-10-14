import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";


const UserProfile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [showfollow,setshowFollow]=useState(true);
  const [userProfile, setProfile] = useState(null);
  const {id}=useParams();
  console.log(id)

  useEffect(() => {
    fetch(`/profile/getprofilepost/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.user.followers)
        // var a=state._id.toString()
        console.log(state._id)


    
        setProfile(result)
        for(var i=0;i<result.user.followers.length;i++){
          console.log(result.user.followers[i])
          

          
          if(result.user.followers[i]===state._id){

            
          setshowFollow(false);
          break;
        }
        }
      });
  }, []);

  const followUser=()=>{
    fetch(`/profile/follow`, {
      method:"put",
      headers: {
        "Content-Type":"application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId:id
      })
    }).then(res=>res.json())
      .then(result=>{
        console.log(result)
        dispatch({type:"UPDATE",payload:{following:result.following,followers:result.followers}})
        localStorage.setItem("user",JSON.stringify(result))
        setProfile((prevstate=>{
          return{
            ...prevstate,
            user:{...prevstate.user,
            followers:[...prevstate.user.followers,result._id]
            }
          
          }
        }))
        setshowFollow(false)



      })
    

  }
  
  const unfollowUser=()=>{
    fetch(`/profile/unfollow`, {
      method:"put",
      headers: {
        "Content-Type":"application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId:id
      })
    }).then(res=>res.json())
      .then(result=>{
        console.log(result)
        dispatch({type:"UPDATE",payload:{following:result.following,followers:result.followers}})
        localStorage.setItem("user",JSON.stringify(result))
        
        setProfile((prevstate=>{
          const newFollower=prevstate.user.followers.filter(item=>item!= result._id)
          return{
            ...prevstate,
            user:{...prevstate.user,
            followers:newFollower
            }
          
          }
        }))
        setshowFollow(true)
        



      })
    

  }
  return (
      <>
      {userProfile ?
      <div style={{ maxWidth: "580px", margin: "0px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src={userProfile.user.pic}
          />
        </div>
        <div>
            <h4>{userProfile.user.name}</h4>
            <h5>{userProfile.user.email}</h5>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h5>{userProfile.post.length} posts</h5>
            <h5>{userProfile.user.followers.length} followers</h5>
            <h5>{userProfile.user.followings.length} followings</h5>
          </div>
          {showfollow  ?
                     <button
                     style={{margin:"20px"}}
                     className="btn #5c6bc0 indigo lighten-1"
                     type="submit"
                     name="action"
                     onClick={() => followUser()}
                   >
                     Follow
                   </button>
            :
            <button
            
            style={{margin:"20px"}}
            className="btn #5c6bc0 indigo lighten-1"
            type="submit"
            name="action"
            onClick={() => unfollowUser()}
          >
            Unfollow
          </button>
           
          
        
        }
            
           
     
        </div>
      </div>
      <div className="gallery">
        {userProfile.post.map((pic) => {
          return <img key={pic._id} className="item" src={pic.photo} />;
        })}
      </div>
    </div>



      
      :<h2>Loadinhg</h2>
      }
    
    </>
  );
};

export default UserProfile;
