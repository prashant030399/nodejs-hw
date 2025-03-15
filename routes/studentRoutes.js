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
res.status(500).json({error:'Internal Server errror'});
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


router.get('/:branchType', async(req,res) => {
    try{

const branchType = req.params.branchType ;

if(branchType == 'ETC' || branchType == 'IT' || branchType == 'CSE'){

    const data = await student.find({branch:branchType});
    console.log('Data fetched');
    res.status(200).json(data);
}else {
    res.status(404).json({error:"Invalid branch Type"});
}     
    }
    catch(err){
console.log('Error Occured');
res.status(500).json({error:'Internal Server Error'});
    }
})


router.put('/:id', async(req,res) => {
    try{
    
        const studentId = req.params.id ;
        const updatedPersonData = req.body ;

const response = await student.findByIdAndUpdate(studentId, updatedPersonData, {
    new  : true,
    runValidators : true
})

if(!response){
    return res.status(404).json({error:'Student not found'});
}

console.log('data updated');
res.status(200).json(response);
    }

catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error '});
}
})


router.delete('/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const response = await student.findByIdAndDelete(studentId);

        if (!response) {
            return res.status(404).json({ error: 'Student not found' });
        }

        console.log('Data deleted');
        res.status(200).json({ message: 'Student deleted successfully', deletedStudent: response });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

                                                   



module.exports = router;

 