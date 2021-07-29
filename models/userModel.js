import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
});

const UserModel = mongoose.model("UserModel", UserSchema);

export default UserModel;
