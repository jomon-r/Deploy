import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar'
import './complaints.css'


function Complaints() {

  
   const Record = (props) => {
   
    return(
    <tr>
    
    
      
      <td>{props.record.id}</td>
      <td>{props.record.complainantname}</td>
      <td>{props.record.complainantemail}</td>
      <td>{props.record.name}</td>
      <td>{props.record.type}</td>
      
      <td>{props.record.department}</td>
      <td>{props.record.roomno}</td>
      <td>{props.record.remarks}</td>
      <td>{props.record.status}</td>
      {/* <td > <input type="text" /></td> */}
      <td> <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link></td>
      
      </tr>
   
     
      
  )};

  

  const [records, setRecords] = useState([]);
  
  useEffect(() => {
    async function getRecords() {
      const response = await fetch("http://localhost:5000/record/complaints");
  
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
      return (
        <Record
          record={record}
          key={record._id}
        />
      );
    });
  }

  
  

  // const [isShown, setIsShown] = useState(false);
  // const handleClick = event => {
  //   // 👇️ only show element on click
  //   setIsShown(current => !current);
  // };



  return (
    <div>
      <Navbar/>
      <h3>Complaint List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
              <th>ID</th>
              <th>Complainant Name</th>
              <th>Complainant Email</th>
              <th>Name</th>
              <th>Type</th>
              
              <th>Department</th>
              <th>Room No</th>
              <th>Remarks</th>
              <th>Status</th>
              <th>Update Status</th>
              

         </tr>
       </thead>
       <tbody>
       {recordList()} 

        </tbody>

     </table> 
   
    </div>
  )
}

export default Complaints