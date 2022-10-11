// developed by Shiv Sharma ==>>> https://axshivam.github.io

require('dotenv').config();

const express = require('express');

var cookieParser = require("cookie-parser");

const app = express();

const routes = require('./routes/index');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

// use for all the routes
app.use('/', routes);


app.listen(PORT, (err) => {
    console.log(`App is listening at port ${PORT}`);
});


