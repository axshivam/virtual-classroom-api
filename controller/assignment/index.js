const express = require('express');

const router = express.Router();
const createAssignment = require('./createAssignment');
const deleteAssignment = require('./deleteAssignment');
const updateAssignment = require('./updateAssignment');

router.use('/create', createAssignment);
router.use('/update', updateAssignment);
router.use('/delete', deleteAssignment);

// for testing purpose
router.get('/', (req, res) => {
    res.send('Welcome to main Assignment APi page');
});

module.exports = router;