const  express = require('express');
const router = express.Router();
const student = require('./../models/student');

router.post('/', async(req,res) => {
    try{
        const data = req.body ;
        const newStudent = new student(data) ;
        const response = await newStudent.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
console.log('error occured');
res.status(500).json({error:'Internal Server error'});
    }
})


router.get('/', async(req,res) => {
    try{
       
        const data = await student.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
console.log('error occured');
res.status(500).json({error:'Internal Server error'});
    }
})


module.exports = router;

