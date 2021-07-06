const Note=require('../models/note-model');
const formidable=require('formidable')
const fs=require('fs');
const createNote=(req,res)=>{
    let form=new formidable.IncomingForm();
    form.keepExtensions=true;

    const body=req.body;
    if(!body)
    {
        return res.status(400).json({
            success:false,
            error:'You must provide a movie',
        })
    }

    form.parse(req,(err,fields,file)=>{ 

        if(err){
            return res.status(400).json({
                success:false,
                error:'Problem with image',
            })
        }

        const note=new Note(fields);
        if (!note) {
            return res.status(400).json({ success: false, error: err })
        }
       // if(file.photo)
       {
         note.photo.data = fs.readFileSync(file[Object.keys(file)[0]].path)
           note.photo.contentType = file[Object.keys(file)[0]].type;
        //console.log( file[Object.keys(file)[0]].path)
        }
        note.save()
            .then(()=>{
                return res.status(201).json({
                    success:true,
                    id:note._id,
                    message:'Note Created',
                })
            })
            .catch(error=>{
                return res.status(400).json({
                    error,
                    message:'Note not created!',
                })
            })
    })

   
}

const updateNote=(req,res)=>{

    const body=req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Note.findOne({_id:req.params.id},(err,note)=>{
        if(err){
            return res.status(404).json({
                err,
                message:'Note not found',
            })
        }
        note.author=body.author,
        note.time=body.time,
        
        note.save()
            .then(()=>{
                return res.staus(200).json({
                    success:true,
                    id:note._id,
                    message:'Note Updated!',
                })
            })
            .catch(error=>{
                return res.status(404).json({
                    error,
                    message:'Note not Updated!',
                })
            })
    })
}

const deleteNote = async (req, res) => {
    await Note.findOneAndDelete({ _id: req.params.id }, (err, note) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!note) {
            return res
                .status(404)
                .json({ success: false, error: `Note not found` })
        }

        return res.status(200).json({ success: true, data: note })
    }).catch(err => console.log(err))
}

const getNoteById = async (req, res) => {
    await Note.findOne({ _id: req.params.id }, (err, note) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!note) {
            return res
                .status(404)
                .json({ success: false, error: `Note not found` })
        }
        return res.status(200).json({ success: true, data: note })
    }).catch(err => console.log(err))
}
const getNoteBySub= async(req,res)=>{
    await Note.find({subject:req.params.subject.toUpperCase()},'author date',(err,note)=>{
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!note) {
            return res
                .status(404)
                .json({ success: false, error: `Note not found` })
        }
        return res.status(200).json({ success: true, data: note })

    })
}

const getNotes = async (req, res) => {
    await Note.find({},'author subject date', (err, notes) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!notes.length) {
            return res
                .status(404)
                .json({ success: false, error: `Notes not found` })
        }
       

        return res.status(200).json({ success: true,data:notes  })
    }).catch(err => console.log(err))
}

module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNotes,
    getNoteById,
    getNoteBySub
}