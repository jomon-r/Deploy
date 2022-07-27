import React, { useState,useEffect } from 'react';
import { Navigate, useNavigate} from "react-router-dom";
//import { useParams } from "react-router";
import LoginForm from './LoginForm';
import mits from '../mits.png'
import './login.css';


var CryptoJS = require("crypto-js");

//import { get } from '../../../server/routes/record';
let role = ""
let auth = false;
let name = "";
let email = "";
const retLog = () => {
  return auth;
}
const retRole = () => {
  return role;
}
const Logout = () =>{
  auth = false
  Navigate("/")
 }

const retPersonName = () => {
  return name;
}
const retPersonEmail = () => {
  return email
}


const Login = (props) => {
  const navigate = useNavigate();


   const [error,setError] = useState("");
   const [records, setRecords] = useState([]);
  
 
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch("/record/user");
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
  

  

   function Login(details) {


    
     console.log(details);
    for(var key in records){
     
      //var pass = JSON.parse(records[key].password)
     
     
       //window.alert(decrypt)
       
     if(details.email === records[key].email ){
      var bytes =  CryptoJS.AES.decrypt(records[key].password, "jmiu298y98y&*T^Y&^T#*2o3rtjhuj02p");
      
      var decrypt = bytes.toString(CryptoJS.enc.Utf8);
      if (details.password === decrypt.toString()){
      console.log("logged in");
      auth = true;
      role = records[key].role
      name = records[key].Name
      email = records[key].email
      if(role === "admin" || role === "Admin"){
      navigate("/Home")   }
      if(role === "faculty" || role === "Faculty"){
        navigate("/HomeF")   }
        
     }}}
     
     if(auth===false){
       console.log("Details donot match");
       auth = false;
       setError("Details donot match");
     }
 
    
     
   }
   
  return (
    <>
    
    <div className="login-login">
        <img src={mits} alt="mits" className="image-logo"/>
        <div className="name-app">Inventory Management</div></div>
       <div className='App'>
        
      
       
     
       
     
        <LoginForm Login={Login} error = {error}/>
    

       </div>
      
    </> 
  );
};

export default Login;
export {retLog};
export {Logout};
export {retRole};
export {retPersonName};
export {retPersonEmail}