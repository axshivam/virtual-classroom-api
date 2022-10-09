const mongoose = require("mongoose");

const schema = mongoose.Schema;

const accounts = ['student', 'teacher'];

const assignmentSchema = schema({
  teacherID: {
    type: String,
    required: true,
  },
  studentIDs: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  assignedDate: {
    type: Date,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
});

const Assignment = mongoose.model("assignments", assignmentSchema);

module.exports = Assignment;