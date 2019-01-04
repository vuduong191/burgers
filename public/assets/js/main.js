// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(document).on("click", "button.complete", toggleComplete);

  // This function move a customer from In-service block to Log Book (complete)
  function toggleComplete(event) {
    event.stopPropagation();
    var custID = $(this).data("cust_id");
    var empID= $(this).data("emp_id");
    var actTime = moment().format("YYYY-MM-DD HH:mm:ss");
    var bill = $(this).parent().siblings(".bill").children("input").val().trim()==""?"0":$(this).parent().siblings(".bill").children("input").val().trim();
    var tip = $(this).parent().siblings(".tip").children("input").val().trim()==""?"0":$(this).parent().siblings(".tip").children("input").val().trim();   
    console.log("Cust_id and Emp_id for completion: "+bill+" + "+tip);
    var bill_info = {
      being_served: false,
      bill: bill,
      tip: tip,
      end_time: actTime
    }
    // cannot use .trim() up there.

    $.ajax("/api/complete_cust/"+custID,{
      type: "PUT",
      data: bill_info
    }).then(function() {
    var idArray=[empID];
    var  newStatus = {busy:false}
    updateEmpStatus(idArray,newStatus);
    location.reload();      
    });
  }

  $(".create-form").on("submit", function(event) {
    event.preventDefault();
    var actTime = moment().format("YYYY-MM-DD HH:mm:ss")
    var newCust = {
      start_time: actTime,
      name: $("#cust_name").val().trim(),
      employee_id: $("#emp_select").val().trim(),
      services: $("#services").val().trim()
    };

    console.log(newCust)
    console.log(actTime)
    // Send the POST request.    
    $.ajax("/api/custs", {
      type: "POST",
      data: newCust
    }).then(function() {
    });
    // Change the last_activities and status of employee
    var newStatus = {
      busy: true,
      last_activities: actTime      
    }
    var idArray=[newCust.employee_id];
    updateEmpStatus(idArray,newStatus);
    location.reload();    
  });
  function updateEmpStatus(emp_id_array,newStatus){
    var data={
      emp_id_array: emp_id_array,
      newStatus: newStatus
    }
    $.ajax("/api/emp",{
      type: "PUT",
      data: data
    }).then(function() {
        console.log("Employee status changed.");
    })
  }
});
