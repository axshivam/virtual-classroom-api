const express = require('express');

const router = express();

const Assignment = require('../../database/models/assignmentSchema');

// fetching all the assignment of a perticular teacher
router.get('/', async (req, res) => {

    if(req.user.accountType !== 'teacher') {
        res.status(401).send('Unauthorized, Only teacher can fetch all assigment created him/her!')
    }

    const assignment = await Assignment.find({teacherID: req.user.id});
    
    res.status(200).send({data: assignment});
});


// for testing purpose
// router.get('/', (req, res) => {
//     res.send('Welcome to the All Assignment Page');
// });

module.exports = router;