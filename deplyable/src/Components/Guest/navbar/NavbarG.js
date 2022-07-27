import mits from '../../../mits.png'
import React from 'react';
import './navbar.css'
import Logout from '../../../Login/Login';
import { Link } from 'react-router-dom';
const NavbarG = () => {
 
    return (
        <>
        <div className='ghorizontal-navbar'>
          <Link to='/HomeG'>
            <h1><img src={mits} alt="mits" className='mits-navbar'/></h1>
          </Link>
         
          <Link to='/HomeG'><h4 className='gnavbar-link'>Scan QR Code</h4></Link>
          <Link to='/KeyRequest'><h4 className='gnavbar-link'>Request Key</h4></Link>
          
          <Link to='/SchedulesG'><h4 className='gnavbar-link'>View Schedules</h4></Link>
          

          



          <Link to='/'><button onClick={Logout} className='gbutton-navbar'>Sign Out</button></Link>


        </div>
       </>
    );
};

export default NavbarG;






