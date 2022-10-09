const express = require('express');

const router = express.Router();
const register = require('./register');
const login = require('./login');

router.use('/register', register);
router.use('/login', login);

router.get('/', (req, res) => {
    res.send('Welcome to the Home page of authentication!');
})

module.exports = router;