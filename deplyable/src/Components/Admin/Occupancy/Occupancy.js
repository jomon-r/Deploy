import React, {useState,useEffect} from 'react'
import Navbar from '../navbar/Navbar';
import './schedule.css'
const Record = (props) => (
   
  <tr>
    <td>{props.record.date}</td>
    <td>{props.record.fromtime}</td>
    <td>{props.record.totime}</td>
    
    <td>{props.record.hall}</td>
    <td>{props.record.department}</td>
    <td>{props.record.class}</td>
    
    <td>{props.record.bookedbyname}</td>
    
    
        
    </tr>
 
   
    
);
function Occupancy() {
  
    const [date,setDate] = useState("")
    const [records, setRecords] = useState([]);
    let flag = false
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
     
       
    function recordList() {
      return records.map((record) => {
        if(record.date === date){
          flag=true
        return (
          <Record
            record={record}
            key={record._id}
          />
        );}
        
      });
      
    }
    const [isShown, setIsShown] = useState(false);
    const handleClick = event => {
      // 👇️ only show element on click
      
      setIsShown(current => !current);
    };
 const nothing = () => {
  
    if(flag===false){
      return(
        <h1>No Schedules</h1>
      )
    }
   
  
 }

  return (
    
    <div><Navbar/>
    <div className='schedule-form'>
    <div className='schedule-label'>
    <label>Choose the Date</label>
    <input type="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
   
    <button onClick={handleClick} className="btn-schedule">Show</button> 
     {isShown && (

   <div className='schedules-table'>
    <h3>Schedule List</h3>
     <table className="schedule-table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
              
              <th>Date</th>
              <th>FROM</th>
              <th>To</th>
              <th>Hall</th>
              <th>Department</th>
              <th>Class</th>
              <th>Booked BY</th>
             

         </tr>
       </thead>
       <tbody>
       {recordList()} 

        </tbody>
     </table> </div>)}
     {nothing()}</div>
    </div> </div>
  )
}

export default Occupancy