const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');    //1

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
    },
    //4
    username:{
        required:true,
        type:String
    },

    password:{
        required:true,
        type:String
    }
    })


//2
studentSchema.pre('save', async function(next){
    const student = this;

    // Hash the password only if it has been modified (or is new)
    if(!student.isModified('password')) return next();

    try{
        // hash password generation
        const salt = await bcryptjs.genSalt(10);

        // hash password
        const hashedPassword = await bcryptjs.hash(student.password, salt);
        
        // Override the plain password with the hashed one
        student.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
})

//3
studentSchema.methods.comparePassword = async function(candidatePassword){
    try{
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcryptjs.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

const student = mongoose.model('student', studentSchema);
module.exports = student ;