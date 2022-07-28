import React, { useState } from 'react'
import Navbar from './navbar/Navbar'
import './home.css'
import QRCode from 'qrcode';
//import { Grid } from '@material-ui/core';

import { Link } from 'react-router-dom';
 
export default function Home() {

const [imageUrl, setImageUrl] = useState('');
let text1=""




const [imagein,setImage] = useState(
  {
      image: '',
  }
);

const onChangeFile = (e) => {
  
  setImage({...imagein, image: e.target.files[0]});
  
};


const [isShown, setIsShown] = useState(false);
 let [form, setForm] = useState({
   type:"",
   name: "",
   warranty: "",
   manufdate: "",
   id: "",
   Department:"",
   RoomNo:"",
   information:""
   
 });

 const generateQrCode = async () => {
  try {
        const response = await QRCode.toDataURL(text1);
        setImageUrl(response);
        console.log("Hello")
  }catch (error) {
    window.alert(error)
  }
}

const makeid = (dep) => {
  var tex = "MITS/"+dep+"/";
  
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (var i = 0; i < 6; i++){
    tex += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  text1 = tex;
  return tex;
    
  
}


 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }

 function onSubmit(e) {
   e.preventDefault();
   
   form.id = makeid(form.Department);
   //window.alert(form.id)
   generateQrCode();
  //  window.alert(form.id)
   if(imageUrl===""){
    return;
   }
   
   
   setIsShown(true);
   
 }


 async function addData(e){
  e.preventDefault();
  if(form.type === ""){
    return;
  }
  //window.alert(form.id)
  const newPerson = new FormData();
  //window.alert(form.id)
  newPerson.append("image", imagein.image);
  newPerson.append("id", form.id)
  newPerson.append("Department", form.Department)
  newPerson.append("type", form.type )
  newPerson.append("name", form.name)
  newPerson.append("manufdate", form.manufdate)
  newPerson.append("warranty", form.warranty)
  newPerson.append("RoomNo", form.RoomNo)
  newPerson.append("information",form.information)
  //newPerson.append("", form.)
  //window.alert(form.id)
  await fetch("http://localhost:5000/record/add", {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: newPerson,
  })
  .catch(error => {
    window.alert(error);
    return;
  });
  //window.alert(form.id)
  setForm({ 
   name: "",
   warranty: "",
   manufdate: "",
   id: "",
   Department:"" ,
   RoomNo:"",
   type:"",
   information:""
  
 });
 setIsShown(false);
 //window.alert(form.id)
 
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
    <Navbar/>
    <div className='home-app'>
    
   

    <div className='home-form'>
      
     <h2>Create New Record<br></br></h2>
     <div className='home-main' >
     <form onSubmit={onSubmit} enctype="multipart/form-data" className='form-home'>
      <table className='home-table'>
     <div className="hform-group"><tr><td>
     <label htmlFor="type">Type</label></td><td>
        <select name="type" id="type"  value={form.type}
         onChange={(e) => updateForm({ type: e.target.value })}  >
        
        <option value="" disabled selected>Select an option</option>
        <option value="Electronics">Electronics</option>
        <option value="Furniture">Furniture</option>
        
       </select  >
       </td></tr>
       </div>
       <div className="hform-group"><tr><td>
         <label htmlFor="name">Name</label></td><td>
         <input
           type="text"
           className="hform-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
           required
         />
        </td></tr>
       </div>
       <div className="hform-group"><tr><td>
         <label htmlFor="manufdate">Manufacture Date</label></td><td>
         <input
           type="date"
           className="hform-control"
           id="manufdate"
           value={form.manufdate}
           onChange={(e) => updateForm({ manufdate: e.target.value })}
           required
         /></td></tr>
       </div>
       <div className="hform-group"><tr><td>
         <label htmlFor="warranty">Warranty</label></td><td>
         <input
           type="date"
           className="hform-control"
           id="warranty"
           min={form.manufdate}
           value={form.warranty}
           onChange={(e) => updateForm({ warranty: e.target.value })}
           required
         /></td></tr>
       </div>

      
       <div className="hform-group"><tr><td>
       <label htmlFor="Department">Department</label></td><td>
        <select name="Department" id="Department"  value={form.Department}
         onChange={(e) => updateForm({ Department: e.target.value })} >
        <option value="" disabled selected>Select an option</option>
        <option value="CSE">CSE</option>
        <option value="ECE">ECE</option>
        <option value="EEE">EEE</option>
        <option value="CE">CE</option>
        <option value="ME">ME</option>
        <option value="Basic Science">Basic Science</option>
       </select  >
       </td></tr>
       </div>
       <div className="hform-group"><tr><td>
         <label htmlFor="RoomNo">Room Number</label></td><td>
         <input
           type="text"
           className="hform-control"
           id="RoomNo"
           value={form.RoomNo}
           onChange={(e) => updateForm({ RoomNo: e.target.value })}
           required
         /></td></tr>
       </div>
       <div className="hform-group"><tr><td>
       <label>Additional Information</label></td><td>
       <textarea value={form.information} placeholder="Enter additional details" 
       onChange={(e) => updateForm({information : e.target.value})}></textarea></td></tr>
       <tr><td>
       
       <label htmlFor="bill">Upload Bill Details</label></td><td>
       <input
          type="file"
          //value={selectedFile}
          onChange={onChangeFile}
        /></td></tr>
        </div>

       <div className="hform-group"><tr>
         <input
           type="submit"
           value="Generate QR"
           className="hbtn-primary"
         />

    </tr>
       </div>
       <div className='hform-group'><tr>
      
       <Link to="/Details"><input
           type="submit"
           value="View all Facilities"
           className="hbtn-primary"
         /></Link></tr>
       </div></table>
     </form>
     
     </div></div>
     
           
   
    {isShown &&    (
      <>
      <div className='qrc-top'>
      <div className='qrc-top2'>
       <div className='qrc-image'>

       {imageUrl ? (
             <a href={imageUrl} download>
            <img src={imageUrl} alt="img" />
              </a>) : null} 
               <h6>To Download click on QR code</h6> 
      </div>
    <div className='qrc-table'>
        <h1>Add Details</h1>
    <table className='table-data'>
      <tr>
        <td><h4>ID</h4></td>
        <td><h4> {form.id}</h4></td>
      </tr>
      <tr>
        <td><h4>Type</h4></td>
        <td><h4> {form.type}</h4></td>
      </tr>
      <tr>
        <td><h4>Name</h4></td>
        <td><h4> {form.name}</h4></td>
      </tr>
      <tr>
        <td><h4>Department</h4></td>
        <td><h4> {form.Department}</h4></td>
      </tr>
      <tr>
        <td><h4>Room No</h4></td>
        <td><h4>{form.RoomNo}</h4></td>
      </tr>
      <tr>
        <td><h4>Manufacture Date</h4></td>
        <td><h4> {form.manufdate}</h4></td>
      </tr>
      <tr>
        <td><h4>Warranty</h4></td>
        <td><h4> {form.warranty}</h4></td>
      </tr>
      <tr>
        <h4> {form.information}</h4>
      </tr>
     
    </table>
    <form onSubmit={addData}>
        <input type="submit" className="hbtn-primary" value="Add Data"/>
    </form></div>
  </div></div> </>)}
  </div>
   </div>
 );
}
