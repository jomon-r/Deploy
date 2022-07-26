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
  
import Logout from '../../../Login/Login';
const NavbarF = () => {
 
    return (
        <>
        <Nav>
        <NavLink to="/HomeF">
          <h1><img src={mits} alt="mits" style={{marginLeft:0,height:'50px',width:'120px'}}/></h1>
          <Bars/>
          <NavMenu>
          <NavLink to="/HomeF" activeStyle>
              Home
            </NavLink>
           
            <NavLink to="/OccupancyF" activeStyle>
              Check Occupancy
            </NavLink>
            <NavLink to="/ComplaintsF" activeStyle>
              Complaints
            </NavLink>
            
            <NavBtn>
                <NavBtnLink onSubmit={Logout()} to ="/">Sign Out</NavBtnLink>
             </NavBtn>
          </NavMenu>
          </NavLink>
      </Nav>
    </>
    );
};

export default NavbarF;