$(document).ready(() => {
  let ALL_CUSTOMERS = [];

  const $customersTable = $("#customers-table");
  const $customersTableBody = $("#customers-table-body");
  const $customersEditModal = $("#customers-edit-modal");

  // category table
  $customersTable.on("click", e => {
    const $ele = $(e.target);
    const $tr = $ele.parents("tr");
    // edit
    if ($ele.hasClass("btn-edit-row")) {
      editCustomersInfo($tr);
    } else if ($ele.hasClass("btn-delete-row")) {
      const cId = $tr
        .find("#c-id")
        .text()
        .trim();
      $.ajax({
        url: "/api/customers/" + cId,
        method: "DELETE"
      })
        .then(res => {
          ALL_CUSTOMERS = ALL_CUSTOMERS.filter(row => {
            return row.id !== res.id;
          });
          $tr.detach();
        })
        .catch(err => {
          console.log(err);
        });
    }
  });

  // search feature
  $("#customerSearchInput").on("keyup", function() {
    const value = $(this)
      .val()
      .toLowerCase();
    $("#customers-table-body tr").filter(function() {
      return $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(value) > -1
      );
    });
  });

  // add new customer
  $("#add-new-customer-btn").on("click", () => {
    const data = {
      first_name: $("#nc-firstName")
        .val()
        .trim(),
      last_name: $("#nc-lastName")
        .val()
        .trim(),
      email: $("#nc-email")
        .val()
        .trim(),
      phone: $("#nc-phone")
        .val()
        .trim(),
      address_billing: $("#nc-street-address")
        .val()
        .trim(),
      city: $("#nc-city")
        .val()
        .trim(),
      state: $("#nc-region")
        .val()
        .trim(),
      zip_code: $("#nc-postal-code")
        .val()
        .trim(),
      country: $("#nc-country")
        .val()
        .trim()
    };

    console.log("-----");
    console.log(data);
    // ajax to post new customer information
    $.ajax({
      url: "/api/customers",
      method: "POST",
      data: data
    })
      .then(res => {
        console.log(res);
        if (data.id === res.id) {
          ALL_CUSTOMERS.push({
            id: res.id,
            fN: res.first_name,
            lN: res.last_name,
            email: res.email,
            phone: res.phone,
            billingAddress: `${res.address_billing}, ${res.city}, ${res.state}, ${res.zip_code}, ${res.country}`
          });
          $("#customers-modal").modal("toggle");
          // renderCustomersTableData();
        }
        location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  });

  // update customers info
  $("#edit-modal-save-customer-btn").on("click", () => {
    const data = {
      id: $("#ec-id")
        .val()
        .trim(),
      first_name: $("#ec-firstName")
        .val()
        .trim(),
      last_name: $("#ec-lastName")
        .val()
        .trim(),
      email: $("#ec-email")
        .val()
        .trim(),
      phone: $("#ec-phone")
        .val()
        .trim(),
      address_billing: $("#ec-street-address")
        .val()
        .trim(),
      city: $("#ec-city")
        .val()
        .trim(),
      state: $("#ec-region")
        .val()
        .trim(),
      zip_code: $("#ec-postal-code")
        .val()
        .trim(),
      country: $("#ec-country")
        .val()
        .trim()
    };
    // // id
    // const cId = $("#ec-id")
    //   .val()
    //   .trim();

    // ajax to update the customers data
    $.ajax({
      url: "/api/customers/",
      method: "PUT",
      data: data
    })
      .then(() => {
        // $customersEditModal.modal("toggle");
        location.reload();
        // renderCustomersTableData();
      })
      .catch(err => {
        console.log(err);
      });
  });

  // ajax call to customer api - returns list of all employees
  function requestListOfAllCustomers() {
    $.ajax({
      url: "/api/customers",
      method: "GET"
    })
      .then(res => {
        // save data to customers array
        ALL_CUSTOMERS = res.map(record => {
          return {
            id: record.id,
            fN: record.first_name,
            lN: record.last_name,
            email: record.email,
            phone: record.phone,
            billingAddress: `${record.address_billing}, ${record.city}, ${record.state}, ${record.zip_code}, ${record.country}`
          };
        });

        // renderCustomersTableData();
      })
      .catch(err => {
        console.log(err);
      });
  }

  // // render customer'info into customer table
  // function renderCustomersTableData() {
  //   $customersTableBody.empty();
  //   for (const customer in ALL_CUSTOMERS) {
  //     const c = ALL_CUSTOMERS[customer];
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

  //     $customersTableBody.append(tRow);
  //   }
  // }

  // render the edit modal with populated data for selected row
  function editCustomersInfo($tr) {
    // addresss
    // const address = $tr
    //   .find("#c-billingAddress")
    //   .text()
    //   .split(",");

    // id
    $("#ec-id").val(
      $tr
        .find("#c-id")
        .text()
        .trim()
    );
    // first name
    $("#ec-firstName").val(
      $tr
        .find("#c-fN")
        .text()
        .trim()
    );
    // last name
    $("#ec-lastName").val(
      $tr
        .find("#c-lN")
        .text()
        .trim()
    );
    // email
    $("#ec-email").val(
      $tr
        .find("#c-email")
        .text()
        .trim()
    );
    // phone number
    $("#ec-phone").val(
      $tr
        .find("#c-phone")
        .text()
        .trim()
    );
    // street addres
    $("#ec-street-address").val(
      $tr
        .find("#c-billingAddress")
        .text()
        .trim()
    );
    // $("#ec-street-address").val(address[0].trim());
    // city
    $("#ec-city").val(
      $tr
        .find("#c-city")
        .text()
        .trim()
    );
    // $("#ec-city").val(address[1].trim());
    // state
    $("#ec-region").val(
      $tr
        .find("#c-state")
        .text()
        .trim()
    );
    // $("#ec-region").val(address[2].trim());
    // zip code
    $("#ec-postal-code").val(
      $tr
        .find("#c-zip-code")
        .text()
        .trim()
    );
    // $("#ec-postal-code").val(address[3].trim());
    // country
    $("#ec-country").val(
      $tr
        .find("#c-country")
        .text()
        .trim()
    );
    // $("#ec-country").val(address[4].trim());

    // show edit modal
    // $customersEditModal.modal("toggle");
  }

  // initialize the customers table
  requestListOfAllCustomers();
});
