$(document).ready(() => {
  // customer detail
  const ALL_ORDERS = [];

  const $ordersTableBody = $("#orders-table-body");
  const $customerTableBody = $("#customers-order-table");
  const $orderProductTable = $("#order-product-table");
  const $orderDetailTable = $("#order-detail-table");
  const $modalOrders = $("#orders-modal");
  const $orderSummaryTableBody = $("#order-summary-table");

  $customerTableBody.on("click", (e) => {
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

  $orderProductTable.on("click", (e) => {
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
  $orderDetailTable.on("keyup", "#pd-qty", (e) => {
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
  $orderDetailTable.on("click", ".btn-delete-row", (e) => {
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

  // Adding Search functionalite to Orders Table
  $("#orderSearchInput").on("keyup", function() {
    const value = $(this)
      .val()
      .toLowerCase();
    $("#orders-table-body tr").filter(function() {
      return $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(value) > -1
      );
    });
  });

  //add new order
  $("#modal-add-order-btn").on("click", () => {
    let OrderID = "";
    console.log("hello");
    const dataOrder = {
      total: parseInt($("#od-total").val()),
      discount: parseInt($("#od-discount").val()),
      tax: parseInt($("#od-tax").val()),
      shipping: parseInt($("#od-shipping").val()),
      comment: $("#od-comment")
        .val()
        .trim(),
      CustomerId: parseInt($("#c-id").text()),
    };
    console.log(dataOrder);
    // ajax to post new order
    $.ajax({
      url: "/api/orders",
      method: "POST",
      data: dataOrder,
    }).then((res) => {
      // location.reload();
      console.log(res);
      OrderID = res.id;
      createOrderDetailRecords(OrderID);
    });
  });
  // Generate Body to be sent to Order detail api
  function createOrderDetailRecords(OrderId) {
    const arrayOrderDetail = [];
    $orderDetailTable.find("tr").each(function() {
      const prodId = parseInt(
        $(this)
          .find("#pd-id")
          .text()
      );
      const dataOrderDetail = {
        OrderId: OrderId,
        ProductId: prodId,
        quantity: parseInt($("#pd-qty").text()),
        sub_total: parseInt($("#pd-subTotal").text()),
      };
      arrayOrderDetail.push(dataOrderDetail);
    });
    callOderDetailAPI(arrayOrderDetail);
  }

  // ajax to post new order detail
  function callOderDetailAPI(arrayOrderDetail) {
    const arrayStringfy = JSON.stringify(arrayOrderDetail);
    console.log(arrayStringfy);
    $.ajax({
      url: "/api/orders_detail",
      method: "POST",
      contentType: "application/json",
      data: arrayStringfy,
    })
      .then((res) => {
        console.log("Did It");
        location.reload();
        res.json(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Generate Order Summary
  $ordersTableBody.on("click", ".view-detail-btn", (e) => {
    let orderDetailArray = [];
    const orderDetailsProduct = [];
    const $ele = $(e.target);
    const $trOrder = $ele.parents("tr");
    $("#os-id").text($trOrder.find("#o-number").text());
    $("#os-customer").text($trOrder.find("#o-customer").text());
    $("#os-date").text($trOrder.find("#o-created-at").text());
    $("#os-tax").text($trOrder.find("#o-tax").text());
    $("#os-shipping").text($trOrder.find("#o-shipping").text());
    $("#os-total").text($trOrder.find("#o-total").text());
    $("#os-comment").text($trOrder.find("#o-comment").text());
    // ajax to get data from order_details by order ID
    const OrderId = $trOrder.find("#o-number").text();
    const queryURL = "/api/orders/orderDetail/" + OrderId;
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then((res) => {
      // location.reload();
      orderDetailArray = res;
      console.log(orderDetailArray);
      generateOrderDetailProducts(orderDetailArray);
    });
  });

  // rendering data into the order detail table in Modal for orderdashboard. handlebar  table
  function generateOrderDetailProducts(orderDetailArray) {
    const queryURL = "/api/products";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then((res) => {
      // location.reload();
      console.log(res);
      productsArray = res;
      for (let i = 0; i < orderDetailArray.length; i++) {
        for (let k = 0; k < productsArray.length; k++) {
          if (orderDetailArray[i].ProductId === productsArray[k].id) {
            const $tr = `<tr>
            <td id="odt-id">${orderDetailArray[i].OrderId}</td>
            <td id="odt-name">${productsArray[k].name}</td>
            <td id="odt-model">${productsArray[k].model}</td>
            <td id="pd-image"><img src="${productsArray[k].image}" width="80" height="80"></td> 
            <td id="odt-description">${productsArray[k].description}</td>
            <td id="odt-brand">${productsArray[k].Brand.name}</td>
            <td id="odt-qty">${orderDetailArray[i].quantity}</td>
            <td id="odt-subTotal">${orderDetailArray[i].sub_total}</td>                   
            </td>
              `;
            $orderSummaryTableBody.append($tr);
          }
        }
      }
    });
  }

  $("#closeOrderView").on("click", () => {
    $("#oderSummary").modal("toggle");
    location.reload();
  });

  // Adding Print Function for orders
  $("#printOrder").on("click", () => {
    printDiv();
  });
  function printDiv() {
    const divContents = document.getElementById("orderSummaryBody").innerHTML;
    const a = window.open("", "", "height=800, width=800");
    a.document.write("<html>");
    a.document.write("<body> <h1>Order Summary</h1>");
    a.document.write(divContents);
    a.document.write("</body></html>");
    a.document.close();
    a.print();
  }
});
