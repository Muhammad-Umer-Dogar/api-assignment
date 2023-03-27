const connectDatabase = require('./config/dbConnection')
const express = require("express");
const app = express();

require('dotenv').config({ path: 'config/config.env' })

app.use(express.json());

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT}`)
})


connectDatabase();


const routes = require('./routes/routes');

app.use('/api/', routes)

// Handle Unhandled Promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1)
    })
})

// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1)
})