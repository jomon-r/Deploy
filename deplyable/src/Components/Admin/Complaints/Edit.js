import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com"
import Navbar from '../navbar/Navbar'
import './editcomp.css'
export default function Edit() {
 const [form, setForm] = useState({
   status: "",
   complainantemail:"",
   complainantname:"",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/record/complaints`);
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
        form.complainantemail = record.complainantemail
        form.complainantname = record.complainantname
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
     status: form.status,
   };
   sendMail();
   navigate("/Complaints")
   
   await fetch(`http://localhost:5000/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     }, 
   });
  
   navigate("/Complaints")
 }
 
 
 return (
   <div>
    <Navbar/>
   <div className="editcomp-body">
    <div className="editcomp-form">
         <h1>Update Record</h1><div className="editcomp-main">
     <form ref={formm}>
      <table className="editcomp-table"><tr><td>
     <label>Complainant Email</label> </td><td>
      <input type="email" name="mail" value={form.complainantemail} readOnly/></td></tr>
      <tr><td><label>Complainant Name</label> </td><td>
      <input type="text" name="to_name" value={form.complainantname} readOnly/></td></tr>
      <tr><td><label>Message</label> </td><td>
      <textarea rows={3} cols={30} name="message" value="Your complaint status have been updated. Kindly check it in the site by logging in"/>
      </td></tr></table></form>
     <form onSubmit={onSubmit}><table className="editcomp-table">
       <div><tr><td>
         <label htmlFor="status">Status </label></td><td>
         <input
           type="text"
           className="eform-control"
           id="status"
           value={form.status}
           onChange={(e) => updateForm({ status: e.target.value })}
         /></td></tr>
       </div>
       
 
       <div className="form-group"><tr>
         <input
           type="submit"
           value="Update Record"
           className="btn-ebtn-primary"
           onClick={onSubmit}
         /></tr>
       </div>
       </table>
     </form>
     </div>
   </div></div>
   </div>
 );
}