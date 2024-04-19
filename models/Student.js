const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require("moment");

mongoose.set('useFindAndModify', false);

const studentSchema = mongoose.Schema({
    name:{
        type:String
    },
    tudentID:{
        type:Number
    },
    phone:{
        type:Number
    },
    address:{
        type:String
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    role:{
        type:Number,
        default: 0 
    },
    cart:{
        type:Array,
        default:[]
    },
    history: {
        type: Array,
        default: []
    },
    token:{
        type:String,
    },
    tokenExp:{
        type: Number
    }
});

studentSchema.pre('save',async function(next){

    const student=this;

    const saltRounds=10;

    try{
    
    const salt = await bcrypt.genSalt(saltRounds);

    const hashPassword = await bcrypt.hash(student.password,salt);

    student.password=hashPassword

    }
    catch(err){
        console.log(err);
    }

    finally{
        next();
    }

});

studentSchema.methods.comparePassword=function(plainPassword,callback){
    // console.log(plainPassword)
    bcrypt.compare(plainPassword,this.password,function(err,isMatch){
        if(err)return callback(err);
        console.log(isMatch)
        return callback(null,isMatch);
    })
}

studentSchema.methods.generateToken=async function(callback){
    const student = this;

    var token = jwt.sign(student._id.toHexString(),'secret');
    var oneHour = moment().add(1, 'hour').valueOf();


    // user.save((err,user)=>{
    //     if(err)callback(err);
    //     else callback(null,user);
    // })

    await Student.findOneAndUpdate({email:student.email},{$set:{token:token,tokenExp:oneHour}},(err,docs)=>{
        if(err)callback(err);
        
        else {
            Student.tokenExp = oneHour;
            Student.token = token;
            callback(null,student);
        }
    });

}

studentSchema.statics.findIdByToken=function(token,callback){

    jwt.verify(token,'secret',(err,decode)=>{

        Student.findOne({"_id":decode,"token":token},(err,student)=>{
            if(err)return callback(err);
            return callback(null,student);
        })

    })

}

const Student = mongoose.model('Students',studentSchema);

module.exports=Student;