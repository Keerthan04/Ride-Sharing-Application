const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


//creating a schema for the user model
const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'Firstname must be atleast 3 characters long'],//error message if the firstname is less than 3 characters long
        },
        lastname:{
            type:String,
            minlength:[3,'Lastname must be atleast 3 characters long'],//error message if the lastname is less than 3 characters long
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[6,'Email must be atleast 6 characters long'],//error message if the email is less than 6 characters long
    },
    password:{
        type:String,
        required:true,
        select:false,//this is to make sure that the password is not returned in the response
    },
    //this one to track the driver and the rider
    socketId:{
        type:String,
    }
});

//making some methods for the user model
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

//so a static method is a method that is called on the model itself, not on the instance of the model
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;