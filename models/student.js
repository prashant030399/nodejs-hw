const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({

    name:{
type:String,
required:true
    },

    branch:{
        type:String,
        enum : ['ETC', 'IT', 'CSE'],
        required:true
    },

    email:{
        type:String,
    },

    contactNo:{
        type:String
    }

})

const student = mongoose.model('student', studentSchema);
module.exports = student ;