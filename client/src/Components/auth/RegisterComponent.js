import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { toastConfig } from "../layout/toastComponent";
import ValidateRegisterInput from "../validation/register";

const Register = () => {
  const initialData = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {},
  };
  const [formData, setFormData] = useState(initialData);

  const history = useHistory();
  const postData = async (data) => {
    try {
      //post data
      await axios.post("api/users/register", data);
      //show success toast notification
      toast.success("Registered successfully! Login", toastConfig);
      history.push("/login");
    } catch (err) {
      //show error notification if registration fails
      toast.error(err.response.data.info, toastConfig);
    }
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password2: formData.password2,
    };
    //validate input data
    const { errors, isValid } = ValidateRegisterInput(newUser);
    if (isValid) {
      await postData(newUser);
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
              <b>Register</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Already have an account?{" "}
              <Link to="/login">
                <b>Log in</b>
              </Link>
            </p>
          </div>
          <form noValidate onSubmit={submitHandler}>
            <div className="input-field col s12">
              <input
                onChange={changeHandler}
                value={formData.name}
                id="name"
                type="text"
              />
              <label htmlFor="name">Name</label>
              <div className="error">{errors.name}</div>
            </div>
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
            <div className="input-field col s12">
              <input
                onChange={changeHandler}
                value={formData.password2}
                id="password2"
                type="password"
              />
              <label htmlFor="password2">Confirm Password</label>
              <div className="error">{errors.password2}</div>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "0.5rem",
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-2"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
