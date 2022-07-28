const express = require("express");

const recordRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, './public/Uploads/')
  },
  filename: (req,file,cb) => {
    cb(null, file.originalname)
  }
});

const upload = multer({storage: storage});

recordRoutes.route("/record/add").post(upload.single('image'),function (req,response) {
    let db_connect = dbo.getDb();
    const image = req.file.originalname;
    let myobj = {
        type: req.body.type,
        name: req.body.name,
        warranty: req.body.warranty,
        manufdate: req.body.manufdate,
        image:req.file.originalname,
        Department: req.body.Department,
        RoomNo: req.body.RoomNo,
        id: req.body.id,
        information: req.body.information
    };
    db_connect.collection("facility").insertOne(myobj, function (err,res) {

        if(err) throw err;
        response.json(res);
        
    });
});
recordRoutes.route("/record/register").post(function (req,response) {
  let db_connect = dbo.getDb();
  let myobj = {
      email: req.body.email,
      username: req.body.username,
      department: req.body.department,
      password: req.body.password,
      status:req.body.status
     
  };
  db_connect.collection("register").insertOne(myobj, function (err,res) {

      if(err) throw err;
      response.json(res);
      
  });
});
recordRoutes.route("/record/users").post(function (req,response) {
  let db_connect = dbo.getDb();
  let myobj = {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      Name: req.body.username,
      department: req.body.department,    
     
     
  };
  db_connect.collection("Users").insertOne(myobj, function (err,res) {

      if(err) throw err;
      response.json(res);
      
  });
});

recordRoutes.route("/record/schedule").post(function (req,response) {
    let db_connect = dbo.getDb();
    let myobj = {
        bookedbyemail:req.body.bookedbyemail,
        bookedbyname:req.body.bookedbyname,
        hall: req.body.hall,
        department: req.body.department,
        class: req.body.class,
        date: req.body.date,
        fromtime: req.body.fromtime,
        totime: req.body.totime,
        
    };
    db_connect.collection("Schedules").insertOne(myobj, function (err,res) {

        if(err) throw err;
        response.json(res);
        
    });
});


recordRoutes.route("/record/complaints").post(function (req,response) {
    let db_connect = dbo.getDb();
    let myobj = {
        id: req.body.id,
        complainantname: req.body.complainantname,
        complainantemail: req.body.complainantemail,
        name: req.body.name,
        type: req.body.type,
        department: req.body.department,
        
        roomno:req.body.roomno,
        remarks: req.body.remarks,
        
        
        status: req.body.status
        
        
    };
    db_connect.collection("Complaints").insertOne(myobj, function (err,res) {

        if(err) throw err;
        response.json(res);
        
    });
});


recordRoutes.route("/record/keyrequest").post(function (req,response) {
  let db_connect = dbo.getDb();
  let myobj = {
      email: req.body.email,
      
      name: req.body.name,
      
      department: req.body.department,
      class: req.body.class,
      room:req.body.room,
      date: req.body.date,
      fromtime: req.body.fromtime,
      totime: req.body.totime,
        
      reason :req.body.reason,

      comments: req.body.comments
      
      
  };
  db_connect.collection("KeyRequest").insertOne(myobj, function (err,res) {

      if(err) throw err;
      response.json(res);
      
  });
});



recordRoutes.route("/record/user").get(function (req, res) {
    let db_connect = dbo.getDb("Users");
    db_connect
      .collection("Users")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
   });

   recordRoutes.route("/record/facility").get(function (req, res) {
    let db_connect = dbo.getDb("facility");
    db_connect
      .collection("facility")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
   });

   recordRoutes.route("/record/complaints").get(function (req, res) {
    let db_connect = dbo.getDb("Complaints");
    db_connect
      .collection("Complaints")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
   });
   recordRoutes.route("/record/keys").get(function (req, res) {
    let db_connect = dbo.getDb("KeyRequest");
    db_connect
      .collection("KeyRequest")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
   });
   recordRoutes.route("/record/register").get(function (req, res) {
    let db_connect = dbo.getDb("register");
    db_connect
      .collection("register")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
   });
   recordRoutes.route("/record/schedules").get(function (req, res) {
    let db_connect = dbo.getDb("Schedules");
    db_connect
      .collection("Schedules")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
   });
 

    recordRoutes.route("/update/:id").post(function (req, response) {
        let db_connect = dbo.getDb(); 
        let myquery = { _id: ObjectId( req.body.id )}; 
        // let newvalues = { 
        //   // myquery,  
        //   $set: {     
        //     status: req.body.status
        //     // number: req.body.number,   
        //   }, 
        //  }
        db_connect.collection("Complaints").updateOne(
          myquery,
          {$set: {
            
            status:req.body.status
          }}
        )

       });
       
       
       recordRoutes.route("/Key/:id").post(function (req, response) {
        let db_connect = dbo.getDb(); 
        let myquery = { _id: ObjectId( req.body.id )}; 
        // let newvalues = { 
        //   // myquery,  
        //   $set: {     
        //     status: req.body.status
        //     // number: req.body.number,   
        //   }, 
        //  }
        db_connect.collection("KeyRequest").updateOne(
          myquery,
          {$set: {
            comments:req.body.comments
          }}
        )

       });

      
       recordRoutes.route("/register/:id").post(function (req, response) {
        let db_connect = dbo.getDb(); 
        let myquery = { _id: ObjectId( req.body.id )}; 
        // let newvalues = { 
        //   // myquery,  
        //   $set: {     
        //     status: req.body.status
        //     // number: req.body.number,   
        //   }, 
        //  }
        db_connect.collection("register").updateOne(
          myquery,
          {$set: {
            status:req.body.status
          }}
          
        )

       });



module.exports = recordRoutes;