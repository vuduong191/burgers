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
  burger.insertOneCust([newCust.name,newCust.employee_id], function(result) {});
});
router.put("/api/emp/:id", function(req, res) {
  var condition = "id="+ req.params.id;
  var newStatus = req.body;
  console.log(condition+"\n"+newStatus)
  burger.updateone("employee",newStatus,condition, function(result) {
    if (result.changedRows === 0) {
      return res.status(404).end();
    }
    res.status(200).end()
  })
});
router.put("/api/complete_cust/:id", function(req, res) {
  var condition = "id="+ req.params.id;
  console.log(condition)
  burger.updateone("in_service",{being_served:false},condition, function(result) {
    if (result.changedRows === 0) {
      return res.status(404).end();
    }
    res.status(200).end()
  })
});

router.delete("/api/delete/:id", function(req, res) {
  var id = req.params.id;
  burger.deleteCust(id, function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});
// Export routes for server.js to use.
module.exports = router;