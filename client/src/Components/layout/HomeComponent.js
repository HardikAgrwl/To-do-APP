import React from "react";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  return (
    <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row">
        <div className="col s12 center-align">
          <h1>
            To-do app built with{" "}
            <span style={{ fontFamily: "monospace", fontWeight: "bold" }}>
              MERN
            </span>{" "}
            stack
          </h1>
          <p className="flow-text grey-text text-darken-1">
            A full-stack To-do app with user authentication via passport and
            JWTs
          </p>
          <br />
          <div className="col s6">
            <Link
              to="/register"
              style={{
                width: "140px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-2"
            >
              Register
            </Link>
          </div>
          <div className="col s6">
            <Link
              to="/login"
              style={{
                width: "140px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
              }}
              className="btn btn-large btn-flat waves-effect white black-text"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
