import React, {useState,useEffect} from 'react'
import './qrcg.css'

import {QrReader} from 'react-qr-reader'
import NavbarG from '../navbar/NavbarG'
function QRCG() {
    const [data, setData] = useState('No result');
    //const [qrscan, setQrscan] = useState('No result');
    
   
    const [records, setRecords] = useState([]);

    let item = {
      type:"",
      name:"",
      warranty:"",
      manufdate:"",
      department:"",
      roomno:"",
      id:"",
      image:"",
      information:""
    }
    const getData = () => {
      for(var key in records){
        if(records[key].id === data){
          item.type = records[key].type;
          item.id = records[key].id;
       
          item.name = records[key].name
          item.department = records[key].Department
          item.roomno = records[key].RoomNo
       
          break;
        }
     
       
      } 
      
    }
    const printdata = () =>{
      return(
        <div className='scanresult-table'>
          <h1>PRODUCT DETAILS</h1>
          <div className='scanresult-intable'>
            <table className='scan-table'><tr><td>
        <label htmlFor='ID'>ID of the Product </label></td><td>
        <input type="text" value={item.id} className="id" readOnly /></td></tr>
        <tr><td><label htmlFor='type'>Type </label></td><td>
        <input type="text" value={item.type} className="id" readOnly /> </td></tr>
        <tr><td><label htmlFor='name'>Name </label></td><td>
        <input type="text" value={item.name} className="id" readOnly /> </td></tr>
      
        <tr><td><label htmlFor='Department'>Department :</label></td><td>
        <input type="text" value={item.department} className="id" readOnly /></td></tr>
        <tr><td><label htmlFor='roomno'>Room No </label></td><td>
        <input type="text" value={item.roomno} className="id" readOnly /></td></tr>
       
        </table>
        
        </div></div>
      )
    }
    const handleScan = data => {
       if (data) {
             //setQrscan(data);
             getData();
             //printdata();
         }
    }
    const handleError = err => {
    console.error(err)
    }
   
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
    const [isShown, setIsShown] = useState(false);
    const handleClick = event => {
      // 👇️ only show element on click
      setIsShown(current => !current);
    };
    
    const [isShn, setIsShn] = useState(false);
    const handleCli = event => {
      // 👇️ only show element on click
      setIsShn(current => !current);
    };
    

    return (
      <div>
        <NavbarG/>
            
            
        <div className='div2-qrc'>
   
   <div className='div3-qrc'>
     <div className='div4-qrc'>
      <button onClick={handleClick} className="btn-qrcs">Scan</button>
      {isShown && (
    <div>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
            getData();
            //printdata();
          }
  
          if (!!error) {
            console.info(error);
          }
        }}
        onError={handleError}
        onScan={handleScan}
        className='qrreader'
      />
        
    <label htmlFor='ID'>ID of the Product:</label>
    <input type="text" value={data} className="id" onChange={getData()} readOnly/>
    <label htmlFor='ID'>Search by ID:</label>
    <input type="text" value={data} className="id" onChange={(e) => {setData(e.target.value);getData();}} />
    <button onClick={handleCli} className="btn-qrcs">Show Details</button>
    </div>
  )}

  
  
</div>
  </div>
          
             
            
  {isShn && (      
     <div className='text'>
           {printdata()}
      </div>)}
      </div></div>
    );
  }
  
  export default QRCG;

