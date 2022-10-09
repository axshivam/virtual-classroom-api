require('dotenv').config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../../database/models/userSchema");

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(404).send("Login details missing!");
  }

  const userExist = await user.find({ username: username });
  console.log('User exist ===>>', userExist);
  if (!userExist) {
    res.send(404).status("given username is not exist!");
  } else {
    let matchedPassword = await bcrypt.compare(password, userExist[0].password);

    console.log('matched password', matchedPassword);

    if (!matchedPassword) {
      res.status(404).send("Incorrect Password!");
    } else {
      const tokenObj = {
        id: userExist[0]._id,
        username: userExist[0].username,
        type: userExist[0].accountType,
      };

      // creating the token new token
      const token = jwt.sign(tokenObj, process.env.SECRET_KEY, {
        expiresIn: "5m",
      });

      // return the token and success code after successfully login
      res.status(200).send(token);
    }
  }
});

module.exports = router;
