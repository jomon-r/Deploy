import React,{ useState } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import mits from '../../mits.png'
import './guest.css'
let mail = ""

function retGuest(){
  return mail;
}

function Guest() {
    
    const [id, setID] = useState("")
    const navigate = useNavigate();
    function handleChange(e){
      mail = e.target.value
      setID(e.target.value)
    }
    function onSubmit(e) {
        if( id===""){
            return
        }
        else{
            navigate("/HomeG")
        }

        
    }
  return (
    <div>
        
        
        <div className="login-login">
        <Link to="/">
        <img src={mits} alt="mits" className="image-logo"/>
        </Link>
        <div className="name-app">Inventory Management</div></div>
        <div className="App">
        <form onSubmit={onSubmit} className='login-display'>

      <div className="form-login">
      <div className='form-login2'>
        <label htmlFor='id'>Enter your college id:</label>
        <input type="text" name ="id" id ="id" onChange={handleChange} value ={id}/></div>
        <input type="submit" value="SIGN IN" />
    </div></form></div>
    </div>
  )
}

export default Guest;
export  {retGuest}