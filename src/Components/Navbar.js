import React,{useState} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
   Link,
  } from "react-router-dom";
export default function Navbar() {
  const linkstyles={
    display:"flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginLeft:"200px",
    
  
  
  }


  const [btn,setBtn]=useState('');


    return (
        <div style={linkstyles}>
         
           <Link to="/"><button className={btn==='Home'?"btn btn-success":"btn btn-primary"} onClick={()=>setBtn('Home')}>Home</button></Link>
           <Link to="/upload"><button className={btn==='Upload'?"btn btn-success":"btn btn-primary"} onClick={()=>setBtn('Upload')}>Upload</button></Link>
           <Link to={"/view"}><button className={btn==='View'?"btn btn-success":"btn btn-primary"} onClick={()=>setBtn('View')}>View</button></Link>
          <br>
         </br>
        
         <br></br>
         <br></br>
        </div>
    )
}
