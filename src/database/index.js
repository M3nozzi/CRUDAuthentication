require('dotenv').config();

const mongoose = require('mongoose');

mongoose
    .connect(process.env.MONGODB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    .then(x => {
        console.log(`Connected to MongoDB! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
        console.log('Error connecting to MongoDB')
    });

module.exports = mongoose;