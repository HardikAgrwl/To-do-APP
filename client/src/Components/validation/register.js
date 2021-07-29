import isEmpty from "is-empty";
import validator from "validator";

const ValidateRegisterInput = (data) => {
  let errors = {};
  //convert empty fields to emty strings to apply validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  //Name & Email check
  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  } else if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  //Password check
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  } else if (!validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "Password must be at least 8 characters";
  } else if (validator.isEmpty(data.password2)) {
    errors.password2 = "Password field is required";
  } else if (!validator.isAlphanumeric(data.password)) {
    errors.password = "Password must be alphanumeric only";
  } else if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default ValidateRegisterInput;
