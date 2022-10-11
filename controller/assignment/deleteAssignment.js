const express = require("express");

const { ObjectId } = require("mongodb");
const router = express.Router();

const Assignment = require("../../database/models/assignmentSchema");
const auth = require("../../middleware/auth");

router.delete("/:id", auth, async (req, res) => {
  const assignmentID = req.params.id;

  // check for assignment ID
  if (!ObjectId.isValid(assignmentID)) {
    res.send(400).send("Invalid Id!");
  }

  // fetching the assignment details from the database
  const assignment = await Assignment.find({ _id: assignmentID });

  if (!assignment) {
    res.status(400).send("Assignment not exist for given Id!");
  }

  console.log('User ====>>>> ', req.user);

  // check for only teacher can delete the assignment
  if (!req.user || req.user.type !== "teacher") {
    res.status(401).send("Unauthorized! only teacher can delete assignment");
  }

  let data;

  try {
    data = await Assignment.deleteOne({ _id: assignmentID });
  } catch (error) {
    console.log("Error ===>>>", error);
    res.send(400).send(error);
  }

  res.status(400).send({message: data});
});


// for testing purpose
// router.get("/", (req, res) => {
//   res.send("Welcome to delete Assignment Request Page");
// });

module.exports = router;
