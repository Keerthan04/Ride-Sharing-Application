const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');//this is to generate token


//captain model(captain is the driver in this case)
const captainSchema = new mongoose.Schema({//creating a schema for the user model
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
        lowercase:true,
        minlength:[6,'Email must be atleast 6 characters long'],//error message if the email is less than 6 characters long
    },
    password:{
        type:String,
        required:true,
        select:false,//this is to make sure that the password is not returned in the response
    },
    socketId:{
        type:String,
    },

    status:{
        type:String,
        enum:['active','inactive'],//this is to make sure that the status is either active or inactive
        default:'inactive',
    },

    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'Color must be atleast 3 characters long'],//error message if the color is less than 3 characters long
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'Plate must be atleast 3 characters long'],//error message if the plate is less than 3 characters long
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'Capacity must be atleast 1'],//error message if the capacity is less than 1
        },
        vehicleType:{
            type:String,
            required:true,
            enum: ['car','motorcycle','auto'],
        }
    },

    location:{
        ltd:{
            type:Number,
        },
        lng:{
            type:Number,
        }
    }
});

captainSchema.methods.generateAuthToken = function(){//this is to generate token
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn: '24h'});//so the token will expire in 24 hours
    return token;
}

captainSchema.methods.comparePassword = async function(enteredPassword){//this is to compare the entered password with the hashed password
    return await bcrypt.compare(enteredPassword,this.password);//returns true if the entered password is correct
}

captainSchema.statics.hashPassword = async function(password){//this is to hash the password
    return await bcrypt.hash(password,10);//returns the hashed password
}

const captainModel = mongoose.model('captain',captainSchema);//creating a model for the user schema

module.exports = captainModel;//exporting the model