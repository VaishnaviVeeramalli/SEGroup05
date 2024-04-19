const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app=express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());


app.use('/api/users',require('./routes/users'));
app.use('/api/students',require('./routes/students'));
app.use('/api/clubs',require('./routes/clubs'));
app.use('/api/product',require('./routes/product'));

app.use('/uploads', express.static('../uploads'));


mongoose.connect('mongodb+srv://balajipulugujju23:cUFLLg6LrvetNoAg@da1.a6dh7iw.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true } ,(err)=>{
    if(err)console.log(JSON.stringify(err));
    else console.log('DB connected successfully');
});

app.get('/',(req,res)=>{
    res.send('Hello mern stack');
});

const PORT=6200;

app.listen(PORT,()=>{
    console.log(`Listening on the port ${PORT}`);
}); 

module.exports = app