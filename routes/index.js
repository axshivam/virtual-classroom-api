const express = require('express');

const router = express.Router();
router.use(express.urlencoded({ extended: false }));
// putting all the api code part into the controller
const api = require('../controller');

router.use('/api', api);

// testing purpose home page of the app
router.get('/', (req, res) => {
    res.send('Welcome to the Home page of the application!');
});

module.exports = router;