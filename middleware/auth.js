const User = require('../models/User');
const Club = require('../models/Club');
const Student = require('../models/Student');


const auth = (req,res,next)=>{
    if(process.env.NODE_ENV === 'test') {
        next()
    }

    const token = req.cookies.x_auth;
    const usertype= req.cookies.usertype;
    // console.log('Auth')
    console.log("user type ",usertype)
    if(usertype==='Admin'){
        User.findIdByToken(token,(err,user)=>{
            if(!user || err)return res.json({
                AuthSuccess:false
            })
            
            req.token=token;
            req.user=user;

            next();
        });
    }
    else if(usertype==='Student'){
        Student.findIdByToken(token,(err,student)=>{
            if(!student || err)return res.json({
                AuthSuccess:false
            })
            
            req.token=token;
            req.student=student;

            next();
        });
    }
    else{
        Club.findIdByToken(token,(err,club)=>{
            if(!club || err)return res.json({
                AuthSuccess:false
            })
            
            req.token=token;
            req.club=club;

            next();
        });
    }

}

module.exports=auth;