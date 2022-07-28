import React,{useState} from 'react'
import NavbarF from '../navbar/NavbarF'
import {retPersonName,retPersonEmail} from '../../../Login/Login'
import { Link } from 'react-router-dom';
import './comp.css'
function ComplaintsF() {
  const [form, setForm] = useState({
      id:"",
      complainantemail:"",
      complainantname:"",
      name:"",
      type:"",
      department:"",
      roomno:"",
      remarks:"",
      status:"NOT RESOLVED"
  });


  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  async function onSubmit(e) {
    e.preventDefault();
     // When a post request is sent to the create url, we'll add a new record to the database.
    
   
    
    form.complainantname = retPersonName()
    form.complainantemail = retPersonEmail()
    const newPerson = { ...form };
    
    
    await fetch("http://localhost:5000/record/complaints", {
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
      id:"",
      complainantname:"",
      complainantemail:"",
      name:"",
      type:"",
      department:"",
      
      roomno:"",
      remarks:"",
      status:"NOT RESOLVED"
   });
    
  }
  return (
    <div>
      <NavbarF/>
      <div className='comp-body'>
      
     <div className='comp-form'>
     <h1>File Your Complaint</h1>
  

     <div className='cmain'>
      <form onSubmit={onSubmit}>
        <table className='comp-table'>
          
       <div className="cform-group"><tr><td>
         <label htmlFor="id">ID of the product</label></td><td>
         <input
           type="text"
           className="cform-control"
           id="id"
           value={form.id}
           onChange={(e) => updateForm({ id: e.target.value })}
          
         /></td></tr>
        </div>
       <div className="cform-group"><tr><td>
         <label htmlFor="name">Name</label></td><td>
         <input
           type="text"
           className="cform-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
           required
         /></td></tr>
       </div>
       <div className="cform-group"><tr><td>
         <label htmlFor="type">Equipment Type</label></td><td>
         
        <select name="type" id="ctype"  value={form.type}
         onChange={(e) => updateForm({ type: e.target.value })}  >
        
        <option value="" disabled selected>Select an option</option>
        <option value="Electronics">Electronics</option>
        <option value="Furniture">Furniture</option>
        
       </select  >
       </td></tr>
       </div>

       <div className="cform-group"><tr><td>
       <label htmlFor="Department">Department</label></td><td>
        <select name="Department" id="cdepartment"  value={form.department}
         onChange={(e) => updateForm({ department: e.target.value })} >
        <option value="" disabled selected>Select an option</option>
        <option value="CSE">CSE</option>
        <option value="ECE">ECE</option>
        <option value="EEE">EEE</option>
        <option value="CE">CE</option>
        <option value="ME">ME</option>
        <option value="Basic Science">Basic Science</option>
       </select  >
       </td></tr>
       </div>
       <div className="cform-group"><tr><td>
         <label htmlFor="roomno">Room No</label></td><td>
         <input
           type="text"
           className="cform-control"
           id="roomno"
           value={form.roomno}
           onChange={(e) => updateForm({roomno: e.target.value })}
           required
         /></td></tr>
       </div>
       <div className="cform-group"><tr><td>
         <label htmlFor="remarks">Additional Information</label></td><td>
         <textarea
           placeholder="Additional Information regarding the complaint"
           className="cform-control"
           id="remarks"
           value={form.remarks}
           rows={3}
           onChange={(e) => updateForm({ remarks: e.target.value })}
           required
         /></td></tr>
       </div>
       

       <div className="cform-group"><tr>
         <input
           type="submit"
           value="FIle Complaint"
           className="cbtn-primary"
         /></tr>
         <div className="bform-group"><tr>
               <Link to="/ViewComp"><input
           type="submit"
           value="Your Complaints"
           className="cbtn-primary"
         /></Link>
       </tr></div>


       </div></table>
     </form></div>
     </div>
    </div>
    </div>
  )
}

export default ComplaintsF