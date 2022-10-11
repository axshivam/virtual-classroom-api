const express = require("express");

const router = express.Router();

const Assignment = require("../../database/models/assignmentSchema");

const auth = require("../../middleware/auth");

router.post("/", auth, async (req, res) => {
  // destructuring the request body
  const { studentIDs, description, assignedDate, deadline } =
    req.body;

  console.log( studentIDs, description, assignedDate, deadline );

  if (!studentIDs || !description || !assignedDate || !deadline) {
    res.status(400).send("Incomplete details, please provide all the details!");
  }

  // for testing purpose
  console.log(req.user);

  // check for only teacher can create the assignment
  if (!req.user || req.user.type !== "teacher") {
    res.status(401).send("Unauthorized! only teacher can create assignment");
  }

  // check for deadline must be greater than assigndate
  if (new Date(deadline) < new Date(assignedDate)) {
    res.status(400).send("Deadline must be greater than assigned date!");
  }

  // creating the assignment object for storing into the database
  const assignmentObj = {
    teacherID: req.user.id,
    studentIDs: studentIDs,
    description: description,
    assignedDate: assignedDate,
    deadline: deadline,
  };

  let assignmentData;
  try {
    assignmentData = await new Assignment(assignmentObj).save();
  } catch (error) {
    console.log(`Error's: ${error}`);
    res.status(400).send(error);
  }

  res.status(200).send({ data: assignmentData });
});

// for testing purpose
// router.get('/', (req, res) => {
//     res.send('Welcome to create Assignment Request Page');
// });

module.exports = router;
