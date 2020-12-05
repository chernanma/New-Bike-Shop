$(document).ready(() => {
  // customer detail
  let orderId = 0;
  let amount = 0;
  const $ordersTableBody = $("#orders-payment-detail-table");
  const $customerTableBody = $("#customers-payment-table");
  const $paymentsTable = $("#payments-table-body");

  $customerTableBody.on("click", e => {
    $ordersTableBody.empty();
    const $ele = $(e.target);
    const $tr = $ele.parents("tr");
    $("#cp-id").text($tr.find("#cp-id").text());
    $("#cp-firstName").text($tr.find("#cp-fN").text());
    $("#cp-lastName").text($tr.find("#cp-lN").text());
    $("#cp-email").text($tr.find("#cp-email").text());
    $("#cp-phone").text($tr.find("#cp-phone").text());
    $("#cp-address").text(
      $tr.find("#cp-billingAddress").text() +
        ", " +
        $tr.find("#cp-city").text() +
        ", " +
        $tr.find("#cp-state").text() +
        " " +
        $tr.find("#cp-zip-code ").text() +
        ", " +
        $tr.find("#cp-country").text()
    );
    $("#customer-payment-list-modal").modal("toggle");

    const customerID = $tr.find("#cp-id").text();
    $.ajax({
      url: "/api/orders/customer/" + customerID,
      method: "GET"
    })
      .then(res => {
        generateTableOrder(res);
      })
      .catch(err => {
        console.log(err);
      });
  });
  function generateTableOrder(ordersCustomer) {
    console.log(ordersCustomer);
    if (ordersCustomer.length !== 0) {
      $.each(ordersCustomer, (index, order) => {
        const $tr = `<tr>
        <td id="op-id">${order.id}</td>
        <td id="op-total">${order.total}</td>
        <td id="op-discount">${order.discount}</td>
        <td id="op-tax">${order.tax}</td>
        <td id="op-shipping">${order.shipping}</td>
        <td id="op-comment">${order.comment}</td>
        <td id="op-createAt">${order.updatedAt}</td>
        </tr>
        `;
        $ordersTableBody.append($tr);
      });
    } else {
      $ordersTableBody.empty();
    }
  }
  $ordersTableBody.on("click", e => {
    const $ele = $(e.target);
    const $tr = $ele.parents("tr");
    orderId = parseInt($tr.find("#op-id").text());
    amount = parseInt($tr.find("#op-total").text());
    console.log(orderId + " " + amount);
    $tr
      .addClass("bg-success")
      .siblings()
      .removeClass("bg-success");
  });

  // add new payment
  $("#modal-add-payment-btn").on("click", () => {
    const dataPayment = {
      amount: amount,
      type: $("#inputGroupPayment")
        .val()
        .trim(),
      OrderId: orderId
    };
    if (amount !== 0) {
      // ajax to post new payment information
      $.ajax({
        url: "/api/payments",
        method: "POST",
        data: dataPayment
      })
        .then(res => {
          $.ajax({
            url: "/api/orders",
            method: "PUT",
            data: { id: orderId, payment_status: "Processing" }
          })
            .then(res => {
              location.reload();
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      $("#validateMessageModalPayment")
        .show()
        .text("Select an order !");
    }
  });

  $("#paymentSearchInput").on("keyup", function() {
    const value = $(this)
      .val()
      .toLowerCase();
    $("#payments-table-body tr").filter(function() {
      return $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(value) > -1
      );
    });
  });

  $paymentsTable.on("click", e => {
    const $ele = $(e.target);
    const $tr = $ele.parents("tr");
    // Changing payment status of the order selected
    if ($ele.hasClass("btn-makePayment-row")) {
      const oId = parseInt($tr.find("#py-orderId").text());
      $.ajax({
        url: "/api/orders",
        method: "PUT",
        data: { id: oId, payment_status: "Paid" }
      })
        .then(res => {
          $tr.detach();
          location.reload();
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
  // Handlebars.registerHelper("ifvalue", function(conditional, options) {
  //   if (conditional === options.hash.equals) {
  //     return options.fn(this);
  //   }
  //   return options.inverse(this);
  // });
});
