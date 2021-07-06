const express=require('express');
var multer  = require('multer')
var upload = multer()


const NoteController=require('../controller/note-controller');
//const {uploadFile}=require('../controller/upload-image')
const router=express.Router();


router.post('/note',NoteController.createNote);
router.put('/note/:id',NoteController.updateNote);
router.delete('/note/:id',NoteController.deleteNote);
router.get('/note/:id',NoteController.getNoteById);
router.get('/notes',NoteController.getNotes);
router.get('/notes/:subject',NoteController.getNoteBySub);
module.exports=router;
