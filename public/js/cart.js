// check if local storage is available
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

// add to cart
function addToCart(item) {
  // get the localStorage object from window object
  const localStorage = window.localStorage;

  // check if there is previously saved data
  if (localStorage.getItem("cart")) {
    const cart = JSON.parse(localStorage.getItem("cart"));

    if (cart.hasOwnProperty(item.id)) {
      // data already present
      cart[item.id].quantity =
        parseInt(cart[item.id].quantity) + parseInt(item.quantity);
    } else {
      // save new data
      cart[item.id] = item;
    }
    // save the updated data inside localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
  } else {
    // when there is no previously saved data
    const data = {};
    data[item.id] = item;
    localStorage.setItem("cart", JSON.stringify(data));
    console.log(data);
  }
}

// remove from cart
function removeFromCart(id) {
  // check for local storage
  if (!storageAvailable("localStorage")) {
    // Too bad, no localStorage for us
    return false;
  }

  // check if there is saved data
  if (localStorage.getItem("cart")) {
    // parse the data into javscript object then return it
    const cart = JSON.parse(localStorage.getItem("cart"));

    if (Object.keys(cart).length !== 0) {
      if (cart.hasOwnProperty(id)) {
        const newCart = {};
        for (const prop in cart) {
          console.log(cart[prop].id);
          if (parseInt(cart[prop].id) !== parseInt(id)) {
            console.log("---");
            console.log(cart[prop].id);
            newCart[prop] = cart[prop];
          }
        }

        // if cart is empty delete cart
        if (Object.keys(newCart).length === 0) {
          localStorage.removeItem("cart");
        } else {
          // add to storage
          console.log(newCart);
          localStorage.setItem("cart", JSON.stringify(newCart));
        }
        return true;
      }
    }
    return false;
  }
}

// read from cart
function readFromCart() {
  let cart = {};
  // check if there is saved data
  if (localStorage.getItem("cart")) {
    // parse the data into javscript object then return it
    cart = JSON.parse(localStorage.getItem("cart"));
  } else {
    // debug
    console.log("There is no data inside local storage");
    cart = {};
  }

  return cart;
}

// add to cart event listener
$("#add-to-cart-btn").on("click", function() {
  // get form
  const $form = $(this).parent("form");

  const productID = $form.find("input[name='id']").val();
  const productIMG = $form.find("input[name='image']").val();
  const productQTY = $form.find("select[name='quantity']").val();
  const productNAME = $form.find("input[name='name']").val();
  const productPrice = $form.find("input[name='price']").val();
  console.log("-------------------");
  console.log("product details");
  console.log("-------------------");
  console.log("id: " + productID);
  console.log("img: " + productIMG);
  console.log("qty: " + productQTY);
  console.log("name: " + productNAME);
  console.log("price: " + productPrice);

  // add to cart
  addToCart({
    id: productID,
    img: productIMG,
    name: productNAME,
    quantity: productQTY,
    price: productPrice
  });

  const $msg = $(".add-to-cart-msg");
  $msg.empty();
  $msg.show();
  const success =
    '<div class="alert alert-success text-center" role="alert">added to cart</div>';
  $msg.append(success);
  $msg.delay(1000).hide(400);
});

// remove from cart
$("#cart-table").on("click", e => {
  const $ele = $(e.target);
  if ($ele.attr("id") === "cart-remove") {
    const $tr = $ele.parents("tr");
    const pID = $tr
      .find("#cart-p-id")
      .text()
      .trim();
    // remove form cart
    removeFromCart(pID);
    populateCheckout();
  }
});

// cart submit
$("#checkout-customer-info").on("submit", async e => {
  e.preventDefault();

  // if cart is empty
  const yourCart = readFromCart();
  if (Object.keys(yourCart).length === 0) {
    alert("Cart Empty");
    return;
  }

  const total = $("#order-total")
    .text()
    .trim();
  const discount = 0;
  const tax = $("#order-tax")
    .text()
    .trim();
  const shipping = $("#order-shipping")
    .text()
    .trim();

  const fd = new FormData(e.target);
  const customerData = fd;
  let customerID;
  let orderID;

  // check if customer exists
  const customerExists = await $.ajax({
    url: "/api/find/customer?email=" + email.value,
    type: "GET"
  });

  // customer id
  if (customerExists) {
    customerID = customerExists.id;
  } else {
    const customer = await $.ajax({
      url: "/api/customers",
      type: "POST",
      data: customerData,
      contentType: false,
      processData: false
    });

    customerID = customer.id;
  }

  fd.append("total", total);
  fd.append("discount", discount);
  fd.append("shipping", shipping);
  fd.append("tax", tax);
  fd.append("CustomerId", customerID);

  const order = await $.ajax({
    url: "/api/orders",
    type: "POST",
    data: fd,
    contentType: false,
    processData: false
  });

  console.log(order);

  if (order) {
    orderID = order.id;
  } else {
    return;
  }

  const cart = readFromCart();
  if (cart) {
    for (const prop in cart) {
      const p = cart[prop];
      const od = {
        OrderId: orderID,
        ProductId: p.id,
        quantity: p.quantity,
        sub_total: parseInt(p.quantity) * parseInt(p.price)
      };
      console.log(od);
      const orderDetail = await $.ajax({
        url: "/api/orders_detail",
        type: "POST",
        data: od
      });

      if (!orderDetail) {
        console.log(orderDetail);
        alert("Failed to create order");
        return;
      }
      renderOrderDetails({
        id: order.id,
        date: order.createdAt,
        total: order.total
      });

      localStorage.removeItem("cart");
      $("#checkout-customer-info")[0].reset();
      $("#collapseThree").collapse("toggle");
    }
  }
});

// populate checkout
function populateCheckout() {
  const cart = readFromCart();
  $("#cart-body").empty();

  if (Object.keys(cart).length !== 0) {
    let c = 0;
    for (const prop in cart) {
      c++;
      const tr = `
      <tr>
        <td>${c}</td>
        <td>
          <img id="cart-p-image" style="width: 50px;" src="${cart[prop].img}" />
          <span id="cart-p-name">${cart[prop].name}</span>
        </td>
        <td id="cart-p-id">${cart[prop].id}</td>
        <td id="cart-p-quantity"> 
          ${cart[prop].quantity}
        </td>
        <td id="cart-p-price">
            ${cart[prop].price}
        </td>
        <td id="cart-p-total">${cart[prop].quantity * cart[prop].price}</td>
        <td>
          <button class="btn btn-danger text-white" type="button" id="cart-remove">remove</button>
        </td>
      </tr>
      `;

      $("#cart-body").append(tr);
    }
  }

  calculateSubtotal();
}

// calculate subtotal
function calculateSubtotal() {
  const cart = readFromCart();
  let subTotal = 0;
  let subTotalInfo = {};
  if (Object.keys(cart).length !== 0) {
    for (const prop in cart) {
      const item = cart[prop];
      subTotal += parseInt(item.price) * parseInt(item.quantity);
    }
    subTotalInfo = {
      subTotal: subTotal,
      tax: subTotal * 0.06,
      shipping: 10,
      total: subTotal + subTotal * 0.06
    };
  }

  populateSubtotal(subTotalInfo);
}

// populate subtotal
function populateSubtotal(data) {
  console.log(data);
  const $subtotal = $(".sub-total");
  const $subtotalBody = $subtotal.find(".card-body");
  const body = `
  <p class="clearfix">
    <span class="float-left">Sub Total</span>
    <span id="order-subtotal" class="float-right">${data.subTotal}</span>
  </p>
  <p class="clearfix">
    <span class="float-left">Tax (6%)</span>
    <span id="order-tax" class="float-right">${data.tax}</span>
  </p>
  <p class="clearfix">
    <span class="float-left">Shipping</span>
    <span id="order-shipping" class="float-right">${data.shipping}</span>
  </p>
  <p class="clearfix border-top pt-2">
    <span class="float-left">total</span>
    <span id="order-total" class="float-right">${data.total}</span>
  </p>
  `;

  $subtotalBody.empty();

  if (Object.keys(data).length !== 0) {
    $subtotalBody.append(body);
  }
}


// render order details
function renderOrderDetails(oD) {
  const $orderDetail = $(".order-detail-body");
  const details = `
  <p>Order ID: ${oD.id}</p>
  <p>Order Date: ${oD.date}</p>
  <p>Order Total: ${oD.total}</p>
  `;
  $orderDetail.find(".card-body").empty();
  $orderDetail.find(".card-body").append(details);
}

populateCheckout();
