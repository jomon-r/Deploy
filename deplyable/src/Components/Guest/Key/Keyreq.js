import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { retGuest } from '../Guest'
import NavbarG from "../navbar/NavbarG"
import './key.css'
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
        <div className='key-body'>
          
      
        <div id='key-form'>
           
        <h1>Request for Key</h1>
        <div className='key-main'>
        <form>
        
          <table className='key-table'>
            <tr><td>
            <label>Mail</label></td><td>
            <input type="email" value={form.email} readOnly/>
            </td></tr>
            <tr><td>
            <label>Name</label></td><td>
            <input type="text" value={form.name} required onChange={(e) => updateForm({name: e.target.value})}/>
            </td></tr>
            <tr><td><label>Department</label></td><td>
            <select name="Department" id="Department" value={form.department}
               onChange={(e) => updateForm({ department: e.target.value })} >
               <option value="" disabled selected>Select an option</option>
               <option value="CSE">CSE</option>
               <option value="ECE">ECE</option>
               <option value="EEE">EEE</option>
               <option value="CE">CE</option>
               <option value="ME">ME</option>
             </select  > </td></tr><tr><td>
            <label>Class</label></td><td>
            <input type="text" value={form.class} required onChange={(e) => updateForm({class: e.target.value})}/>
            </td></tr><tr><td><label>Room for which key needed</label></td><td>
            <input type="text" value={form.room} required onChange={(e) => updateForm({room: e.target.value})}/>
            </td></tr><tr><td><label>Date</label></td><td>
            <input type="date" value={form.date} required onChange={(e) => updateForm({date: e.target.value})}/>
            </td></tr><tr><td><label>From</label></td><td>
            <input type="time" value={form.fromtime} required onChange={(e) => updateForm({fromtime: e.target.value})}/>
            </td></tr><tr><td><label>To </label></td><td>
            <input type="time" value={form.totime} min={form.fromtime} required onChange={(e) => updateForm({totime: e.target.value})}/>
            </td></tr><tr><td><label>Reason for Request</label></td><td>
            <input type="text" value={form.reason} onChange={(e) => updateForm({reason: e.target.value})}/> </td></tr></table>
            <tr><input type="submit" value="Request" className='kbtn-primary' onClick={onSubmit}/>
            </tr><tr>
            <Link to="/ViewReq"><input
           type="submit"
           value="Your Requests"
           className="kbtn-primary"
         /></Link>
            </tr>
            
            
            </form></div></div>
    </div></div>
  )
}

export default Keyreq