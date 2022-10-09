const mongoose = require("mongoose")
const schema = mongoose.Schema


const submissionSchema = schema({
    studentID: {
      type: String,
      required: true,
    },
    assignmentID: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      default: null,
    },
  });


const submission = mongoose.model("submissions", submissionSchema)

module.exports = submission