import { Outlet,Navigate } from 'react-router-dom'
import React from 'react'
import {retLog,retRole} from './Login/Login'

function PrivateRoutes() {
    let auth = false;
    let Log = retLog()
    if (Log && (retRole() === "admin" || retRole() === "Admin")){
      auth = true;
    }
    console.log(auth)

  return (
    
    auth ? <Outlet/ > : <Navigate to = "/"/>
  )
}

export default PrivateRoutes