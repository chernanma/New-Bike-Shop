//$(document).ready(() => {
const $employeesTable = $("#employees-table");
// category table
$employeesTable.on("click", (e) => {
  const $ele = $(e.target);
  const $tr = $ele.parents("tr");
  // edit
  if ($ele.hasClass("btn-edit-row")) {
    editemployeesInfo($tr);
    console.log(editemployeesInfo());
  } else if ($ele.hasClass("btn-delete-row")) {
    const eId = $tr
      .find("#e-id")
      .text()
      .trim();
    $.ajax({
      url: "/api/employees/" + eId,
      method: "DELETE",
    })
      .then((res) => {
        //   ALL_EMPLOYEES = ALL_EMPLOYEES.filter((row) => {
        //     return row.id !== res.id;
        //   });
        $tr.detach();
        location.reload();
      })
      .catch((err) => {
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
  console.log("-----");
  console.log(data);
  // ajax to post new employee information
  $.ajax({
    url: "/api/employees",
    method: "POST",
    data: data
  })
    .then((res) => {
      console.log(res);
      location.reload();
    })
    .catch((err) => {
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
      // $employeesEditModal.modal("toggle");
      location.reload();
      // renderemployeesTableData();
    })
    .catch((err) => {
      console.log(err);
    });
});
// ajax call to employee api - returns list of all employees
// function requestListOfAllemployees() {
//   $.ajax({
//     url: "/api/employees",
//     method: "GET",
//   })
//     .then((res) => {
//       // save data to employees array
//       ALL_EMPLOYEES = res.map((record) => {
//         return {
//           id: record.id,
//           fN: record.first_name,
//           lN: record.last_name,
//           job_title: record.job_title,
//           email: record.email,
//           phone: record.phone,
//           password: record.password,
//         };
//       });
//       // renderemployeesTableData();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
// // render employee'info into employee table
// function renderemployeesTableData() {
//   $employeesTableBody.empty();
//   for (const employee in ALL_EMPLOYEES) {
//     const c = ALL_EMPLOYEES[employee];
//     const tRow = `<tr>
//     <td id="c-id">${c.id}<t/d>
//     <td id="c-fN">${c.fN}</td>
//     <td id="c-lN">${c.lN}</td>
//     <td id="c-email">${c.email}</td>
//     <td id="c-phone">${c.phone}</td>
//     <td id="c-billingAddress">${c.billingAddress}</td>
//     <td class="row-controls">
//     <span class="table-remove">
//     <button type="button"
//     class="  btn btn-edit-row  btn-success line-coverage btn-rounded btn-md my-0"><i class="btn-edit-row L0 fas fa-edit"></i></button>
//     <button type="button"
//     class="  btn btn-delete-row  btn-danger btn-rounded btn-md my-0"><i class="btn-delete-row L2 fas fa-times"></i></button>
//     </span>
//     </td>
//     </tr>`;
//     $employeesTableBody.append(tRow);
//   }
// }
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
// initialize the employees table
//requestListOfAllemployees();
//});
