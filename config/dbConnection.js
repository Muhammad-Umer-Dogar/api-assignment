const mongoose = require('mongoose');


const connectDatabase = () => {
    //console.log(process.env.DB_URI)
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        //console.log("aaya")
        console.log(`MongoDB Database connected`)
    })
}

module.exports = connectDatabase

