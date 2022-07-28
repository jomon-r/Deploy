import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import './prices.css'
function Prices() {
    let url = new URL('https://pricee.com/?q=');
    
 const [data,setData] = useState("")
 
 const handleClick = () => {
    url += data
    window.alert('Downloaded csv');
 }

  return (
    <div><Navbar/>
    <div className='prices-body'>
    <div className='prices-form'>
      <h1>Check Market Prices</h1>
      <div className='prices-main'>
    <label><h2>Enter your product name</h2></label><br/>
    <input type="text" className="price-input" placeholder='Product name' onChange={(e)=> setData(e.target.value)} required/>
    <input type="button" className='btn-price' value="Check Price" onClick={handleClick}/>
    </div></div></div>
    </div>
  )
}

export default Prices