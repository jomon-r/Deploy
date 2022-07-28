import React,{ useState,useEffect } from 'react'
import { retPersonEmail, retPersonName } from '../../../Login/Login';
import NavbarF from '../navbar/NavbarF'
import './hall.css'
import { Link } from 'react-router-dom';
function OccupancyF()
 {
  const [records, setRecords] = useState([]);
  const [error,setError] = useState("");
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

  useEffect(() => {
    async function getRecords() {
      const response = await fetch("http://localhost:5000/record/schedules");
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const records = await response.json();
      setRecords(records);
    }
  
    getRecords();
  
    return;
  }, [records.length]);
  





function updateForm(value) {
  return setForm((prev) => {
    return { ...prev, ...value };
  });
}
async function onSubmit(e) {
  e.preventDefault();
   // When a post request is sent to the create url, we'll add a new record to the database.
   for(var key in records)  {
    if(records[key].hall === form.hall && 
      records[key].date === form.date &&
       ((form.fromtime >= records[key].fromtime && form.fromtime <= records[key].totime) 
       || (form.totime >= records[key].fromtime && form.totime <= records[key].totime))){
      window.alert("Already scheduled");
      return
    }
   }
 
  form.bookedbyemail = retPersonEmail();
  form.bookedbyname = retPersonName();
  const newPerson = { ...form };
  
  
  await fetch("http://localhost:5000/record/schedule", {
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
     
    <NavbarF/><div className='body-hall'>
    {(error !== "") ? (<div className='error'>{error}</div>) : ""}
    
    <div class="bregform"> 
  <h1>Hall Booking</h1>
  
 
  <div className='bmane'>
  <form onSubmit={onSubmit}>
  <table className='hall-table'>
        
        <div id="bname">
        <tr>
     <td>   <label htmlFor="Hall" className='bname'>Select Hall</label></td>
       <td><select name="room" id="room-select" className='bselect' value={form.hall}
         onChange={(e) => updateForm({ hall: e.target.value })} placeholder="-Please choose an option-" required>
        <option value="" disabled selected>Select an option</option>
        <option value="Albert Einstein Hall">Albert Einstein Hall</option>
        <option value="FOSS Lab">FOSS Lab</option>
        <option value="Issac Newton Hall">Issac Newton Hall</option>
        <option value="Steve Jobs Hall">Steve Jobs Hall</option>
        <option value="Visheshwarya Hall">Visheshwarya Hall</option>
        <option value="Dijkstra Lab">Dijkstra Lab</option>
       </select  ></td></tr>
        </div><br/>
        <div className="form-group" id="bname"> <tr>
     <td>
        <label htmlFor="department" className='bname'>Select Your Department</label></td><td>
         <select name="department" id="dep-select" className='bdepartmentsub' value={form.department}
         onChange={(e) => updateForm({ department: e.target.value })} placeholder="-Please choose ypur department-" required>
        <option value="" disabled selected>Select an option</option>
        <option value="CSE">CSE</option>
        <option value="ECE">ECE</option>
        <option value="EEE">EEE</option>
        <option value="CE">CE</option>
        <option value="ME">ME</option>
        <option value="Basic Science">Basic Science</option>
       </select  ></td></tr>
       </div>
       
       <div className="bform-group" id="bname"><tr>
     <td>
       <label htmlFor="class" className='bname'>Enter your Class</label></td><td>
         <input
           type="text"
           className="bclassnamesub"
           id="class"
           value={form.class}
           onChange={(e) => updateForm({ class: e.target.value })}
           required
         /></td>
         </tr>
       </div>

       <div className="bform-group" id="bname"><tr>
     <td>
       <label htmlFor="date" className='bname'>Choose Date</label></td><td>
         <input
           type="date"
           className="bdate"
           id="date"
           value={form.date}
           onChange={(e) => updateForm({ date: e.target.value })}
           required
         /></td></tr>
       </div>
       <div className="bform-group" id="bname"><tr>
     <td>
       <label htmlFor="roomno" className='bname'>From</label></td><td>
                 <input
           type="time"
           className="btime"
           min="09:00" max="18:00" required value={form.fromtime}
           onChange={(e) => updateForm({fromtime: e.target.value })}
        
         /></td></tr>
       </div>
       <div className="bform-group" id="bname"><tr>
     <td>
       <label htmlFor="roomno" className='bname'>To</label></td><td>
         <input
           type="time"
           className="btotime"
           min={form.fromtime} max="18:00" required value={form.totime}
           onChange={(e) => updateForm({totime: e.target.value })}
        
         /></td></tr>
       </div>
      
       

       <div className="bform-group"><tr>
         <input
           type="submit"
           value="Schedule Your Hall"
           className="btn-primary"
         />
    </tr>
       </div>
       <div className="bform-group"><tr>
       <Link to="/OccupancyF/Schedules"><input
           type="submit"
           value="View Schedules"
           className="btn-primary"
         /></Link>
       </tr></div>
       </table>
       
     </form></div></div>
     
   </div>
   
</div>
 

  );
}

export default OccupancyF;

