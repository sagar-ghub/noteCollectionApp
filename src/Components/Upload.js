import React, { useState } from 'react'
import ReactDOM from 'react-dom';


//import "../css/Upload.css"
import api from '../api/api'
export default function Upload() {
 
     const [filearr,setFilearr]=useState([]);
    //const [arr,setArr]=useState([]);
    const [author,setAuthor]=useState('');
    const [date,setDate]=useState('2021-07-15');
    const [isLoading,setIsLoading]=useState(false);
    const [subject,setSubject]=useState('');
    const [element,setElement]=useState([]);
   
    const [file,setFile]=useState();    
    const sub=['DAA','COA','DC','MATH']
    const handleFileChange=(e)=>{
        // const file = document.querySelector('#file');
        
          // Get the selected file
          const [file] = e.target.files;
          // Get the file name and size
          const {name, size } = file;
          // Convert size in bytes to kilo bytes
          const fileSize = (size / 1000).toFixed(2);
          // Set the text content
          const fileNameAndSize = `${name} - ${fileSize}KB`;
          document.querySelector('.file-name').textContent = fileNameAndSize;
         
        setFilearr([...filearr,{name,size}])
        console.log(e.target.files[0])
    setFile(e.target.files[0] );
        
        
        
    }
   
    const  handleSubmit=async(e)=>{
        e.preventDefault();
        if(author===''||!file||subject==='')
        return alert("Enter all fields");
        setIsLoading(true);
        
         const formData = new FormData();
        formData.append('subject',subject)
         formData.append('author',author);
         formData.append('date',date);
         formData.append('photo', file);
        const res= await api.insertNote(formData);
        if(res.data.success)
        {
            setIsLoading(false);
            setAuthor('');
            setDate('2021-07-15');
            setFile()
        }
        console.log(res);
        
    }

    const divStyle=
    {
      div:{alignItems:"center",},
      input:{borderRadius:"20px"}


  }


    console.log("up")
     if(!isLoading)
    return (
        <div style={divStyle.div}>
          Select Subject
          <div style={{display:"flex",justifyContent:"space-evenly"}}>
            {sub.map(sub=>(<button type="button" className={sub===subject?`btn btn-outline-primary active`:`btn btn-outline-primary `} key={sub} onClick={()=>setSubject(sub)}>{sub}</button>))}
          
      
          </div>
          <br></br>

        <input type="text" placeholder="Author" name="author" value={author} onChange={(e)=>setAuthor(e.target.value)}/><br></br><br></br>
        <input type="date" name="date" value={date} onChange={(e)=>setDate(e.target.value)}/><br></br>
        <div className="file-input" >
          <br></br>
        <input type="file" id="file" className="btn btn-danger" name='file' onChange={(e)=>handleFileChange(e)}/>
        
        <p className="file-name"></p>
        
        <div id="file-input">

        </div>
        
       </div>
        <br></br>
        <button type="submit" className="btn btn-success" value="Submit" onClick={handleSubmit}  >Submit</button>
      
       
        </div>
    )
    else
    return(
        <div>
            Loading...
        </div>
    )

  
}
