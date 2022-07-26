import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com"
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
     <h3>Update Record</h3>
     <form ref={formm}>
     <label>Complainant Email</label> <br />
      <input type="email" name="mail" value={form.complainantemail} readOnly/>
      <label>Complainant Name</label> <br />
      <input type="text" name="to_name" value={form.complainantname} readOnly/>
      <label>Message</label>
      <textarea rows={3} cols={30} name="message" value="Your complaint status have been updated. Kindly check it in the site by logging in"/>
     </form>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="status">Status: </label>
         <input
           type="text"
           className="form-control"
           id="status"
           value={form.status}
           onChange={(e) => updateForm({ status: e.target.value })}
         />
       </div>
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
     <Link to="/Complaints">Go Back</Link>
   </div>
 );
}