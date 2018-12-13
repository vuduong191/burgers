var express = require("express");
var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger= require("../models/burger.js");
router.get("/", function(req, res) {
  burger.allEmp(function(data) {
    var hbsObject = {
      employees: data
    };
    burger.allCust(function(data1){
        hbsObject.custs = data1;
        console.log(hbsObject);        
        res.render("index", hbsObject);
    })
  });
});

router.post("/api/custs", function(req, res) {
  var newCust=req.body;
  burger.insertOneCust([newCust.name,newCust.employee_id], function(data) {
    if(data) {
      console.log("New customer loaded.")
    }
  });
});
// Export routes for server.js to use.
module.exports = router;