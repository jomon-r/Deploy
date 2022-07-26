import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import './prices.css'
function Prices() {
    let url = new URL('https://pricee.com/?q=');
    
 const [data,setData] = useState("")
 
 const handleClick = () => {
    url += data
    window.location.href = url;
 }

  return (
    <div><Navbar/>
    <br/>
    <div className='prices-form'>
    <label>Enter your product name</label>
    <input type="text" className="price-input" placeholder='Product name' onChange={(e)=> setData(e.target.value)} required/>
    <input type="button" value="Check Price" onClick={handleClick}/>
    </div>
    </div>
  )
}

export default Prices