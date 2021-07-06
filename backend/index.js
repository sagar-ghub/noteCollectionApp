const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose')
const bodyParser=require('body-parser');
const noteRouter=require('./routes/routes')
const db=require('./db')

const PORT=4000;

// app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded());
app.use(cors());
app.use(bodyParser.json());

app.get('/',(req,res)=>{

    res.send("HOme");

});

db.on('error',console.error.bind(console,'MongoDB connection error:'))

app.use('/api',noteRouter);

app.listen(PORT,()=>{
    console.log(`Server is running at port${PORT}`)
})
