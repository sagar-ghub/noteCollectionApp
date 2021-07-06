const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const Note=new Schema(
    {
        subject:{type:String,required:true},
        author:{type:String,required:true},
        date:{type:String,required:true},
        photo: {
            data: Buffer,
            contentType: String,
            
        },
    },
    {timestamps:true},
    
)
const Daa=new Schema(
    {

    }
)
module.exports=mongoose.model('note',Note);