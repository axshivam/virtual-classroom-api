const mongoose = require("mongoose");

const schema = mongoose.Schema;

// According to the problem statement, there can be two types of user
const accounts = ['student', 'teacher'];

const userSchema = schema({
  firstname: {
    type: String,
    default: null,
    required: true,
  },
  lastname: {
    type: String,
    default: null,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
    // there are two types of user ===>>> student and teacher
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
