//here we will just create the user and put it in the database and return it
const userModel = require('../models/user.model');

module.exports.createUser = async ({firstname,lastname,email,password}) => {
    if(!firstname  || !email || !password){
        throw new Error('All fields are required');
    }

    const user = userModel.create({
        fullname:{
            firstname:firstname,
            lastname:lastname

        },
        email:email,
        password:password
    })

    return user;
}