var orm = require("../config/orm.js");
var burger = {
    allEmp: function(cb){
        orm.selectAllOrder("employee", "last_activities", function(res){
            cb(res);
        })
    },
    allCust: function(cb){
        orm.selectAll("in_service LEFT JOIN employee ON employee_id = employee.id", function(res){
            cb(res);
        })
    },
    insertOneCust: function(vals, cb){
        orm.insertOne("in_service",["customer","employee_id"], vals, function(res){
            cb(res);
        })
    },
    updateOne: function(objColVals,condition, cb){
        orm.updateOne("employee",objColVals,condition,function(res){
            cb(res)
        })
    }
}
// Export the database functions for the controller (catsController.js).
module.exports = burger;
