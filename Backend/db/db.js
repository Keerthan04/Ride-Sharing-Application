const mongoose = require('mongoose');
//to connect to the database

function connectToDb(){
    mongoose.connect(process.env.DB_CONNECT).then(()=>{
        console.log('Connected to the database');
    }).catch(err => {
        console.log(err);
    });//if err occurs, catch it
}

module.exports = connectToDb;