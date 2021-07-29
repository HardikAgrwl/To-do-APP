import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const router = express.Router();

const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    req.token = token;
    next();
  } else {
    //If header is undefined return Forbidden (403)
    res.sendStatus(403);
  }
};

//@route POST api/users/register
//@desc Register User
//@access Public

router.post("/register", (req, res) => {
  UserModel.findOne({ email: req.body.email }).then((user) => {
    if (user) return res.status(400).json({ info: "Email already exists" });
    let d = new Date();
    const newuser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      date: `${d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear()}`,
      data: [],
    });

    //Hash password before saving
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newuser.password, salt, (err, hash) => {
        if (err) throw err;
        newuser.password = hash;
        newuser
          .save()
          .then((user) => res.json(user))
          .catch((err) => console.log(err));
      });
    });
  });
});

//@route POST api/users/login
//@desc login user and return jwt
//@access Public

router.post("/login", (req, res) => {
  //Find user by email
  UserModel.findOne({ email: req.body.email }).then((user) => {
    if (!user) return res.status(400).json({ info: "Email not found" });
    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (isMatch) {
        //User matched
        //Create JWT payload
        const payload = {
          id: user._id,
          name: user.name,
          data: user.data,
        };

        //Sign token
        jwt.sign(
          payload,
          process.env.SECRET_KEY,
          {
            expiresIn: 3600, // 1hr in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: token,
            });
          }
        );
      } else return res.status(400).json({ info: "password incorrect" });
    });
  });
});

router.get("/:id", checkToken, (req, res) => {
  //verify the JWT token generated for the user
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      res
        .sendStatus(403)
        .json({ info: "Could not connect to the protected route" });
    } else {
      let data;
      //If token is successfully verified, we can send the autorized data
      UserModel.findOne({ _id: authorizedData.id }).then((user) => {
        if (!user) res.status(400).json({ info: "Account not found" });
        data = user.data;
        res.json({
          message: "Successful log in",
          data,
        });
      });
    }
  });
});

router.post("/:id", checkToken, (req, res) => {
  //verify the JWT token generated for the user
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      res
        .sendStatus(403)
        .json({ info: "Could not connect to the protected route" });
    } else {
      //If token is successfully verified, we can send the autorized data
      UserModel.findByIdAndUpdate(
        authorizedData.id,
        { data: req.body },
        { useFindAndModify: false },
        (err, result) => {
          if (err) res.status(400).json({ info: "Failed to update" });
          res.status(200).json({ message: "Saved Successfully" });
        }
      );
    }
  });
});

export default router;
