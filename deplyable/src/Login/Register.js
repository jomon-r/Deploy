import React, { useState } from 'react';

import './login.css'
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import mits from '../mits.png'
var CryptoJS = require("crypto-js");


function Register() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email:"",
    department:"",
    username: '',
    password: '',
    confirmPassword: '',
    status:"Not Registered"
  });
 
  const [error, setError] = useState({
    email:"",
    department:"",
    username: '',
    password: '',
    confirmPassword: '',
    status:"Not Registered"
  })
 
  const onInputChange = e => {
    const { name, value } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: value
    }));
    validateInput(e);
  }
 
  const validateInput = e => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj = { ...prev, [name]: "" };
 
      switch (name) {
         
        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
          }
          break;
 
        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;
 
        default:
          break;
      }
 
      return stateObj;
    });
  }
  async function handleClick(e){
    
    e.preventDefault();
    var pass = CryptoJS.AES.encrypt(input.password, "jmiu298y98y&*T^Y&^T#*2o3rtjhuj02p").toString();
    
    input.password = pass
    const newPerson = { ...input };
   


    await fetch("http://localhost:5000/record/register", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;

   });
 
   setInput({ 
    email:"",
    department:"",
    username: '',
    password: '',
    confirmPassword: '',
    status:"Not Registered"
  });
  navigate("/Register");
  }
 
  function updateForm(value) {
    return setInput((prev) => {
      return { ...prev, ...value };
    });
  }


  return (
   
      <div>
         
        
      <div className="login-login">
        <Link to="/">
        <img src={mits} alt="mits" className="image-logo"/>
        </Link>
        <div className="name-app">Inventory Management</div></div>
         <div className="App">
      <form onSubmit={handleClick} className='login-display'>
        <div className="form-login">
      <div className='form-login2'>
        <label>Enter Name</label>
        <input
          type="text"
          name="username"
          placeholder='Enter Username'
          value={input.username}
          onChange={(e) => updateForm({ username: e.target.value })}
          required></input>
        {error.username && <span className='err'>{error.username}</span>}</div>
        <div className='form-login2'>
        <label>Enter Your Email</label>
        <input
          type="email"
          name="email"
          placeholder='Enter Email'
          value={input.email}
          onChange={(e) => updateForm({ email: e.target.value })}
          required></input>

        {error.email && <span className='err'>{error.email}</span>}</div>
        <div className='form-login2'>
        <label>Department</label>
        <select name="Department" id="Department" value={input.department}
               onChange={(e) => updateForm({ department: e.target.value })} >
               <option value="" disabled selected>Select an option</option>
               <option value="CSE">CSE</option>
               <option value="ECE">ECE</option>
               <option value="EEE">EEE</option>
               <option value="CE">CE</option>
               <option value="ME">ME</option>
             </select  >
        {error.department && <span className='err'>{error.department}</span>}</div>
        <div className='form-login2'>
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder='Enter Password'
          value={input.password}
          onChange={(e) => updateForm({ password: e.target.value })}
          onBlur={validateInput}></input>
        {error.password && <span className='err'>{error.password}</span>}
        </div>
        <div className='form-login2'>
        <label>Confrim Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder='Enter Confirm Password'
          value={input.confirmPassword}
          onChange={(e) => updateForm({ confirmPassword: e.target.value })}
          onBlur={validateInput}></input>
        {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
        </div>
        <input type="submit" value="REGISTER" /></div>

      </form></div>
    </div>
  );
}
 
export default Register