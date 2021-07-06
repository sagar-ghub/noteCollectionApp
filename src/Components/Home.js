import React from 'react'
import { Link } from 'react-router-dom'
export default function Home() {
    return (
        <div>
           Still Painting...<br></br>
           <Link to='/upload'> Go to Upload</Link>
        </div>
    )
}
