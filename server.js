const express = require('express');
const app = express();
app.use(express.json());

const studentRoutes  = require('./routes/studentRoutes');
const passport = require('./auth');    //4
const localAuthMiddleware = passport.authenticate('local',{session:false})    //6
const db = require('./db.js');

const logRequest =(req,res,next) => {   //1
    console.log(`[${new Date().toLocaleString()}] Request made to ${req.originalUrl}`);
    next();
}

app.use(passport.initialize());   //5

app.use(logRequest);//2
app.use('/student', localAuthMiddleware, logRequest,studentRoutes); //3   //7


app.get('/',(req,res) => {   //8
    res.send('Welcome to Hotel')
})



const PORT = process.env.PORT || 32000 ;

app.listen(PORT, () => {
console.log(`Your server is running at ${PORT}`);
})



