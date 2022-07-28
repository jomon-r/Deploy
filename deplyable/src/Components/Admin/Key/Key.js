import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar'
import './rekey.css'

function Key() {
    const Record = (props) => {
   
        return(
        <tr>
        
        
          
          <td>{props.record.email}</td>
          <td>{props.record.name}</td>
          <td>{props.record.department}</td>
          <td>{props.record.class}</td>
          <td>{props.record.room}</td>
          
          <td>{props.record.date}</td>
          <td>{props.record.fromtime}</td>
          <td>{props.record.totime}</td>
          <td>{props.record.reason}</td>
          {/* <td > <input type="text" /></td> */}
          <td>{props.record.comments}</td>
          <td> <Link className="rekey-link" to={`/Key/${props.record._id}`}>Send Reply</Link></td>
          
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
          <div className='rekey-body'>
            <div className='rekey-form'>
            <h1>Key Requests</h1>
         <table className="rekey-striped" >
           <thead>
             <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Class</th>
                  <th>Room</th>
                  <th>Date</th>
                  
                 
                  <th>From</th>
                  <th>To</th>
                  <th>Reason</th>
                  <th>Comments</th>
                  <th></th>
                  
    
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

export default Key

