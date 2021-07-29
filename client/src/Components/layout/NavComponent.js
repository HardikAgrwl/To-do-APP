import React from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import setAuthToken from "../utils/setAuthToken";
import { toastConfig } from "./toastComponent";

const NavComponent = ({ isAuthenticated, user, setUser }) => {
  const history = useHistory();

  const logoutHandler = (e) => {
    e.preventDefault();
    //delete jwt token from localstorage
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    setUser({ ...user, isAuthenticated: false, userDetail: {} });
    //show success toast notification
    toast.success("Logged out Successfully", toastConfig);
    history.push("/");
  };
  return (
    <nav>
      <div className="nav-wrapper blue accent-2">
        <Link to="/" className="brand-logo center ">
          <i className="large material-icons">assignment</i>To do
        </Link>
        {isAuthenticated ? (
          <Link className="right" onClick={(e) => logoutHandler(e)} to="/">
            Logout
          </Link>
        ) : null}
      </div>
    </nav>
  );
};

export default NavComponent;
