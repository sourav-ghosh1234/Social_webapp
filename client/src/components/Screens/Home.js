import React, { useContext, useEffect, useState } from "react";
import {UserContext} from '../../App';
import {Link} from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch('/post/getpost', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result);
      });
  }, []);

  const likePost=(id)=>{
    fetch('/post/like',{
      method:"put",
      headers:{
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),

      },
      body:JSON.stringify({
        postId:id
      })
    }).then(res=>res.json())
    .then(res=>{
      console.log(res);
      const newData=data.map(item=>{
        if(item._id===res._id){
          return res;
        }
        else{
          return item;
        }

      })
      setData(newData)
    })
  }


  const unlikePost=(id)=>{
    fetch('/post/unlike',{
      method:"put",
      headers:{
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),

      },
      body:JSON.stringify({
        postId:id
      })
    }).then(res=>res.json())
    .then(res=>{
      // console.log(res);
      const newData=data.map(item=>{
        if(item._id===res._id){
          return res;
        }
        else{
          return item;
        }

      })
      setData(newData)
      
      })
    }
        
  const makeComment=(com,postId)=>{
    fetch('/post/comments',{
      method:"put",
      headers:{
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),

      },
      body:JSON.stringify({

        postId:postId,
        com:com
      })
    })
      .then(res=>res.json())
      .then(res=>{
        console.log(res);
        const newData=data.map(item=>{
          if(item._id===res._id){
            return res;
          }
          else{
            return item;
          }
  
        })
        setData(newData)
      })

  }
  const deletePost=(postId)=>{
    fetch(`/post/deletepost/${postId}`,{
      method:"delete",
      headers:{
        
        Authorization: "Bearer " + localStorage.getItem("jwt"),

      },
     
    })
      .then(res=>res.json())
      .then(res=>{
        console.log(res)
        const newData=data.filter(item=>{
          return item._id!==res.result._id
        })
        setData(newData)
      })


  }


  
  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5><Link to={item.postedby._id!==state._id ? "/profile/"+item.postedby._id:"/profile"}>{item.postedby.name}</Link>{item.postedby._id===state._id
            && <i className="material-icons" onClick={()=>{deletePost(item._id)}}style={{float:"right"}}>delete</i>
            }</h5>
            
            <div className="card-image">
              <img src={item.photo} />
            </div>
            <div className="card-content">
              <i className="material-icons" style={{ color: "red" }}>
                favorite
              </i>
              {item.likes.includes(state._id)
              ?
              <i className="material-icons" onClick={()=>{unlikePost(item._id)}}>thumb_down</i>
              :
              <i className="material-icons" onClick={()=>{likePost(item._id)}}>thumb_up</i>
              
              }
              
              
              <h6>{item.likes.length} Likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {
                item.comments.map(record=>{
                  return (
                    <h6 key={record._key}><span style={{"font-weight":"500"}} >{record.postedby.name}</span><span> </span>{record.text}</h6>
                  )
                })
              }
              <form onSubmit={(e)=>{
                e.preventDefault()
                makeComment(e.target[0].value,item._id)
              }}>
                 <input type="text" placeholder="add a comment" />

              </form>
             
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
