import mits from '../../../mits.png'
import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
  } from './NavbarElements';
  

const Navbar = () => {
    return (
        <>
        <Nav>
        <NavLink to="/Home">
          <h1><img src={mits} alt="mits" style={{marginLeft:0,height:'50px',width:'120px'}}/></h1>
          <Bars/>
          <NavMenu>
          <NavLink to="/Home" activeStyle>
              Home
            </NavLink>
            <NavLink to="/QRC" activeStyle>
              QRCode Scan
            </NavLink>
            <NavLink to="/Occupancy" activeStyle>
              Occupancy
            </NavLink>
            <NavLink to="/Complaints" activeStyle>
              Complaints
            </NavLink>
            <NavLink to="/Prices" activeStyle>
              Check Prices
            </NavLink>
            <NavLink to="/Accept" activeStyle>
              Add User
            </NavLink>
            <NavLink to="/Key" activeStyle>
              Key
            </NavLink>
            <NavBtn>
                <NavBtnLink to='/'>Sign Out</NavBtnLink>
             </NavBtn>
          </NavMenu>
          </NavLink>
      </Nav>
    </>
    );
};

export default Navbar;