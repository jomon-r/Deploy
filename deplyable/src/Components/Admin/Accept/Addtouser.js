import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";

import emailjs from "emailjs-com"
import './adduser.css'
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
   <div className="adduser-body">
    <div className="adduser-form">
         <h1>Add New User</h1><div className="adduser-main">
    
     <form ref={formm} >
      
       <table className="adduser-table"><tr><td>
        <label>Email</label> </td><td>
      <input type="email" value={form.email} name="mail" /></td></tr><tr><td>
      <label>User Name</label> </td><td>
      <input type="text" value={form.username} name="to_name" /> </td></tr>
      <tr><td><label>Message</label></td><td>
      <textarea rows={3} cols={30} name="message" value="You are registered successfully. Kindly login with your credentials"/>
      </td></tr>
      </table></form>

        <form>
         <table className="adduser-table2">
          <div>
         <tr><td>
         <label htmlFor="status" className="labelrole">Role </label></td><td>
        
      <select name="role" className="userrole"  value={form.role}
         onChange={(e) => updateForm({ role: e.target.value })} >
        <option value="" disabled selected>Select a Role</option>
        <option value="Admin">Admin</option>
        <option value="Faculty">Faculty</option>
       
       </select  ></td></tr></div>
       
       <tr>
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="adduser-btn-primary"
           onClick={onSubmit}
         />

       </div></tr>
       </table>
     </form>
     </div></div></div></div>
 );
}