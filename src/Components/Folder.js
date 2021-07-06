import React from 'react'
import {Link} from 'react-router-dom'
export default function Folder(props) {

    const divStyle={
        display:"flex",

    }   
    return (
        <div>
          <Link to={`/view/${props.id}`}>
           <button className='btn btn-info'>{props.author.toUpperCase()}</button>
           </Link>
        </div>
    )
}

{/* <Link to={`/view/${props.id}`}>
           <button className='btn btn-primary'>{props.data.author}</button>
           </Link> */}