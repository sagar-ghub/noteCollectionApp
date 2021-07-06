import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router'

import { Document,Page,pdfjs } from 'react-pdf'
import apis from '../api/api'
export default function Pdfr(props) {
    const {id}=useParams();
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    const [note,setNotes]=useState([])
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading,setIsLoading]=useState(true);
    const[data,setData]=useState('')
    let txt='';
    useEffect(() => {
       const fetchdata=async()=>{
            await apis.getNoteById(id).then(note=>{
                setNotes(note.data.data);
                setIsLoading(false);
                console.log("data")
            })
        }

        fetchdata();

    },[])



    const handleOnLoad=()=>{
        const bytes=(new Uint8Array(note.photo.data.data))
        // const str=String.fromCharCode(...arr);
    
         var binaryText = '';
    
            for (var index = 0; index < bytes.byteLength; index++) {
                binaryText += String.fromCharCode( bytes[index] );
             }
    
        //   Base64.encode(binaryText) should not include
            let dt=btoa(binaryText)
         txt="data:application/pdf;base64,"+ dt;
        // console.log(txt)
            
      
    }

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
      }
    const handleNext=()=>{
        if(pageNumber==numPages)
        return alert("No more pages ")
        setPageNumber(pageNumber+1);
    }
    const handlePrevious=()=>{
        if(pageNumber ===1)
        return alert("No more pages back")
        setPageNumber(pageNumber-1);
    }
    
    const docStyles={
        
        pdf:{
            marginLeft:"350px",
            marginRight:"150px",
           
        display:"flex",
        justifyContent:"center",
        },
        button:{
            display:"flex",
            justifyContent:"space-evenly"
        }
       
    }
    if(!isLoading)
    return (
       
        <div style={docStyles.pdf}>
            {console.log(note.photo)}
            {handleOnLoad()}
             
             
              <br></br>
              <Document
        file={txt}
        onLoadSuccess={onDocumentLoadSuccess}
        
      >
         <br></br>
         <div style={docStyles.button}>
         <button onClick={handlePrevious} className='btn btn-info'>Previous</button>
           Page {pageNumber} of {numPages}
           <button onClick={handleNext} className='btn btn-info'>Next</button>
         </div>
        <Page pageNumber={pageNumber}    />
      </Document>
      <br></br>
       
        
        
     
        </div>

    )
    else
    return(<h1>Loading...</h1>)
}
