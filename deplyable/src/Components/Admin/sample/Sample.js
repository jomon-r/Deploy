import React, { useState } from 'react'

function Sample() 
 {
 
  
  const [form, setForm] = useState({
    bookedbyemail:"",
    bookedbyname:"",
    department:"",
    class:"",
    hall: "",
    date: "",
    fromtime: "",
    totime:""
  });






function updateForm(value) {
  return setForm((prev) => {
    return { ...prev, ...value };
  });
}
function onSubmit(e) {
  e.preventDefault();
  setForm({ 
    bookedbyemail:"",
    bookedbyname:"",
    department:"",
    class:"",
    hall: "",
    date: "",
    fromtime: "",
    totime:""
 });
  
  
}
  return (
   
    
    <div 
    style={{
      flex:1,
      display:'flex',
      flexDirection:'column', 
    }}>
      <div style={{marginTop:0}}>
  </div>
    {/* {(error != "") ? (<div className='error'>{error}</div>) : ""} */}
    
      
  <h1 style={{backgroundColor: "DodgerBlue"}}>Hall Booking</h1>
  <form onSubmit={onSubmit}>
       <div className="form-group">
       <label htmlFor="Hall">Select Hall</label>
        <select name="room" id="room-select"  value={form.hall}
         onChange={(e) => updateForm({ hall: e.target.value })} placeholder="-Please choose an option-" required>
        <option value="" disabled selected>Select an option</option>
        <option value="Albert Einstein Hall">Albert Einstein Hall</option>
        <option value="FOSS Lab">FOSS Lab</option>
        <option value="Issac Newton Hall">Issac Newton Hall</option>
        <option value="Steve Jobs Hall">Steve Jobs Hall</option>
        <option value="Visheshwarya Hall">Visheshwarya Hall</option>
        <option value="Dijkstra Lab">Dijkstra Lab</option>
       </select  >
        </div>
       <div className="form-group">
         <label htmlFor="department">Select Your Department</label>
         <select name="department" id="dep-select"  value={form.department}
         onChange={(e) => updateForm({ department: e.target.value })} placeholder="-Please choose ypur department-" required>
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
         <label htmlFor="class">Enter your Class</label>
         <input
           type="text"
           className="form-control"
           id="class"
           value={form.class}
           onChange={(e) => updateForm({ class: e.target.value })}
           required
         />
       </div>

       <div className="form-group">
         <label htmlFor="date">Choose Date</label>
         <input
           type="date"
           className="form-control"
           id="date"
           value={form.date}
           onChange={(e) => updateForm({ date: e.target.value })}
           required
         />
       </div>
       <div className="form-group">
         <label htmlFor="roomno">Choose From Time</label>
         <input
           type="time"
           className="time"
           min="09:00" max="18:00" required value={form.fromtime}
           onChange={(e) => updateForm({fromtime: e.target.value })}
        
         />
       </div>
       <div className="form-group">
         <label htmlFor="roomno">To</label>
         <input
           type="time"
           className="totime"
           min={form.fromtime} max="18:00" required value={form.totime}
           onChange={(e) => updateForm({totime: e.target.value })}
        
         />
       </div>
      
       

       <div className="form-group">
         <input
           type="submit"
           value="Schedule Your Hall"
           className="btn-primary"
         />
    
       </div>
     </form>
     
   </div>
   

 

  );
}



export default Sample