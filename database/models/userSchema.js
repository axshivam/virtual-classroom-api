const mongoose = require("mongoose");

const schema = mongoose.Schema;

const accounts = ['student', 'teacher'];

const userSchema = schema({
  firstname: {
    type: String,
    default: null,
  },
  lastname: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  accountType: {
    type: String,
    // there are two types of user ===>>> student and teacher
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
