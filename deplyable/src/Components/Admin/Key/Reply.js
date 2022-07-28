import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";

import emailjs from "emailjs-com"
import './repkey.css'
import Navbar from "../navbar/Navbar";
export default function Edit() {
 const [form, setForm] = useState({
   email:"",
   name:"",
   comments:"",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/record/keys`);
     //window.alert("hel")
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     if (!records) {
       window.alert(`Record with id ${id} not found`);
       navigate("/Complaints");
       return;
     }
     records.map(record => {
      if(record._id === params.id){
        form.email = record.email
        form.name = record.name
        updateForm({records:record})
      }
   })
     
     
    

   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
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

 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     id: params.id,
     comments: form.comments,
   };
   sendMail();
   navigate("/Key")
   
   await fetch(`http://localhost:5000/Key/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     }, 
   });
  
   navigate("/Key")
 }
 
 
 return (
   <div>
    <Navbar/>
    <div className="editcomp-body">
    <div className="editcomp-form">
         <h1>Reply To Request</h1>
         <div className="editcomp-main">
     <form ref={formm} onSubmit={onSubmit}>
     
      <table className="repkey-table"><div className="form-group"><tr><td>
      
     <label>Requester Email</label> </td><td>
      <input type="email" name="mail" value={form.email} readOnly/></td></tr></div>
      <div className="form-group"><tr><td><label>Requester Name</label> </td><td>
      <input type="text" name="to_name" value={form.name} readOnly/></td></tr>
      </div>
         <div className="form-group">
         <tr><td><label htmlFor="status">Add Reply </label></td><td>
         <textarea
           className="form-control"
           id="status"
           name="message"
           value={form.comments}
           onChange={(e) => updateForm({ comments: e.target.value })}
         /></td></tr>
       </div>
       
 <tr>
      
         <button
           className="reply-primary"
           onClick={onSubmit}
         >Send Reply</button>
       </tr></table>
     </form>
   
   </div></div></div></div>
 );
}