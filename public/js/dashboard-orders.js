$(document).ready(() => {
  // customer detail
  let ALL_ORDERS = [];

  const $ordersTableBody = $("#orders-table-body");

  // ajax request for all orders
  function requestListOfAllOrders() {
    $.ajax({
      url: "/api/orders",
      method: "GET"
    })
      .then(res => {
        console.log("get orders list");
        console.log(res);
        ALL_ORDERS = res.map(row => {
          return {
            id: row.id,
            payment: row.Payment,
            customerID: row.CustomerId,
            createAt: row.createdAt
          };
        });
        console.log(ALL_ORDERS);
        renderOrdersTableData();
      })
      .catch(err => {
        console.log(err);
      });
  }

  // render the orders table
  function renderOrdersTableData() {
    $ordersTableBody.empty();
    for (const i in ALL_ORDERS) {
      const row = ALL_ORDERS[i];
      const $tr = `
      <td>${parseInt(i) + 1}</td>
      <td id="o-number">${row.id}</td>
      <td id="o-order-detail">None</td>
      <td id="o-payment-id text-center">${row.payment.id}</td>
      <td id="o-customer-id">${row.customerID}</td>
      <td id="o-created-at">${row.createAt}</td>
      <td id="o-controls"><button type="button" class="btn btn-sm view-detail-btn btn-primary">view details</button></td>
      `;
      $ordersTableBody.append($tr);
    }
  }

  // listens for the click on view details button
  $ordersTableBody.on("click", e => {
    const $ele = $(e.target);
    if (($ele.hasClass = ".view-detail-btn")) {
      const $tr = $ele.parents("tr");

      const customerID = $tr
        .find("#o-customer-id")
        .text()
        .trim();

      const orderID = $tr
        .find("#c-order-number")
        .text()
        .trim();

      const paymentID = $tr
        .find("#c-payment-id")
        .text()
        .trim();

      getCustomerInfo(customerID);
      getOrderDetails(orderID);
      getPaymentDetail(paymentID);
      $("#order-detail-modal").modal("toggle");
    }
  });

  // get customer information
  function getCustomerInfo(customerID) {
    $.ajax({
      url: "/api/customers/" + customerID,
      method: "GET"
    })
      .then(res => {
        renderCustomerDetailsInOrderDetailModal(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // get customer information
  function getPaymentDetail(paymentID) {
    $.ajax({
      url: "/api/payments/" + paymentID,
      method: "GET"
    })
      .then(res => {
        renderPaymentDetailsInOrderDetailModal(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // get order details
  function getOrderDetails(orderID) {
    $.ajax({
      url: "/api/orders_detail/" + orderID,
      method: "GET"
    })
      .then(res => {
        renderOrderDetailsInOrderDetailModal(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // render order details
  function renderOrderDetailsInOrderDetailModal(orderDetails) {
    const order = orderDetails[0];
    const $orderDetailCollapsibleBody = $(".order-detail-collapsible-body");
    const div = `
    <div class="m-3 d-flex">
      <div class="mr-2 text-right">
        <span class="d-block">Order ID :</span>
        <span class="d-block">Product ID :</span>
        <span class="d-block">Date :</span>
        <span class="d-block">Quantity :</span>
        <span class="d-block">Sub total :</span>
      </div>

      <div class="">
        <span class="d-block">${order.OrderId}</span>
        <span class="d-block">${order.ProductId}</span>
        <span class="d-block">${order.createdAt}</span>
        <span class="d-block">${order.quantity}</span>
        <span class="d-block">${order.sub_total}</span>  
      </span>
    </div>`;
    $orderDetailCollapsibleBody.empty();
    $orderDetailCollapsibleBody.append(div);
  }

  // render payment details
  function renderPaymentDetailsInOrderDetailModal(paymentDetails) {
    const $paymentCollapsibleBody = $(".payment-detail-collapsible-body");
    const table = `
    <table class="table">
    <thead>
    <tr>
      <th>id</th>
      <th>amount</th>
      <th>type</th>
      <th>date</th>
      </tr>
    </thead>
    <tbody>
      <tr>
      <td>${paymentDetails[0].id}</td>
      <td>$${paymentDetails[0].amount}</td>
      <td>${paymentDetails[0].type}</td>
      <td>${paymentDetails[0].createdAt}</td>
      </tr>
    </tbody>
   
    </div>`;

    $paymentCollapsibleBody.empty();
    $paymentCollapsibleBody.append(table);
  }

  // render customer details
  function renderCustomerDetailsInOrderDetailModal(customerDetails) {
    const customer = customerDetails[0];
    const $customerInfoCollapsibleBody = $(".customer-info-collapsible-body");
    const table = `
    <table class="m-3 table">
    <thead>
    <tr>
      <th>id</th>
      <th>first name</th>
      <th>last name</th>
      <th>email</th>
      <th>phone</th>
      <th>billing address</th>
      </tr>
    </thead>
    <tbody>
      <tr>
      <td>${customer.id}</td>
      <td>$${customer.first_name}</td>
      <td>${customer.last_name}</td>
      <td>${customer.email}</td>
      <td>${customer.phone}</td>
      <td>${customer.address_billing}, ${customer.city}, ${customer.state}, ${customer.zip_code}, ${customer.country}</td>
      </tr>
    </tbody>
   
    </div>`;

    $customerInfoCollapsibleBody.empty();
    $customerInfoCollapsibleBody.append(table);
  }

  // initialize the orders table
  requestListOfAllOrders();
});

// dummy data
