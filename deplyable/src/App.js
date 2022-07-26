import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Login/Login";
import QRC from "./Components/Admin/QRCode/QRC";
import Home from "./Components/Admin/Home";
import Occupancy from "./Components/Admin/Occupancy/Occupancy";
import Complaints from "./Components/Admin/Complaints/Complaints";
import PrivateRoutes from "./PrivateRoutes";
import PrivateRoutesF from "./PrivateRoutesF"
import PrivateRoutesG from "./PrivateRoutesG"
import QRCF from "./Components/Faculty/QRCode/QRCF";
import OccupancyF from "./Components/Faculty/Occupancy/OccupancyF";
import ComplaintsF from "./Components/Faculty/Complaints/ComplaintsF";
import Guest from "./Components/Guest/Guest";
import QRCG from "./Components/Guest/QRC/QRCG"
import Prices from "./Components/Admin/Prices/Prices";
import SchedulesF from "./Components/Faculty/Occupancy/Schedules";
import SchedulesG from "./Components/Guest/Schedules/SchedulesG";
import ViewComp from "./Components/Faculty/Complaints/ViewComp";
import Edit from "./Components/Admin/Complaints/Edit";
import Details from "./Components/Admin/Facilities/Details";
import Register from "./Login/Register";
import Accept from "./Components/Admin/Accept/Accept";
import Addtouser from "./Components/Admin/Accept/Addtouser";
import Sample from "./Components/Admin/sample/Sample";
import Keyreq from "./Components/Guest/Key/Keyreq";
import Key from "./Components/Admin/Key/Key";
import Reply from "./Components/Admin/Key/Reply";
import ViewReq from "./Components/Guest/Key/ViewReq";
const App = () => {
  
  
  return (
    
    <div style={styles.app}>
      
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register/>} />
          <Route element={<PrivateRoutes/>}>
            <Route path="/Home" element={<Home  />}/>
            <Route path="/QRC" element={<QRC/>} />
            <Route path="/Occupancy" element={<Occupancy/>} />
            <Route path="/Complaints" element={<Complaints/>} />
            <Route path="/Prices" element={<Prices/>}/>
            <Route path="/edit/:id" element={<Edit/>}/>
            <Route path="/Details" element={<Details/>} />
           <Route path="/Accept" element={<Accept/>}/>
           <Route path="/register/:id" element={<Addtouser/>}/>
           <Route path="/Key" element={<Key/>}/>
           <Route path="/Key/:id" element={<Reply/>}/>
           <Route path="/sample" element={<Sample/>}/>
          </Route>
          <Route element={<PrivateRoutesF/>}>
            <Route path="/HomeF" element={<QRCF  />}/>
            <Route path="/OccupancyF/Schedules" element={<SchedulesF/>}/>
            <Route path="/OccupancyF" element={<OccupancyF/>} />
            <Route path="/ComplaintsF" element={<ComplaintsF/>} />
            <Route path="/ViewComp" element={<ViewComp/>} />
          </Route>
          <Route path="/Guest" element={<Guest/>} />
          <Route element={<PrivateRoutesG/>}>
          <Route path="/HomeG" element={<QRCG  />}/>
          <Route path="/SchedulesG" element={<SchedulesG />}/>
          <Route path="/ViewReq" element={<ViewReq/>} />
          <Route path="/KeyRequest" element={<Keyreq />}/>
          </Route>
          <Route path="*" element={()=> "404 NOT FOUND"}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

const styles = {
  app: {
    padding: 0,
  },
};