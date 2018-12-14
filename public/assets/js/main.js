// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(document).on("click", "button.delete", deleteCust);
  $(document).on("click", "button.complete", toggleComplete);

    // This function deletes a customer from Log Book
  function deleteCust(event) {
    event.stopPropagation();
    var cust_id = $(this).val().trim();
    $.ajax({
      method: "DELETE",
      url: "/api/delete/" + cust_id
    }).then(function() {
        console.log("Customer deleted.");
        location.reload();
    });
  }

  // This function move a customer from In-service block to Log Book (complete)
  function toggleComplete(event) {
    event.stopPropagation();
    var cust_id = $(this).val().trim();
    var emp_id = $(this).parent().val();
    // cannot use .trim() up there.
    console.log("Cust_id and Emp_id for completion: "+cust_id+" + "+emp_id)
    $.ajax("/api/complete_cust/"+cust_id,{
      type: "PUT",
      data: ""
    }).then(function() {
        console.log("Customer's status changed.");
        location.reload();
    });
    updateEmpStatus(emp_id,false);    
  }

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newCust = {
      name: $("#cust_name").val().trim(),
      employee_id: $("#emp_select").val().trim()
    };

    console.log(newCust)

    // Send the POST request.    
    $.ajax("/api/custs", {
      type: "POST",
      data: newCust
    }).then(function() {
        console.log("New customer added.");
        location.reload();
    });
    updateEmpStatus(newCust.employee_id, true);
  });
  var updateEmpStatus = function(emp_id,status){
    var newStatus = {
      busy: status
    }
    $.ajax("/api/emp/"+emp_id,{
      type: "PUT",
      data: newStatus
    }).then(function() {
        console.log("Employee status changed.");
        location.reload();
    })
  }
  // $(".change-sleep").on("click", function(event) {
  //   var id = $(this).data("id");
  //   var newSleep = $(this).data("newsleep");

  //   var newSleepState = {
  //     sleepy: newSleep
  //   };

  //   // Send the PUT request.
  //   $.ajax("/api/cats/" + id, {
  //     type: "PUT",
  //     data: newSleepState
  //   }).then(
  //     function() {
  //       console.log("changed sleep to", newSleep);
  //       // Reload the page to get the updated list
  //       location.reload();
  //     }
  //   );
  // });


});
