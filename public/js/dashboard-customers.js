$(document).ready(() => {
  //let ALL_CUSTOMERS = [];

  const $customersTable = $("#customers-table");
  //const $customersTableBody = $("#customers-table-body");
  //const $customersEditModal = $("#customers-edit-modal");

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

    // ajax to post new customer information
    $.ajax({
      url: "/api/customers",
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

    // ajax to update the customers data
    $.ajax({
      url: "/api/customers/",
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
  function editCustomersInfo($tr) {
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
  }
});
