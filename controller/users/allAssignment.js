const express = require("express");

const router = express();

const Assignment = require("../../database/models/assignmentSchema");
const Submission = require("../../database/models/submissonSchema");
const auth = require("../../middleware/auth");

// fetching all the assignment of a perticular teacher
router.get("/", auth, async (req, res) => {
  if (req.user.type === "teacher") {
    let assignment = [];

    // get all the assignment
    try {
      assignment = await Assignment.find({ teacherID: req.user.id });

      // filter by status
      if (req.body["publish"] === "SCHEDULED") {
        const data = assignment.filter(
          (a) => new Date() < new Date(a["assignedDate"])
        );
        res.status(200).send({ data: data });
      } else if (req.body["publish"] === "ONGOING") {
        const data = assignment.filter(
          (a) =>
            new Date(a["assignedDate"]) <= new Date() &&
            new Date() <= new Date(a["deadline"])
        );
        res.status(200).send({ data: data });
      } else {
        res.status(200).send({ data: assignment });
      }
    } catch (error) {
      // if there is any error
      res.status(400).send({ error: error });
    }
  } else {
    // handling for student

    // get all assignment alloted to perticular user
    const student_assignment = await Assignment.find({
      studentIDs: { $in: [req.user.id] },
    });

    // get all submission of the student
    const submission = await Submission.find({ studentID: req.user.id });

    const submitted_assignment_list = [];
    for (let i = 0; i < submission.length; i++) {
      submitted_assignment_list.push(submission[i].assignmentID);
    }

    if (req.body.status === "SUBMITTED") {
      if (req.body["publish"] === "SCHEDULED") {
        res
          .status(200)
          .send(
            "It is not possible to have submitted assignment if its not ongoing!"
          );
      } else if (req.body["publish"] === "ONGOING") {
        const submitted_assignments = student_assignment.filter(
          (task) =>
            submitted_assignment_list.includes(task._id.toString()) &&
            new Date(task["assignedDate"]) <= new Date() &&
            new Date() <= new Date(task["deadline"])
        );

        res.status(200).send({ daat: submitted_assignments });
      } else {
        const submitted_assignments = student_assignment.filter((a) =>
          submitted_assignment_list.includes(a._id.toString())
        );

        res.status(200).send({ data: submitted_assignments });
      }
    }

    if (req.body.status === "PENDING") {
      if (req.body["publish"] === "SCHEDULED") {
        const pendingAssignment = student_assignment.filter(
          (a) =>
            !submitted_assignment_list.includes(a._id.toString()) &&
            new Date() < new Date(a["assignedDate"])
        );
        res.status(200).send({ data: pendingAssignment });
      } else if (req.body["publish"] === "ONGOING") {
        const pendingAssignment = student_assignment.filter(
          (a) =>
            !submitted_assignment_list.includes(a._id.toString()) &&
            new Date(a["assignedDate"]) <= new Date() &&
            new Date() <= new Date(task["deadline"])
        );
        res.status(200).send({ data: pendingAssignment });
      } else {
        const pendingAssignment = student_assignment.filter(
          (a) => !submitted_assignment_list.includes(a._id.toString())
        );
        res.status(200).send({ data: pendingAssignment });
      }
    }

    if (req.body.status === "OVERDUE") {
      // all assignment which are not submitted by the student after the dead line are overdue
      // scheduled and ongoing assignments cannot be on overdue
      // only assignments that passed their deadline can be on overdue
      if (
        req.body["publish"] === "SCHEDULED" ||
        req.body["publish"] === "ONGOING"
      ) {
        res.status(400).send({ data: "Assignment are not overdue" });
      } else {
        const overdueAssignmant = student_assignment.filter(
          (a) =>
            !submitted_assignment_list.includes(a._id.toString("hex")) &&
            new Date() > new Date(task["deadline"])
        );
        res.status(200).send({ data: overdueAssignmant });
      }
    }

    // if not any condition is not met then defualt case fetch all the assignemnt of the students
    res.status(200).send({ data: student_assignment });
  }
});

// for testing purpose
// router.get('/', (req, res) => {
//     res.send('Welcome to the All Assignment Page');
// });

module.exports = router;
