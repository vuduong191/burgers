// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(document).on("click", "button.delete", deleteCust);
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", "button.recover", recoverCust);
  $("#emp_del_submit").on("click",del_emp);
  $("#reset-time-cmd").on("click",resetTime);
  $("#add_emp_but").on("click", addEmp);

  function addEmp(event){
    event.stopPropagation();
    var empName = $("#new_emp_name").val().trim();
    var empPhoto = $("#new_emp_photo").val().trim();
    var data={newEmp:[empName,empPhoto]}
    console.log(data)
      // Form validation
    function validateForm() {
      var isValid = true;
      $("#add-emp-modal .form-control").each(function() {
        if ($(this).val() == "") {
          isValid = false;
        }
      });
      return isValid;
    };
    if(validateForm()){
      // Send the POST request.    
      $.ajax("/api/newemp", {
        type: "POST",
        data: data
      }).then(function() {         
      });
      alert("New employee added.");         
    } else {
      alert("Please provide all information!")
    }
    $("#add-emp-modal .form-control").each(function() {
      $(this).val("")
    });     
  }

  function resetTime(event){
    event.stopPropagation();    
    var newStatus={last_activities: moment().format("YYYY-MM-DD HH:mm:ss")}; 
    var idArray= "SELECT id FROM employee";
    updateEmpStatus(idArray,newStatus);
    location.reload()         
  }  
  

  function del_emp(event){
    event.stopPropagation();
    var idArray= [$("#emp_del_select").val()];
    var  newStatus = {emp_deleted:true}    
      // Form validation
    function validateForm() {
      var isValid = true;
      // $(".form-control").each(function() {
      //   if ($(this).val() === "") {
      //     isValid = false;
      //   }
      // });
      // $(".chosen-select").each(function() {
      //   if ($(this).val() === "") {
      //     isValid = false;
      //   }
      // });
      if(idArray[0].length==0) {
        isValid = false;
      }
      return isValid;
    }
    console.log(idArray)
    if (validateForm()) {    
      updateEmpStatus(idArray,newStatus);
      alert("Successfully deleted.")

    } else {
      alert("Please select at least one employee!")
    };
    $('#emp_del_select')
    .find('option').prop('selected', false)
    .end().trigger('chosen:updated');      
  }
  // This function deletes employees from an array of IDs, not used yet
  function del_emp_array(id_array) {
    $.ajax("/api/del_emps", {
      type: "DELETE",
      data: {id_array:id_array}
    }).then(
      function() {
      }
    );
  };
    // This function deletes a customer from Log Book
  function deleteCust(event) {
    event.stopPropagation();
    var cust_id = $(this).data("cust_id");
    var del_reason = "'"+escape(prompt("Reason for entry deletion:", "..."))+"'";
    $.ajax("/api/complete_cust/"+cust_id,{
      type: "PUT",
      data: {deleted:true, del_reason:del_reason}
    }).then(function() {
        console.log("Customer's status changed.");
        location.reload();
    });
  };

   function recoverCust(event) {
    event.stopPropagation();
    var cust_id = $(this).data("cust_id");
    $.ajax("/api/complete_cust/"+cust_id,{
      type: "PUT",
      data: {deleted:false}
    }).then(function() {
        console.log("Customer's status changed.");
        location.reload();
    });
  };

  // This function move a customer from In-service block to Log Book (complete)
  function toggleComplete(event) {
    event.stopPropagation();
    var custID = $(this).data("cust_id");
    var empID= $(this).data("emp_id");
    var actTime = moment().format("YYYY-MM-DD HH:mm:ss");    
    console.log("Cust_id and Emp_id for completion: "+custID+" + "+empID);
    var bill_info = {
      being_served: false,
      bill: $(this).parent().siblings(".bill").children("input").val().trim(),
      tip: $(this).parent().siblings(".tip").children("input").val().trim(),
      end_time: actTime
    }
    // cannot use .trim() up there.

    $.ajax("/api/complete_cust/"+custID,{
      type: "PUT",
      data: bill_info
    }).then(function() {
        console.log("Customer's status changed.");
        location.reload();
    });
    var idArray=[empID];
    var  newStatus = {busy:false}
    updateEmpStatus(idArray,newStatus);    
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
        console.log("New customer added.");
        location.reload();
    });
    // Change the last_activities and status of employee
    var newStatus = {
      busy: true,
      last_activities: actTime      
    }
    var idArray=[newCust.employee_id];
    updateEmpStatus(idArray,newStatus);  
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

// Refresh page when the modal is hidden
$("#del-emp-modal").on('hidden.bs.modal', function(){
  location.reload();
});
$("#add-emp-modal").on('hidden.bs.modal', function(){
  location.reload();
});

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
