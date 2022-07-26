import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

function Accept() {
    const Record = (props) => {
        if(props.record.status !== "Registered"){
        return(
        <tr>
               
          
          {/* <td>{props.record._id}</td> */}
          <td>{props.record.username}</td>
          <td>{props.record.email}</td>
          <td>{props.record.department}</td>
          <td>{props.record.status}</td>
          
          <td> <Link className="btn btn-link" to={`/register/${props.record._id}`}>Add user</Link></td>
          
          </tr>
       
         
          
      )}
    else return(
        <tr>
        <td>{props.record.username}</td>
        <td>{props.record.email}</td>
        <td>{props.record.department}</td>
        <td>{props.record.status}</td>
        </tr>
    )
    
    };
    
      
    
      const [records, setRecords] = useState([]);
      
      useEffect(() => {
        async function getRecords() {
          const response = await fetch("http://localhost:5000/record/register");
    
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
    
    
    
    
    
      return (
        <div>
          <Navbar/>
          <h3>User List</h3>
         <table className="table table-striped" style={{ marginTop: 20 }}>
           <thead>
             <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>ADD AS A USER</th>
                  
    
             </tr>
           </thead>
           <tbody>
           {recordList()} 
    
            </tbody>
    
         </table> 
       
        </div>
      )
    }

export default Accept