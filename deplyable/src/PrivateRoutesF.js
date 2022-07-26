import { Outlet,Navigate } from 'react-router-dom'
import React from 'react'
import {retLog,retRole} from './Login/Login'

function PrivateRoutesF() {
    let auth1 = false;
    let Log = retLog()
    if (Log && (retRole() === "faculty" || retRole() === "Faculty")){
      auth1 = true;
    }
    console.log(auth1)

  return (
    
    auth1 ? <Outlet/ > : <Navigate to = "/"/>
  )
}

export default PrivateRoutesF