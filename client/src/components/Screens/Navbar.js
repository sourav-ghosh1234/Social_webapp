import React, { useContext,useRef,useEffect,useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import M from "materialize-css";

const Navbar = () => {
  const searchModel=useRef();
  const [search,setSearch]=useState("")
  const [userdetails,setUserdetails]=useState([])
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    M.Modal.init(searchModel.current)

    
  }, [])
  const renderList = () => {
    if (state) {
      return [
        <li key="1">
            <i className="material-icons  modal-trigger" data-target="modal1" style={{color:"black"}}>search</i>

        </li>,
    
        <li key="2">
          <Link to="/profile">Profile</Link>
        </li>,
        <li key="3">
          <Link to="/create">Create Post</Link>
        </li>,
        <li>
        <Link key="4"to="/subpost">My following Post</Link>
        </li>,
        <button
          className="btn #5c6bc0 indigo lighten-1"
          type="submit"
          name="action"
          onClick={() => {
            localStorage.clear();
            dispatch({ type: "CLEAR" });
            history.push("/signin");
          }}
        >
          Log out
        </button>,
      ];
    } else {
      return [
        <li>
          <Link key="5" to="/Signin">Sign In</Link>
        </li>,
        <li>
          <Link key="6" to="/signup">Sign Up</Link>
        </li>,
      ];
    }
  };
const fetchUser=(query)=>{
  setSearch(query)
  fetch("/app/searchuser", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
     
      pattern:query
    }),
  })
    .then((res) => res.json())
    .then((data) => {
    
      setUserdetails(data.user)
    });
}



  return (
    <nav>
      <div className="nav-wrapper ">
        <Link to={state ? "/" : "/signin"} className="brand-logo">
          Instagram
        </Link>
        <ul id="nav-mobile" className="right ">
          {renderList()}
        </ul>
        <div id="modal1" className="modal" ref={searchModel} style={{color:"black"}}>
        <div className="modal-content">
        <input
          type="text"
          value={search}
          onChange={(e) => fetchUser(e.target.value)}
          placeholder="Search Users"
        />
         <div className="collection">
           {userdetails.map(item=>{
             return <Link to={item._id!==state._id?"/profile/"+item._id:"/profile" } onClick={()=>{
              setSearch('');
              M.Modal.getInstance(searchModel.current).close()}}class="collection-item">{item.email}</Link>
           })}
           
          
         </div>
           
         </div>
         <div className="modal-footer">
           <button class="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>Close</button>
           </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
