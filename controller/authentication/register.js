require("dotenv").config();
const express = require("express");
require("../../database/config").connect();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/userSchema");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { firstname, lastname, email, username, password, accountType } =
      req.body;
    console.log(firstname, lastname, email, password, username, accountType);

    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !accountType ||
      !username
    ) {
      res
        .status(404)
        .send("All details are mantadory for registering as a user!");
    }

    // check for safe side, althrough i used unique property in enail and username
    const user = await User.find({ username: username });
    if (user.length) {
      res.status(404).send("Username already exists!");
    }

    // if gets any other account type rather than student and teacher, although added checks in schema for this issue also
    if (accountType != "teacher" && accountType != "student") {
      res.status(400).send("Account type must be teacher or student type!");
    }

    // creating a strong password from existing password using hashing
    const newpassword = await bcrypt.hash(password, 10);

    // creating the user object for storing into database
    const userObj = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      username: username,
      password: newpassword,
      accountType: accountType,
    };

    let saveduser;
    try {
      // storing the user registration detials into the database
      saveduser = await new User(userObj).save();
    } catch (error) {
      // if there is any error occured in process of storing into the database
      res.status(400).send({error: error});
    }

    // creating the jwt token object with help of id, username and type of user
    const tokenObj = {
      id: saveduser._id,
      username: saveduser["username"],
      type: saveduser["accountType"],
    };

    // signing the token obj with my secret key for creating the jwt token
    const token = jwt.sign(tokenObj, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    // return token as result if user details successfully stored
    res.status(201).send({token: token});
  } catch (error) {
    // if there is any error in whole process
    console.log(error);
  }
});

module.exports = router;
