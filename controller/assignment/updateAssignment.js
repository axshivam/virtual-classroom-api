const express = require("express");
const { ObjectId } = require("mongodb");

const router = express.Router();

const Assignment = require("../../database/models/assignmentSchema");
const auth = require("../../middleware/auth");

router.patch("/:id", auth, async (req, res) => {
  const assignmentID = req.params.id;

  // check for assignment ID
  if (!ObjectId.isValid(assignmentID)) {
    res.send(400).send("Invalid Id!");
  }

  // check for only teacher can update the assignment
  if (!req.user || req.user.type !== "teacher") {
    res.status(401).send("Unauthorized! only teacher can update assignment");
  }

  const assignment = await Assignment.find({ _id: assignmentID });

  // update the assignment details
  const updateDetails = {
    studentIDs:
      req.body.studentIDs !== null
        ? req.body.studentIDs
        : assignment[0].studentIDs,
    description:
      req.body.description !== null
        ? req.body.description
        : assignment[0].description,
    assignedDate:
      req.body.assignedDate !== null
        ? req.body.assignedDate
        : assignment[0].assignedDate,
    deadline:
      req.body.deadline !== null ? req.body.deadline : assignment[0].deadline,
  };

  let data;
  try {
    data = await Assignment.updateOne({ _id: assignmentID }, updateDetails);
  } catch (error) {
    console.log("Error ===>> ", error);
    res.status(400).send({ error: error });
  }

  res.status(400).send({ message: "Record update successfully!" });
});

// for testing purpose only
// router.get("/", (req, res) => {
//   res.send("Welcome to update Assignment Request Page");
// });

module.exports = router;
