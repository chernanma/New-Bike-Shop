$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/employee_data").then(data => {
    $(".employee-name").text(data.email);
  });
});
