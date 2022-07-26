import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { retGuest } from '../Guest'
import NavbarG from "../navbar/NavbarG"
function Keyreq() {
  const mail = retGuest();
    const [form,setForm] = useState({
        email: mail,
        name:"",
        Department:"",
        class:"",
        room:"",
        date:"",
        fromtime:"",
        totime:"",
        reason:"",
        comments:""
    })


  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  async function onSubmit(e){
    e.preventDefault();
    const newPerson = { ...form };
  
  
  await fetch("http://localhost:5000/record/keyrequest", {
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
  setForm({ 
        email: mail,
        name:"",
        department:"",
        class:"",
        room:"",
        date:"",
        fromtime:"",
        totime:"",
        reason:"",
        comments:""
 });
  
  }

  return (
    
    <div>
        <NavbarG/>
        <Link to="/ViewReq">Your Request</Link>
        <h4>Write the request for Key</h4>
        <form>
            <label>Mail</label>
            <input type="email" value={form.email} readOnly/>
            
            <label>Name</label>
            <input type="text" value={form.name} required onChange={(e) => updateForm({name: e.target.value})}/>
            <label>Department</label>
            <select name="Department" id="Department" value={form.department}
               onChange={(e) => updateForm({ department: e.target.value })} >
               <option value="" disabled selected>Select an option</option>
               <option value="CSE">CSE</option>
               <option value="ECE">ECE</option>
               <option value="EEE">EEE</option>
               <option value="CE">CE</option>
               <option value="ME">ME</option>
             </select  >
            <label>Class</label>
            <input type="text" value={form.class} required onChange={(e) => updateForm({class: e.target.value})}/>
            <label>Room for which key needed</label>
            <input type="text" value={form.room} required onChange={(e) => updateForm({room: e.target.value})}/>
            <label>Date Needed</label>
            <input type="date" value={form.date} required onChange={(e) => updateForm({date: e.target.value})}/>
            <label>From Time</label>
            <input type="time" value={form.fromtime} required onChange={(e) => updateForm({fromtime: e.target.value})}/>
            <label>To Time</label>
            <input type="time" value={form.totime} min={form.fromtime} required onChange={(e) => updateForm({totime: e.target.value})}/>
            <label>Reason for Request</label>
            <input type="text" value={form.reason} onChange={(e) => updateForm({reason: e.target.value})}/>
            <input type="submit" value="Request" onClick={onSubmit}/>
        </form>
    </div>
  )
}

export default Keyreq