import React, {useState,useEffect} from 'react'
import { retPersonEmail } from '../../../Login/Login';
import NavbarF from '../navbar/NavbarF'


import './viewcomp.css'
function ViewComp() {

   const email = retPersonEmail()
   const Record = (props) => {
    
    return(
    <tr>
    
    
      
      <td>{props.record.id}</td>
     
      <td>{props.record.name}</td>
      <td>{props.record.type}</td>
      
      <td>{props.record.department}</td>
      <td>{props.record.roomno}</td>
      <td>{props.record.remarks}</td>
      <td>{props.record.status}</td>
      
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
      if(record.complainantemail === email){
      return (
        <Record
          record={record}
          key={record._id}
        />
      );}
    });
  }

  
  

  // const [isShown, setIsShown] = useState(false);
  // const handleClick = event => {
  //   // 👇️ only show element on click
  //   setIsShown(current => !current);
  // };



  return (
    <div>
      <NavbarF/>
      <div className='viewcomp-body'>
        <div className='viewcomp-div'>
      <h3>Complaint List</h3>
     <table className="comp-table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
              <th>ID</th>
            
              <th>Name</th>
              <th>Type</th>
              
              <th>Department</th>
              <th>Room No</th>
              <th>Remarks</th>
              <th>Status</th>
              

         </tr>
       </thead>
       <tbody>
       {recordList()} 

        </tbody>

     </table> </div>
     </div>
    </div>
  )
}

export default ViewComp