const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require("moment");

mongoose.set('useFindAndModify', false);

const clubSchema = mongoose.Schema({
    name:{
        type:String
    },
    registrationnumber:{
        type:Number
    },
    phone:{
        type: Number
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

clubSchema.pre('save',async function(next){

    const club=this;

    const saltRounds=10;

    try{
    
    const salt = await bcrypt.genSalt(saltRounds);

    const hashPassword = await bcrypt.hash(club.password,salt);

    club.password=hashPassword

    }
    catch(err){
        console.log(err);
    }

    finally{
        next();
    }

});

clubSchema.methods.comparePassword=function(plainPassword,callback){
    // console.log(plainPassword)
    bcrypt.compare(plainPassword,this.password,function(err,isMatch){
        if(err)return callback(err);
        console.log(isMatch)
        return callback(null,isMatch);
    })
}

clubSchema.methods.generateToken=async function(callback){
    const club = this;

    var token = jwt.sign(club._id.toHexString(),'secret');
    var oneHour = moment().add(1, 'hour').valueOf();


    // user.save((err,user)=>{
    //     if(err)callback(err);
    //     else callback(null,user);
    // })

    await Club.findOneAndUpdate({email:club.email},{$set:{token:token,tokenExp:oneHour}},(err,docs)=>{
        if(err)callback(err);
        
        else {
            club.tokenExp = oneHour;
            club.token = token;
            callback(null,club);
        }
    });

}

clubSchema.statics.findIdByToken=function(token,callback){

    jwt.verify(token,'secret',(err,decode)=>{

        Club.findOne({"_id":decode,"token":token},(err,club)=>{
            if(err)return callback(err);
            return callback(null,club);
        })

    })

}

const Club = mongoose.model('Clubs',clubSchema);

module.exports=Club;