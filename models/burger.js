var orm = require("../config/orm.js");
var burger = {
    allEmp: function(cb){
        orm.selectAllOrder("employee", "enabled DESC, last_activities ASC", function(res){
            cb(res);
        })
    },
    allCust: function(cb){
        var colname = ["in_service.id AS id","customer","employee_id", "emp_name", "being_served", "services","start_time","end_time","deleted", "bill", "tip", "del_reason"]
        orm.selectCustomized(colname,"in_service LEFT JOIN employee ON employee_id = employee.id ORDER BY end_time DESC", function(res){
            cb(res);
        })
    },
    insertOneCust: function(vals, cb){
        orm.insertOne("in_service",["customer","employee_id","services","start_time"], vals, function(res){
            cb(res);
        })
    },
    insertOneEmp: function(vals, cb){
        orm.insertOne("employee",["emp_name","photo"], vals, function(res){
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
    },
    updateEmpStatus: function(objColVals, valueArray, cb){
        orm.updateFromArray("employee", objColVals, "id", valueArray,function(res){
            cb(res)
        })
    },
    deleteEmp: function(id_array,cb){
        orm.deleteFromArray("employee","id", id_array, function(res){
            cb(res)
        })
    }
}
// Export the database functions for the controller (catsController.js).
module.exports = burger;
