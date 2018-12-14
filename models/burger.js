var orm = require("../config/orm.js");
var burger = {
    allEmp: function(cb){
        orm.selectAllOrder("employee", "last_activities", function(res){
            cb(res);
        })
    },
    allCust: function(cb){
        var colname = ["in_service.id AS id","customer","employee_id", "emp_name", "being_served"]
        orm.selectCustomized(colname,"in_service LEFT JOIN employee ON employee_id = employee.id", function(res){
            cb(res);
        })
    },
    insertOneCust: function(vals, cb){
        orm.insertOne("in_service",["customer","employee_id"], vals, function(res){
            cb(res);
        })
    },
    updateone: function(tableInput,objColVals,condition, cb){
        orm.updateOne(tableInput,objColVals,condition,function(res){
            cb(res)
        })
    },
    deleteCust: function(id, cb){
        orm.deleteOne("in_service", "id="+id, function(res){
            cb(res)
        })
    }
}
// Export the database functions for the controller (catsController.js).
module.exports = burger;
