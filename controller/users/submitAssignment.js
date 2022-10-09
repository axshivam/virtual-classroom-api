const express = require("express");

const { ObjectId } = require("mongodb");

const router = express();

const AssignmentModel = require("../../database/models/assignmentSchema");
const SubmissionModel = require("../../database/models/submissonSchema");
const auth = require("../../middleware/auth");

router.post("/", auth, async (req, res) => {
  const { assignmentID, comments } = req.body;

  if (!studentID || !assignmentID) {
    res.status(400).send("Please provide all fields");
  }

  // check if the submitter is a student
  if (req.user.accountType !== "student") {
    res
      .status(401)
      .send("Unauthorized, Only student can submit the assignment");
  }

  if (!ObjectId.isValid(assignmentID)) {
    res.status(400).send("Provided Id is incorrect");
  }

  let assignment;

  try {
    assignment = await AssignmentModel.findOne({ _id: assignmentID });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }

  if (!assignment || assignment.length === 0) {
    res.status(400).send("Assignment with given id is not available");
  }

  // query submission model and check if a submission already exists for the given student id and assignment id
  let submitted;
  try {
    submitted = await SubmissionModel.findOne({
      studentID: req.user.id,
      assignmentID: assignmentID,
    });
  } catch (error) {
    res.status(400).send(error);
  }

  // check if the assignment has not been submitted already
  if (submitted) {
    res.status(400).send("Cannot make another submission!");
  }

  // make the submission
  let data;
  try {
    const submitObj = {
      studentID: req.user.id,
      assignmentID: assignmentID,
      comments: comments,
    };
    // submission successful
    data = await new SubmissionModel(submitObj).save();
  } catch (e) {
    res.status(404).send({error: error});
  }

  res.status(201).send({ message: "Assignment Submitted Successfully!" });
});

module.exports = router;
