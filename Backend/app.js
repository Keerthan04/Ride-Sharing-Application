const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapRoutes = require('./routes/maps.routes');

//connect to the database
connectToDb();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());//so that from req object we can get the cookies and access them

app.get('/',(req,res)=>{
    res.send('Hello World');
})

//all the routes
app.use('/users',userRoutes);
app.use('/captains',captainRoutes);
app.use('/maps',mapRoutes);


//!basic idea is(IMPORTANT): route -> controller -> service
//service (main working will happen), controller is the handler which hit on route so handle things and call service function(or if any thing to do then on service done and call here and response and all return here) and route is the path where we hit the request and call the controller function(so this route we will add the middleware and all the validation and all and then call controller may be split to routes done with router and all then set up in app.js)

module.exports = app;