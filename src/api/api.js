import axios from 'axios';

const api=axios.create({
    baseURL:'https://serene-cove-10813.herokuapp.com/api',
})


export const insertNote = payload=>api.post(`/note`,payload);
export const getAllNotes= ()=>api.get('/notes');
export const updateNoteById = (id,payload)=> api.put(`/movies/${id}`,payload);
export const deleteMovieById=id=>api.delete(`/movie/${id}`);
export const getNoteById=id=>api.get(`/note/${id}`);
export const getNotesBySub=sub=>api.get(`/notes/${sub}`);

export const uploadNote=payload=>api.post('/upload',payload);

const apis={
    insertNote,
    getAllNotes,
    updateNoteById,
    deleteMovieById,
    getNoteById,
    uploadNote,
    getNotesBySub

}

export default apis;