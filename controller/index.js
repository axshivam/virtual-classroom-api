const express = require('express');

const router = express.Router();

const authentication = require('./authentication/');
const user = require('./users/');
const assignment = require('./assignment/');

// all api for authentication purpose
router.use('/auth', authentication);

// all api related to assignment details [teacher]
router.use('/assignment', assignment);

// all api related to students assignment submission
router.use('/user', user);

// for testing purpose
// router.get('/', (req, res) => {
//     res.send('Welcome to the home page of api!');
// });

module.exports = router;