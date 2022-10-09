const express = require('express');

const router = express.Router();

const authentication = require('./authentication/');

router.use('/auth', authentication);

router.get('/', (req, res) => {
    res.send('Welcome to the home page of api!');
});

module.exports = router;