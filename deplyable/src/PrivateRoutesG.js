import { Outlet,Navigate } from 'react-router-dom'
import React from 'react'
import { retGuest } from './Components/Guest/Guest';

function PrivateRoutesF() {
    let auth2 = false;
    
    if (retGuest() !== "" ){
      auth2 = true;
    }
    console.log(auth2)

  return (
    
    auth2 ? <Outlet/ > : <Navigate to = "/Guest"/>
  )
}

export default PrivateRoutesF