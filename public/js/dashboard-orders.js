$(document).ready(() => {
  // customer detail
  const ALL_ORDERS = [];

  const $ordersTableBody = $("#orders-table-body");
  const $customerTableBody = $("#customers-table");
  const $orderProductTable = $("#order-product-table");
  const $orderDetailTable = $("#order-detail-table");
  const $modalOrders = $("#orders-modal");

  $customerTableBody.on("click", e => {
    const $ele = $(e.target);
    const $tr = $ele.parents("tr");
    $("#c-id").text($tr.find("#c-id").text());
    $("#c-firstName").text($tr.find("#c-fN").text());
    $("#c-lastName").text($tr.find("#c-lN").text());
    $("#c-email").text($tr.find("#c-email").text());
    $("#c-phone").text($tr.find("#c-phone").text());
    $("#c-address").text(
      $tr.find("#c-billingAddress").text() +
        ", " +
        $tr.find("#c-city").text() +
        ", " +
        $tr.find("#c-state").text() +
        " " +
        $tr.find("#c-zip-code ").text() +
        ", " +
        $tr.find("#c-country").text()
    );
    $("#customer-list-modal").modal("toggle");
  });

  $orderProductTable.on("click", e => {
    const $ele = $(e.target);
    const $trproduct = $ele.parents("tr");

    // const $tr = `<td id="pd-id">Hello world</td>`;
    console.log($trproduct.find(".p-name").text());
    const $tr = `<tr>
      <td id="pd-id">${$trproduct.find(".p-id").text()}</td>
      <td id="pd-name">${$trproduct.find(".p-name").text()}</td>
      <td id="pd-msrp">${$trproduct.find(".p-msrp").text()}</td>
      <td id="pd-model">${$trproduct.find(".p-model").text()}</td>
      <td id="pd-image"><img src="${$trproduct
    .find("#img-buffer")
    .attr("src")}" width="80" height="80"></td>
      <td id="pd-description">${$trproduct.find(".p-description").text()}</td>
      <td id="pd-brand">${$trproduct.find(".p-brand").text()}</td>
      <td id="pd-qty" contenteditable="true">1</td>
      <td id="pd-subTotal">${$trproduct.find(".p-msrp").text()}</td>
      <td id="pd-stock" hidden>${$trproduct.find(".p-stock").text()}</td>
      <td>
      <span class="table-remove">
          <button type="button"
          class="  btn btn-delete-row  btn-danger btn-rounded btn-md my-0"><i class="btn-delete-row L2 fas fa-times"></i></button>
      </span>
      </td>
      `;
    $orderDetailTable.append($tr);
    calculateTotal();
    $("#product-list-modal").modal("toggle");
  });
  // Calculating subTotal value
  $orderDetailTable.on("keyup", "#pd-qty", e => {
    const $ele = $(e.target);
    const $trproduct = $ele.parents("tr");
    const qty = parseInt($trproduct.find("#pd-qty").text());
    const stock = parseInt($trproduct.find("#pd-stock").text());
    const price = parseInt($trproduct.find("#pd-msrp").text());
    if ($trproduct.find("#pd-qty").text() !== "") {
      if (qty <= stock && qty > 0) {
        $trproduct.find("#pd-subTotal").text(qty * price);
      } else {
        alert("Stock is not enough");
      }
    } else {
      if ($trproduct.find("#pd-subTotal").text() === "") {
        $trproduct.find("#pd-qty").text(1);
      } else {
        alert("quantity should be entered");
      }
    }
    calculateTotal();
  });
  // Delete row from orders detail table
  $orderDetailTable.on("click", ".btn-delete-row", e => {
    const $ele = $(e.target);
    const $trproduct = $ele.parents("tr");
    $trproduct.detach();
    calculateTotal();
  });

  // calculate total order
  function calculateTotal() {
    let total = 0;
    let tax = 0;
    let discount = 0;
    let shipping = 0;
    $orderDetailTable.find("tr").each(function() {
      const subtotal = parseInt(
        $(this)
          .find("#pd-subTotal")
          .text()
      );
      total = total + subtotal;
    });
    if (isNaN(parseInt($("#taxInput").val()))) {
      tax = 0;
    } else {
      tax = (total * parseInt($("#taxInput").val())) / 100;
    }
    if (isNaN(parseInt($("#discountInput").val()))) {
      discount = 0;
    } else {
      discount = (total * parseInt($("#discountInput").val())) / 100;
    }
    if (isNaN(parseInt($("#od-shipping").val()))) {
      shipping = 0;
    } else {
      shipping = parseInt($("#od-shipping").val());
    }
    total = total - discount + tax + shipping;
    $("#od-discount").val(discount.toFixed(2));
    $("#od-tax").val(tax.toFixed(2));
    $("#od-total").val(total.toFixed(2));
  }

  $("#discountInput").on("keyup", () => {
    let temp = $("#discountInput").val();
    if ($("#discountInput").val() !== "") {
      calculateTotal();
      temp = $("#discountInput").val();
    } else {
      calculateTotal();
      $("#od-discount").val("0");
    }
  });

  $("#taxInput").on("keyup", () => {
    let temp = $("#taxInput").val();
    if ($("#taxInput").val() !== "") {
      calculateTotal();
      temp = $("#taxInput").val();
    } else {
      calculateTotal();
      $("#od-tax").val("0");
    }
  });

  $("#od-shipping").on("keyup", () => {
    if ($("#od-shipping").val() !== "") {
      calculateTotal();
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
  //requestListOfAllOrders();

  //add new order
  $("#modal-add-order-btn").on("click", () => {
    console.log("hello");
    const dataOrder = {
      total: parseInt($("#od-total").val()),
      discount: parseInt($("#od-discount").val()),
      tax: parseInt($("#od-tax").val()),
      shipping: parseInt($("#od-shipping").val()),
      comment: $("#od-comment")
        .val()
        .trim(),
      CustomerId: parseInt($("#c-id").text())
    };
    console.log(dataOrder);
    // ajax to post new order
    $.ajax({
      url: "/api/orders",
      method: "POST",
      data: dataOrder
    }).then(res => {
      //location.reload();
      const arrayOrderDetail = [];
      $orderDetailTable.find("tr").each(function() {
        const prodId = parseInt(
          $(this)
            .find("#pd-id")
            .text()
        );
        const dataOrderDetail = {
          OrderId: res.body.OrderId,
          ProductID: prodId,
          quantity: parseInt($("#pd-qty").val()),
          sub_total: parseInt($("#pd-subTotal").val())
        };
        arrayOrderDetail.push(dataOrderDetail);
      });
      console.log(arrayOrderDetail);
      // ajax to post new order detail
      $.ajax({
        url: "/api/orders_detail",
        method: "POST",
        data: arrayOrderDetail
      })
        .then(res => {
          location.reload();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
});

// dummy data
