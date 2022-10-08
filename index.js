require('dotenv').config();

const express = require('express');

const app = express();

const routes = require('./routes/index');

const PORT = process.env.PORT || 3000;

app.get('/', routes);


app.listen(PORT, (err) => {
    console.log(`Server is listening at port ${PORT}`);
});
