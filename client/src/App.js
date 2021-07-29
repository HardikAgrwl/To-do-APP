import jwtDecode from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginComponent from "./Components/auth/LoginComponent";
import RegisterComponent from "./Components/auth/RegisterComponent";
import HomeComponent from "./Components/layout/HomeComponent";
import NavComponent from "./Components/layout/NavComponent";
import { ToastComponent } from "./Components/layout/toastComponent";
import TodoComponent from "./Components/layout/TodoComponent";
import setAuthToken from "./Components/utils/setAuthToken";

const App = () => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    userDetail: {},
  });

  const token = useRef(null);

  useEffect(() => {
    //Loading jwt Token from localStorage
    let validUser = { ...user };
    if (localStorage.getItem("jwtToken")) {
      token.current = localStorage.getItem("jwtToken");
      setAuthToken(token.current);
      const decoded = jwtDecode(token.current);
      //checking if jwt is expired
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime);
      else validUser = { ...user, isAuthenticated: true, userDetail: decoded };
    }
    setUser(validUser);
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <ToastComponent />
      <Router>
        <NavComponent
          isAuthenticated={user.isAuthenticated}
          user={user}
          setUser={setUser}
        />
        <Route path="/" exact>
          {user.isAuthenticated ? (
            <TodoComponent user={user.userDetail} />
          ) : (
            <HomeComponent />
          )}
        </Route>
        <Route path="/register" exact>
          {user.isAuthenticated ? (
            <TodoComponent user={user.userDetail} />
          ) : (
            <RegisterComponent />
          )}
        </Route>
        <Route path="/login" exact>
          {user.isAuthenticated ? (
            <TodoComponent user={user.userDetail} />
          ) : (
            <LoginComponent setUser={setUser} user={user} />
          )}
        </Route>
      </Router>
    </>
  );
};

export default App;
