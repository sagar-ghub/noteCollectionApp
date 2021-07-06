import React,{useState,useEffect} from 'react'
import api from '../api/api'
import Folder from './Folder';
import Pdfr from './Pdfr';
export default function View() {
   
    const [isLoading,setIsLoading]=useState(true);
    const[notes,setNotes]=useState([]);
  
    const sub=['DAA','COA','DC','MATH'];
    const [subject,setSubject]=useState('');
    const[data,setData]=useState([])

    // useEffect(() => {
    //     async function fetchData() {
    //    await api.getNotesBySub(subject).then(notes=>{
    //     setNotes(notes.data.data);
       
  
    //     setIsLoading(false);
    //    });
    // }
    // fetchData();


    // }, [subject])
    const  handleSub=async(subject)=>{
        setSubject(subject)
        await api.getNotesBySub(subject).then(notes=>{
            setNotes(notes.data.data);
            
            let data=notes.data.data;
            const groups = data.reduce((groups, game) => {
                const date = game.date;
                if (!groups[date]) {
                  groups[date] = [];
                }
                groups[date].push(game);
                return groups;
              }, {});
              
              // Edit: to add it in the array format instead
              const groupArrays = Object.keys(groups).map((date) => {
                return {
                  date,
                  data: groups[date]
                };
              });
              console.log(groupArrays)
            setData(groupArrays)
            setIsLoading(false);
           });

    }

    
    return(
        <div>
          Select Subject to view
         
            <div style={{display:"flex",justifyContent:"space-evenly"}}>
            
            {sub.map(sub=>(<button type="button" className={sub===subject?`btn btn-outline-primary active`:`btn btn-outline-primary `} key={sub} onClick={()=>handleSub(sub)}>{sub}</button>))}
             
          </div>
          <hr></hr>
           


            {data.length<1?null:console.log(notes)}

           

                {
                subject!=''?data.map((key,index)=>{
                    return(
                        <div>
               
                <h4>{key.date}</h4>
                <div style={{display:"flex", justifyContent:"space-evenly"}}>
                {
                    key.data.map((k)=>{
                       return (
                        
                           <Folder id={k._id} author={k.author}/>
                           
                       )
                    })
                }
                </div>
                <hr></hr>
                
            </div>
                    )
}):null}
        
        </div>
    )
}

// {notes.length<1?null:console.log(notes)}

           

//                 {
//                 subject!=''?notes.map(note=>(
//             <div>
//                 <Folder author={note.author} date={note.date} id={note._id}/>
//             </div>
//             )):null}

