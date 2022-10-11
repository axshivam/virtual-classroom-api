const express = require('express');

const router = express();

const {ObjectId} = require('mongodb');

const submission = require('../../database/models/submissonSchema');
const auth = require('../../middleware/auth');

router.get('/:assignment_id', auth, async (req, res) => {
    const assignmentID = req.params.assignment_id;


    if(!ObjectId.isValid(assignmentID)) {
        res.status(400).send('Can not process! Kindly check the assignment id.')
    }

    if(req.user.type !== 'student') {
        res.status(401).send({message: 'Only student can view the assignment details!'})
    }

    let data;

    try {
        data = await submission.find({assignmentID: assignmentID});
        console.log(data);
    } catch (error) {
        console.log(error);
        res.status(502).send({error: error});
    }

    res.status(200).send({data: data});
});

module.exports = router;