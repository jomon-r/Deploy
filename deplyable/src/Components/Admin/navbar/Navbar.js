import mits from '../../../mits.png'
import React from 'react';
import './navbar.css'
import Logout from '../../../Login/Login';
import { Link } from 'react-router-dom';
const Navbar = () => {
 
    return (
        <>
        <div className='adhorizontal-navbar'>
          <Link to='/Home'>
            <h1><img src={mits} alt="mits" className='mits-navbar'/></h1>
          </Link>
          <Link to='/Home'><h4 className='adnavbar-link'>ADD DATA</h4></Link>
          <Link to='/QRC'><h4 className='adnavbar-link'>Scan QR Code</h4></Link>
          <Link to='/Occupancy'><h4 className='adnavbar-link'>Check Schedules</h4></Link>
          <Link to='/Complaints'><h4 className='adnavbar-link'>Check Complaints</h4></Link>
          <Link to='/Accept'><h4 className='adnavbar-link'>New Registrations</h4></Link>
          <Link to='/Key'><h4 className='adnavbar-link'>Key Requests</h4></Link>

          <Link to='/Prices'><h4 className='adnavbar-link'>Check Prices</h4></Link>



          <Link to='/'><button onClick={Logout} className='adbutton-navbar'>Sign Out</button></Link>


        </div>
       </>
    );
};

export default Navbar;




