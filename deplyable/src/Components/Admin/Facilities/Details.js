import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar';
import './details.css'
const Record = (props) => (
   
    <tr>
      <td>{props.record.id}</td>
      <td>{props.record.type}</td>
      <td>{props.record.name}</td>
      
      <td>{props.record.manufdate}</td>
      <td>{props.record.warranty}</td>
      <td>{props.record.Department}</td>
      <td>{props.record.RoomNo}</td>
      
     
      
          
      </tr>

);
function Details() {
    const [data,setData] = useState("")
    const [dep,setDep] = useState("")
    const [records, setRecords] = useState([]);
    // let flag = false
    useEffect(() => {
      async function getRecords() {
        const response = await fetch("http://localhost:5000/record/facility");
    
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
         if(data  === "All" && dep === "All"){
          return (
          <Record
            record={record}
            key={record._id}
          />
        );
        }
        else if(data  === "All" && record.Department === dep){
            return (
            <Record
              record={record}
              key={record._id}
            />
          );
          }
          else if(record.type === data && dep === "All"){
            return (
                <Record
                  record={record}
                  key={record._id}
                />
              );
       
    }

        else if(record.type === data && record.Department === dep){
                return (
                    <Record
                      record={record}
                      key={record._id}
                    />
                  );
           
        }
        
        
        
      });
      
    }
    const [isShown, setIsShown] = useState(false);
    const handleClick = event => {
      // 👇️ only show element on click
      
      setIsShown(current => !current);
    };

  return (
    <div><Navbar/>

    <label>View by type</label>
    
    <select  onChange={(e) => setData(e.target.value)}>
     <option value="" disabled selected>Choose an Option</option>
     <option value="All">All</option>
     <option value="Furniture">Furniture</option>
     <option value="Electronics">Electronics</option>
     
   </select>
   <label>View by Department</label>
   <select  onChange={(e) => setDep(e.target.value)}>
     <option value="" disabled selected>Choose an Option</option>
     <option value="All">All</option>
     <option value="CSE">CSE</option>
     <option value="ECE">ECE</option>
     <option value="EEE">EEE</option>
     <option value="CE">CE</option>
     <option value="ME">ME</option>
     <option value="Basic Science">Basic Science</option>
     
   </select>


    <button onClick={handleClick} className="btn">Show</button>
     {isShown && (

   <div>
    <h3>List of Details</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
              
              <th>ID</th>
              <th>TYPE</th>
              <th>NAME</th>
              <th>Manufacture Date</th>
              <th>Warranty</th>
              <th>Department</th>
              <th>Room No</th>
              
             

         </tr>
       </thead>
       <tbody>
       {recordList()} 

        </tbody>
     </table> </div>
     )} 
     </div>
  )
}

export default Details