import mits from '../../../mits.png'
import React from 'react';
import './navbar.css'
import Logout from '../../../Login/Login';
import { Link } from 'react-router-dom';
const NavbarF = () => {
 
    return (
        <>
        <div className='horizontal-navbar'>
          <Link to='/HomeF'>
            <h1><img src={mits} alt="mits" className='mits-navbar'/></h1>
          </Link>
          <Link to='/HomeF'><h4 className='navbar-link'>QR Scanner</h4></Link>
          <Link to='/OccupancyF'><h4 className='navbar-link'>Schedule Halls</h4></Link>
          <Link to='/ComplaintsF'><h4 className='navbar-link'>File Complaints</h4></Link>
          <Link to='/'><button onClick={Logout} className='button-navbar'>Sign Out</button></Link>


        </div>
       </>
    );
};

export default NavbarF;