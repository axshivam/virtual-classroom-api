const mongoose = require("mongoose")
const schema = mongoose.Schema


// student id, assignment id, remark
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