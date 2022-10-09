const express = require('express');

const router = express.Router();
const register = require('./register');
const login = require('./login');

// for handling user registration
router.use('/register', register);
// for handling user login 
router.use('/login', login);


// for testing purpose
// router.get('/', (req, res) => {
//     res.send('Welcome to the Home page of authentication!');
// });

module.exports = router;