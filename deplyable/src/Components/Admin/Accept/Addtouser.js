import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com"

import Navbar from "../navbar/Navbar";

export default function Addtouser() {
  

  
  const formm = useRef();

  function sendMail(){
    
    emailjs.sendForm("service_pmytk1w", "template_vgec0aw", formm.current, "DAtmY9jSgEDRzxp1e").then(
      (result) => {
        //alert("Message Sent Successfully");
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

 const [form, setForm] = useState({
   username:"",
   email:"",
   role:"",
   password:"",
   department:"",
   
 });
 
 const params = useParams();
 const navigate = useNavigate();
 const [records, setRecords] = useState([]);
 useEffect(() => {
   async function fetchData() {
     //const id = params.id.toString();

    const response = await fetch("http://localhost:5000/record/register");
 
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const records = await response.json();
    setRecords(records);
    records.map(record => {
      if(record._id === params.id){
        form.email = record.email;
        form.username = record.username;
        form.password = record.password;
        form.department = record.department
      }
   })
  }

  fetchData();

  return;
}, [params.id,records.length]);
 
 
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
 
   
   const newPerson = { ...form };

   await fetch("http://localhost:5000/record/users", {
     method: "POST",
     body: JSON.stringify( newPerson),
     headers: {
       'Content-Type': 'application/json'
     }, 
   });
   
    
    const editedPerson = {
      id: params.id,
      status: "Registered",
    };
    
    sendMail();
   
    navigate("/Accept")
   await fetch(`http://localhost:5000/register/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     }, 
   });
   
   //navigate("/Accept")
 }
 
 
 return (
  
   <div><Navbar/>
     <h3>Update Role</h3>
     <form ref={formm} >
       <div className="form-group">
        <label>Email</label> <br />
      <input type="email" value={form.email} name="mail" /> <br />
      <label>User Name</label> <br />
      <input type="text" value={form.username} name="to_name" /> <br />
      <label>Message</label>
      <textarea rows={3} cols={30} name="message" value="You are registered successfully. Kindly login with your credentials"/>
      </div></form>

        <form>
         
         
         <label htmlFor="status">Role </label>
        
      <select name="role" id="role"  value={form.role}
         onChange={(e) => updateForm({ role: e.target.value })} >
        <option value="" disabled selected>Select a Role</option>
        <option value="Admin">Admin</option>
        <option value="Faculty">Faculty</option>
       
       </select  >
       <br />
       
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
           onClick={onSubmit}
         />
       </div>
     </form>
     <Link to="/Accept">Go Back</Link>
   </div>
 );
}