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
const NavbarG = () => {
 
    return (
        <>
        <Nav>
        <NavLink to="/HomeG">
          <h1><img src={mits} alt="mits" style={{marginLeft:0,height:'50px',width:'120px'}}/></h1>
          <Bars/>
          <NavMenu>
          <NavLink to="/HomeG" activeStyle>
              Home
            </NavLink>
           
         
            <NavLink to="/KeyRequest" activeStyle>
              Request Key
            </NavLink>
            <NavLink to="/SchedulesG" activeStyle>
              View Schedules
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

export default NavbarG;