// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newCust = {
      name: $("#cust_name").val().trim(),
      employee_id: $("#emp_select").val().trim()
    };
    console.log(newCust)
    $.ajax("/api/custs", {
      type: "POST",
      data: newCust
    }).then(function() {
        console.log("New customer added.");
        // Reload the page to get the updated list
        window.location.reload(true);
      }
    );
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
