import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";

const Navbar = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const renderList = () => {
    if (state) {
      return [
        <li>
          <Link to="/profile">Profile</Link>
        </li>,
        <li>
          <Link to="/create">Create Post</Link>
        </li>,
        <li>
        <Link to="/subpost">My following Post</Link>
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
          <Link to="/Signin">Sign In</Link>
        </li>,
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>,
      ];
    }
  };

  return (
    <nav>
      <div className="nav-wrapper ">
        <Link to={state ? "/" : "/signin"} className="brand-logo">
          Instagram
        </Link>
        <ul id="nav-mobile" className="right ">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
