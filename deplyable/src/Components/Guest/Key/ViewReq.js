import React, {useState,useEffect} from 'react'

import { retGuest } from '../Guest';
import NavbarG from '../navbar/NavbarG';
import './viewkey.css'


function ViewReq() {

   
   const Record = (props) => {
    
    return(
    <tr>
    
      <td>{props.record.name}</td>
      <td>{props.record.room}</td>
      <td>{props.record.date}</td>
     
      <td>{props.record.fromtime}</td>
      <td>{props.record.totime}</td>
      
     
      <td>{props.record.reason}</td>
      <td>{props.record.comments}</td>
     
      
      </tr>
   
     
      
  )};

 
  const [records, setRecords] = useState([]);
  
  useEffect(() => {
    async function getRecords() {
      const response = await fetch("http://localhost:5000/record/keys");
  
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
      if(record.email === retGuest()){
      return (
        <Record
          record={record}
          key={record._id}
        />
      );}
    });
  }

  
  

  return (
    <div>
      <NavbarG/>
      <div className='viewkey-body'>
        <div id='viewkey-div'>
      <h3>Requests</h3>
     <table id="key-table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
              <th>Name</th>
            
              <th>Room</th>
              <th>Date</th>
              
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Comments</th>
              

         </tr>
       </thead>
       <tbody>
       {recordList()} 

        </tbody>

     </table> 
   </div></div>
    </div>
  )
}

export default ViewReq