import React,{useState} from 'react'
import NavbarF from '../navbar/NavbarF'
import {retPersonName,retPersonEmail} from '../../../Login/Login'
import { Link } from 'react-router-dom';
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
      <Link to="/ViewComp">Your Complaints</Link>
     
     
      <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="id">ID of the product</label>
         <input
           type="text"
           className="form-control"
           id="id"
           value={form.id}
           onChange={(e) => updateForm({ id: e.target.value })}
          
         />
        </div>
       <div className="form-group">
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
           required
         />
       </div>
       <div className="form-group">
         <label htmlFor="type">Equipment Type</label>
         
        <select name="type" id="type"  value={form.type}
         onChange={(e) => updateForm({ type: e.target.value })}  >
        
        <option value="" disabled selected>Select an option</option>
        <option value="Electronics">Electronics</option>
        <option value="Furniture">Furniture</option>
        
       </select  >
         
       </div>

       <div className="form-group">
       <label htmlFor="Department">Department</label>
        <select name="Department" id="department"  value={form.department}
         onChange={(e) => updateForm({ department: e.target.value })} >
        <option value="" disabled selected>Select an option</option>
        <option value="CSE">CSE</option>
        <option value="ECE">ECE</option>
        <option value="EEE">EEE</option>
        <option value="CE">CE</option>
        <option value="ME">ME</option>
        <option value="Basic Science">Basic Science</option>
       </select  >
         
       </div>
       <div className="form-group">
         <label htmlFor="roomno">Room No</label>
         <input
           type="text"
           className="form-control"
           id="roomno"
           value={form.roomno}
           onChange={(e) => updateForm({roomno: e.target.value })}
           required
         />
       </div>
       <div className="form-group">
         <label htmlFor="remarks">Additional Information</label>
         <textarea
           placeholder="Additional Information regarding the complaint"
           className="form-control"
           id="remarks"
           value={form.remarks}
           onChange={(e) => updateForm({ remarks: e.target.value })}
           required
         />
       </div>
       

       <div className="form-group">
         <input
           type="submit"
           value="Add Data"
           className="btn-primary"
         />
    
       </div>
     </form>
    
    </div>
  )
}

export default ComplaintsF