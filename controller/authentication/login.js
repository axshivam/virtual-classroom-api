require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../../database/models/userSchema");

const router = express.Router();

router.post("/", async (req, res) => {
  // accepting username and password of the user
  const { username, password } = req.body;
  if (!username || !password) {
    res
      .status(404)
      .send("Login details missing, please provide all mantadory detials!");
  }

  const userExist = await user.find({ username: username });

  if (!userExist) {
    res
      .send(404)
      .status(
        "given username is not exist, please enter your correct username!"
      );
  } else {
    // if user exist
    let matchedPassword = await bcrypt.compare(password, userExist[0].password);

    // for testing purpose
    console.log("matched password", matchedPassword);

    if (!matchedPassword) {
      res.status(404).send("Incorrect Password, please try again!");
    } else {
      // creating the token object after successful login
      const tokenObj = {
        id: userExist[0]._id,
        username: userExist[0].username,
        type: userExist[0].accountType,
      };

      // creating the token new token by signing the token object with private key
      const token = jwt.sign(tokenObj, process.env.SECRET_KEY, {
        expiresIn: "2h",
      });

      // return the token and success code after successfully login
      res.status(200).send({token: token});
    }
  }
});

module.exports = router;
