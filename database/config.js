require('dotenv').config();
// const mongoose = require('mongoose');

// const database_url = process.env.URI;

// const open = (url = database_url) => {
//     return new Promise((resolve, reject) => {
//         mongoose.connect(url, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         }, err => {
//             if(err) {
//                 return reject(err);
//             }

//             console.log('Database connected successfully!');
//             resolve();
//         });
//     });
// }

// const close = () => mongoose.disconnect();

// module.exports = {open, close}

const mongoose = require("mongoose");

const { MONGODB_URL } = process.env;
console.log(MONGODB_URL);

exports.connect = () => {
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log(`DB CONNECTED SUCCESSFULLY`))
    .catch((error) => {
      console.log(`DB CONNECTION FAILED`);
      console.log(error);
      process.exit(1);
    });
};















// const mongoose = require('mongoose')

// const url = process.env.MONGODB_URI

// const open = (uri = url) => {

//     return new Promise((resolve, reject) => {
//         mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true  }, err => {
//             if (err) return reject(err)
//             console.log('connected to db!')
//             resolve()
//         })
//     })
// }


// const close = () => mongoose.disconnect()

// module.exports = { open, close }
