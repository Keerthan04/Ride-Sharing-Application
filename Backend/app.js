const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());//so that from req object we can get the cookies and access them

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.use('/users',userRoutes);
module.exports = app;