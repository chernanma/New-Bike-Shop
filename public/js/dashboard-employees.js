//$(document).ready(() => {
const $employeesTable = $("#employees-table");
// category table
$employeesTable.on("click", (e) => {
  const $ele = $(e.target);
  const $tr = $ele.parents("tr");
  // edit
  if ($ele.hasClass("btn-edit-row")) {
    editemployeesInfo($tr);
  } else if ($ele.hasClass("btn-delete-row")) {
    const eId = $tr
      .find("#e-id")
      .text()
      .trim();
    $.ajax({
      url: "/api/employees/" + eId,
      method: "DELETE"
    })
      .then(() => {
        $tr.detach();
        location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }
});
// search feature
$("#employeeSearchInput").on("keyup", function() {
  const value = $(this)
    .val()
    .toLowerCase();
  $("#employees-table-body tr").filter(function() {
    return $(this).toggle(
      $(this)
        .text()
        .toLowerCase()
        .indexOf(value) > -1
    );
  });
});
// add new employee
$("#add-new-employee-btn").on("click", () => {
  const data = {
    first_name: $("#ne-firstName")
      .val()
      .trim(),
    last_name: $("#ne-lastName")
      .val()
      .trim(),
    job_title: $("#ne-jobTitle")
      .val()
      .trim(),
    email: $("#ne-email")
      .val()
      .trim(),
    phone: $("#ne-phone")
      .val()
      .trim(),
    password: $("#ne-password")
      .val()
      .trim()
  };
  // ajax to post new employee information
  $.ajax({
    url: "/api/employees",
    method: "POST",
    data: data
  })
    .then(() => {
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
});
// update employees info
$("#edit-modal-save-employee-btn").on("click", () => {
  const data = {
    id: $("#ee-id")
      .val()
      .trim(),
    first_name: $("#ee-firstName")
      .val()
      .trim(),
    last_name: $("#ee-lastName")
      .val()
      .trim(),
    job_title: $("#ee-jobTitle")
      .val()
      .trim(),
    email: $("#ee-email")
      .val()
      .trim(),
    phone: $("#ee-phone")
      .val()
      .trim(),
    password: $("#ee-password")
      .val()
      .trim()
  };
  $.ajax({
    url: "/api/employees/",
    method: "PUT",
    data: data
  })
    .then(() => {
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
});

// render the edit modal with populated data for selected row
function editemployeesInfo($tr) {
  $("#ee-id").val(
    $tr
      .find("#e-id")
      .text()
      .trim()
  );
  // first name
  $("#ee-firstName").val(
    $tr
      .find("#e-first_name")
      .text()
      .trim()
  );
  // last name
  $("#ee-lastName").val(
    $tr
      .find("#e-last_name")
      .text()
      .trim()
  );
  // job_title
  $("#ee-jobTitle").val(
    $tr
      .find("#e-job_title")
      .text()
      .trim()
  );
  // email
  $("#ee-email").val(
    $tr
      .find("#e-email")
      .text()
      .trim()
  );
  // phone number
  $("#ee-phone").val(
    $tr
      .find("#e-phone")
      .text()
      .trim()
  );
  // password
  $("#ee-password").val(
    $tr
      .find("#e-password")
      .text()
      .trim()
  );
}
