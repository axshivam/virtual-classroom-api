const express = require('express');

const router = express.Router();
const api = require('../controller');

router.use('/api', api);
router.get('/', (req, res) => {
    res.send('Welcome to the Home page of the application!');
});

module.exports = router;