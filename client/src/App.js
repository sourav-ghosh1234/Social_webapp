import React, {
  useEffect,
  createContext,
  useReducer,
  userContext,
  useContext,
} from "react";
import "./App.css";
import Navbar from "./components/Screens/Navbar";
import Signin from "./components/Screens/Signin";
import Home from "./components/Screens/Home";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import UserProfile from "./components/Screens/Userprofile";
import Profile from "./components/Screens/Profile";
import Signup from "./components/Screens/Signup";
import Createpost from "./components/Screens/Createpost";
import Subpost from "./components/Screens/Subscribepost";
import { reducer, initialState } from "./reducers/userReducer";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      history.push("/signin");
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/signin">
        <Signin />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/create">
        <Createpost />
      </Route>
      <Route exact path="/profile/:id">
       <UserProfile />
      </Route>
      <Route exact path="/subpost">
       <Subpost />
      </Route>
    </Switch>
  );
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
