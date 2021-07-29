import axios from "axios";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { toastConfig } from "../layout/toastComponent";
import ValidateLoginInput from "../validation/login";

const Login = ({ setUser, user }) => {
  const history = useHistory();
  const initialData = {
    email: "",
    password: "",
    errors: {},
  };

  const [formData, setFormData] = useState(initialData);
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const postData = async (data) => {
    try {
      //post data
      const res = await axios.post("/api/users/login", data);
      //show success toast notification
      toast.success("Login Successfull", toastConfig);
      //save token in localstorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      //retrieve payload from jwt token
      const decoded = jwtDecode(token);
      setUser({ ...user, isAuthenticated: true, userDetail: decoded });
      history.push("/");
    } catch (err) {
      //show error notification if login fails
      console.log(err);
      toast.error(err.response.data.info, toastConfig);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: formData.email,
      password: formData.password,
    };
    //validate input data
    const { errors, isValid } = ValidateLoginInput(userData);
    if (isValid) {
      await postData(userData);
      setFormData(initialData);
    } else {
      setFormData({ ...formData, errors: errors });
    }
  };

  const { errors } = formData;
  return (
    <div className="container">
      <div style={{ marginTop: "0.5rem" }} className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Login</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Don't have an account?{" "}
              <Link to="/register">
                <b>Register</b>
              </Link>
            </p>
          </div>
          <form noValidate onSubmit={submitHandler}>
            <div className="input-field col s12">
              <input
                onChange={changeHandler}
                value={formData.email}
                id="email"
                type="email"
              />
              <label htmlFor="email">Email</label>
              <div className="error">{errors.email}</div>
            </div>
            <div className="input-field col s12">
              <input
                onChange={changeHandler}
                value={formData.password}
                id="password"
                type="password"
              />
              <label htmlFor="password">Password</label>
              <div className="error">{errors.password}</div>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-2"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
