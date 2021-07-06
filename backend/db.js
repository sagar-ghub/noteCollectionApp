const mongoose = require('mongoose')


const url = `mongodb+srv://sagarmongodb:9937170872@cluster0.hh7px.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

mongoose.connect(url,connectionParams)
        .then(()=>{
            console.log("DB connected");
        })
        .catch((err)=>{
            console.error(`Error :${err}`)
        })

const db=mongoose.connection;

module.exports=db;