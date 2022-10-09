const express = require('express');

const router = express.Router();

const allAssignment = require('./allAssignment');
const assignmentDetails = require('./assignmentDetails');
const submitAssignment = require('./submitAssignment');


router.use('/fetchall', allAssignment);
router.use('/assignmentdetails', assignmentDetails);
router.use('/submit', submitAssignment);


router.get('/', (req, res) => {
    res.status(200).send('Welcome to the home page of users section');
})

module.exports = router;