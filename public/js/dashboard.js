// tables
const $productsTable = $("#products-table");
const $brandsTable = $("#brands-table");
const $categoryTable = $("#category-table");
const $productTypeTable = $("#product-type-table");
const $blogPostTable = $("#blog-posts-table-body");
// image input group for image upload in modals
let imageUploaded = false;
// const $imageInputProducts = $("#image-input-products-s3");
const $imageInputEditProducts = $("#image-input-edit-products-s3");
const $imageInputProductType = $("#image-input-product-type");
const $imageInputEditProductType = $("#image-input-edit-product-type");
let imageURL = "";
//image input for S3 bucket
const $imageInputProductS3 = $("#image-input-products-s3");
// const $imageUploadButtonS3 = $("#uploadImageS3");

/******* Upload New Product image to GCP bucket berofe data is sent to database ********/
$("#uploadImageS3").on("click", () => {
  console.log("hit");
  const fileInput = $imageInputProductS3;
  console.log(fileInput[0].files[0]);
  const data = new FormData();
  data.append("image", fileInput[0].files[0]);
  // send image file to endpoint with the postImage function
  // ...
  console.log(data);
  console.log(data.file);
  const postImage = async () => {
    try {
      const res = await fetch("/api/image-upload", {
        mode: "cors",
        method: "POST",
        body: data
      });
      // if (!res.ok) throw new Error(res.statusText);
      const postResponse = await res.json();
      imageURL = postResponse.Location;
      imageUploaded = true;
      console.log(postResponse.Location);

      //  Creates a preview in products modal
      // Rendering Image in <img> element after it has been uploaded
      const $previewDiv = $("#image-preview-products");
      const $previewImage = $("<img />", {
        class: "img-fluid image-preview",
        style: "max-height: 100px;",
        src: imageURL,
        alt: "no preview available"
      });
      $previewDiv.empty();
      $previewDiv.append($previewImage);

      return postResponse.Location;
    } catch (error) {
      console.log(error);
    }
  };
  postImage();
});

//Upload Image whed editing product

$("#uploadEditImageS3").on("click", () => {
  const fileInput = $imageInputEditProducts;
  console.log(fileInput[0].files[0]);
  const data = new FormData();
  data.append("image", fileInput[0].files[0]);
  // send image file to endpoint with the postImage function
  // ...
  console.log(data);
  console.log(data.file);
  const postImage = async () => {
    try {
      const res = await fetch("/api/image-upload", {
        mode: "cors",
        method: "POST",
        body: data
      });
      // if (!res.ok) throw new Error(res.statusText);
      const postResponse = await res.json();
      imageURL = postResponse.Location;
      imageUploaded = true;
      console.log(postResponse.Location);

      //  Creates a preview in products modal
      // Rendering Image in <img> element after it has been uploaded
      const $previewDiv = $("#image-preview-edit-products");
      const $previewImage = $("<img />", {
        class: "img-fluid image-preview",
        style: "max-height: 100px;",
        src: imageURL,
        alt: "no preview available"
      });
      $previewDiv.empty();
      $previewDiv.append($previewImage);
      $("#uploadEditImageS3").prop("disabled", true);
      $("#edit-save-product-btn").prop("disabled", false);
      return postResponse.Location;
    } catch (error) {
      console.log(error);
    }
  };
  postImage();
});

// event listender for product type image edit button on product_type table
// products modal - creates a preview
// $imageInputProducts.on("change", e => {
//   const $previewDiv = $("#image-preview-products");
//   // const file = e.target.files[0];
//   const $previewImage = $("<img />", {
//     class: "img-fluid image-preview",
//     style: "max-height: 100px;",
//     src: imageURL,
//     alt: "no preview available"
//   });
//   $previewDiv.empty();
//   $previewDiv.append($previewImage);
// });

/******* CHECK PREVIEW ON CHANGE FUNCTIONS TO ENSURE SRC FOR IMAGES ARE POINTING TO GCP BUCKET  ********/

// edit products modal - creates a preview
$imageInputEditProducts.on("change", e => {
  const $previewDiv = $("#image-preview-edit-products");
  const file = e.target.files[0];
  const $previewImage = $("<img />", {
    class: "img-fluid image-preview",
    style: "max-height: 100px;",
    src: URL.createObjectURL(file),
    alt: "no preview available"
  });
  $previewDiv.empty();
  $previewDiv.append($previewImage);
});

// product type modal - creates a preview
$imageInputProductType.on("change", e => {
  const $previewDiv = $("#image-preview-product-type");
  const file = e.target.files[0];
  let image;
  if (file) {
    image = URL.createObjectURL(file);
  }
  const $previewImage = $("<img />", {
    class: "img-fluid image-preview",
    style: "max-height: 100px;",
    src: image
  });
  $previewDiv.empty();
  $previewDiv.append($previewImage);
});

// product type modal - creates a preview
$imageInputEditProductType.on("change", e => {
  const $previewDiv = $("#image-preview-edit-product-type");
  const file = e.target.files[0];
  let image;
  if (file) {
    image = URL.createObjectURL(file);
  }
  const $previewImage = $("<img />", {
    class: "img-fluid image-preview",
    style: "max-height: 100px;",
    src: image
  });
  $previewDiv.empty();
  $previewDiv.append($previewImage);
});

/** event listener for modal's add button */

// add new products
$("#add-new-product-btn").on("click", () => {
  const productName = $("#p-name")
    .val()
    .trim();
  const price = $("#price")
    .val()
    .trim();
  const msrp = $("#msrp")
    .val()
    .trim();
  const stock = $("#stock")
    .val()
    .trim();
  const brandID = $("#brand").val();
  const categoryID = $("#categoryId").val();
  const model = $("#model")
    .val()
    .trim();
  const productTypeID = $("#productTypeId").val();
  const description = $("#description")
    .val()
    .trim();

  const files = $("#image-input-products-s3")[0].files;
  // const files = $("#image-input-products")[0].files;

  const productData = {
    name: productName,
    price: price,
    msrp: msrp,
    model: model,
    stock: stock,
    description: description,
    BrandId: brandID,
    image: imageURL,
    CategoryId: categoryID,
    ProductTypeId: productTypeID
  };
  console.log(productData);
  if (files.length > 0 && imageUploaded === true) {
    fetch("/api/products/", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productData)
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data);
        location.reload();
      })
      .catch(error => {
        console.error("Error:", error);
      });
  } else {
    // Message rendered if image has not been uploaded.
    const $previewDiv = $("#image-preview-products");
    const $previewImage = $("<p>");
    $previewImage.css({
      fontSize: ".9em",
      lineHeight: "1.4em",
      background: "#d6e2ee",
      border: "1px solid #e5e3d9!important",
      borderRadius: "16px",
      paddingTop: "2px",
      paddingBottom: "2px",
      textAlign: "center",
      color: "red"
    });
    $previewImage.text("Image for new product is required");
    $previewDiv.empty();
    $previewDiv.append($previewImage);
  }

  // form data
  // const fd = new FormData();
  // fd.append("price", price);
  // fd.append("msrp", msrp);
  // fd.append("stock", stock);
  // fd.append("BrandId", brandID);
  // fd.append("CategoryId", categoryID);
  // fd.append("model", model);
  // fd.append("productTypeId", productTypeID);
  // fd.append("name", productName);
  // fd.append("description", description);
  // // fd.append("image", files[0]);
  // fd.append("image", imageURL);

  // if (files.length > 0) {
  //   $.ajax({
  //     url: "api/products",
  //     type: "POST",
  //     data: fd,
  //     contentType: false,
  //     processData: false
  //   }).then(() => {
  //     location.reload();
  //   });
  // }
});

// add new brands
$("#add-new-brand-btn").on("click", () => {
  const brandName = $("#brand-name").val();
  if (brandName) {
    $.ajax({
      url: "/api/brands/",
      method: "POST",
      data: { name: brandName }
    }).then(() => {
      location.reload();
    });
  }
});

// add new category
$("#add-new-category-btn").on("click", () => {
  const categoryName = $("#category-name").val();
  if (categoryName) {
    $.ajax({
      url: "/api/categories",
      method: "POST",
      data: { name: categoryName }
    }).then(() => {
      location.reload();
    });
  }
});

// add new product type
$("#add-new-product-type-btn").on("click", () => {
  const productTypeName = $("#product-type-name").val();
  const files = $("#image-input-product-type")[0].files;
  const fd = new FormData();
  fd.append("name", productTypeName);
  fd.append("image", files[0]);
  if (productTypeName && files.length > 0) {
    $.ajax({
      url: "api/products_type",
      type: "POST",
      data: fd,
      contentType: false,
      processData: false
    }).then(() => {
      location.reload();
    });
  }
});

$(".product-image").on("click", function() {
  // column
  const $td = $(this);
  // find the image tag
  const $img = $(this)
    .find("img")
    .attr("style", "max-height: 50px;");
  // create input element
  const $input = $("<input />", {
    id: "products-img-input",
    type: "file",
    style: "height: 1px; width: 1px;"
  });
  // append if no other input element
  $td.empty();
  $td.append($img);
  $td.append($input);
  // stop click propagation
  // there is a click event listener on the parent column
  $input.on("click", e => {
    e.stopPropagation();
  });
  // when the new image is selected
  $input.on("change", e => {
    file = e.target.files[0];
    const imgSRC = URL.createObjectURL(file);
    $img.attr("src", imgSRC);
  });
  // trigger the input click event
  $input.trigger("click");
});

// save edited product type info
$("#edit-product-type-btn").on("click", () => {
  const ptId = $("#id-input-edit-product-type")
    .val()
    .trim();
  const ptName = $("#name-input-edit-product-type")
    .val()
    .trim();
  const ptImage = $("#image-input-edit-product-type")[0].files[0];
  // check if picture has been uploaded
  // if no picture has been uploaded then
  // save the data using different api.
  let queryURL = "/api/products_type";
  if (!ptImage) {
    queryURL = "/api/noImg/products_type";
  }
  const fd = new FormData();
  fd.append("id", ptId);
  fd.append("name", ptName);
  fd.append("image", ptImage);
  $.ajax({
    url: queryURL,
    type: "PUT",
    data: fd,
    contentType: false,
    processData: false
  }).then(() => {
    location.reload();
  });
});

// Checking image has been choosen
$("#image-input-edit-products-s3").on("change", () => {
  $("#uploadEditImageS3").prop("disabled", false);
  $("#edit-save-product-btn").prop("disabled", true);
});

// save edited product type info
$("#edit-save-product-btn").on("click", () => {
  const productId = $("#ep-id").val();
  const productName = $("#ep-name")
    .val()
    .trim();
  const price = $("#ep-price")
    .val()
    .trim();
  const msrp = $("#ep-msrp")
    .val()
    .trim();
  const stock = $("#ep-stock")
    .val()
    .trim();
  const brandID = $("#ep-brand").val();
  const categoryID = $("#ep-categoryId").val();
  const model = $("#ep-model")
    .val()
    .trim();
  const productTypeID = $("#ep-productTypeId").val();
  const description = $("#ep-description")
    .val()
    .trim();

  // const files = $("#image-input-products-s3")[0].files;
  // const files = $("#image-input-products")[0].files;

  const productData = {
    id: productId,
    name: productName,
    price: price,
    msrp: msrp,
    model: model,
    stock: stock,
    description: description,
    BrandId: brandID,
    CategoryId: categoryID,
    ProductTypeId: productTypeID
  };
  console.log(productData);

  const pImage = $("#image-input-edit-products-s3")[0].files[0];
  console.log(pImage);
  // check if picture has been uploaded
  // if no picture has been uploaded then
  // save the data using different api.
  let queryURL = "/api/products";
  if (!pImage) {
    queryURL = "/api/noImg/products";
  } else {
    productData.image = imageURL;
    console.log(productData);
  }

  fetch(queryURL, {
    method: "PUT", // or 'PUT'
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(productData)
  })
    .then(data => {
      console.log("Success:", data);
      location.reload();
    })
    .catch(error => {
      console.error("Error:", error);
    });

  // const $form = $("#edit-modal-product-form");
  // const fd = new FormData($form[0]);
  // console.log(fd);

  // fetch(queryURL, {
  //   method: "PUT", // or 'PUT'
  //   body: fd
  // })
  //   .then(data => {
  //     console.log("Success:", data);
  //     // location.reload();
  //   })
  //   .catch(error => {
  //     console.error("Error:", error);
  //   });

  // $.ajax({
  //   url: queryURL,
  //   type: "PUT",
  //   data: fd,
  //   contentType: false,
  //   processData: false
  // }).then(() => {
  //   // location.reload();
  // });
});

/** table event listener - listens for save or delete button */

// products table
$productsTable.on("click", e => {
  const $ele = $(e.target);
  const $tr = $ele.parents("tr");

  // save
  if ($ele.hasClass("btn-edit-row")) {
    // populate prodcut's edit modal with row data
    populateProductEditModal($tr);
  } else if ($ele.hasClass("btn-delete-row")) {
    // delete
    const pId = $tr.find(".p-id").text();
    $.ajax({
      url: "/api/products/" + pId,
      method: "DELETE"
    }).then(() => {
      $tr.detach();
    });
  }
});

// brands table
$brandsTable.on("click", e => {
  const $ele = $(e.target);
  const $tr = $ele.parents("tr");

  if ($ele.hasClass("btn-save-row")) {
    const record = {
      id: $tr
        .find(".b-id")
        .text()
        .trim(),
      name: $tr
        .find(".b-name")
        .text()
        .trim()
    };
    // update record/row
    $.ajax({
      url: "/api/brands/",
      method: "PUT",
      data: record
    }).then(() => {
      location.reload();
    });
  } else if ($ele.hasClass("btn-delete-row")) {
    const bId = $tr.find(".b-id").text();
    $.ajax({
      url: "/api/brands/" + bId,
      method: "DELETE"
    }).then(() => {
      location.reload();
    });
  }
});

// product type table
$categoryTable.on("click", e => {
  const $ele = $(e.target);
  const $tr = $ele.parents("tr");

  if ($ele.hasClass("btn-save-row")) {
    const record = {
      id: $tr
        .find(".c-id")
        .text()
        .trim(),
      name: $tr
        .find(".c-name")
        .text()
        .trim()
    };
    // update record/row
    $.ajax({
      url: "/api/categories",
      method: "PUT",
      data: record
    }).then(() => {
      location.reload();
    });
  } else if ($ele.hasClass("btn-delete-row")) {
    const cId = $tr.find(".c-id").text();
    $.ajax({
      url: "/api/categories/" + cId,
      method: "DELETE"
    }).then(() => {
      $tr.detach();
    });
  }
});

// category table
$productTypeTable.on("click", e => {
  const $ele = $(e.target);
  const $tr = $ele.parents("tr");

  if ($ele.hasClass("btn-save-row")) {
    console.log("clicked on edit save modal");
    const id = $tr
      .find(".pt-id")
      .text()
      .trim();
    const name = $tr
      .find(".pt-name")
      .text()
      .trim();
    const imageSRC = $tr
      .find(".pt-image")
      .find("img")
      .attr("src");
    // populate the row value into the modal
    $("#id-input-edit-product-type").val(id);
    const $previewImage = $("<img />", {
      class: "img-fluid image-preview",
      style: "max-height: 100px;",
      src: imageSRC
    });
    $("#image-preview-edit-product-type").empty();
    $("#image-preview-edit-product-type").append($previewImage);
    $("#name-input-edit-product-type").val(name);
  } else if ($ele.hasClass("btn-delete-row")) {
    const ptId = $tr.find(".pt-id").text();
    $.ajax({
      url: "/api/products_type/" + ptId,
      method: "DELETE"
    }).then(() => {
      $tr.detach();
    });
  }
});

// blog-posts table
$blogPostTable.on("click", e => {
  const $ele = $(e.target);
  const $tr = $ele.parents("tr");
  // save
  if ($ele.hasClass("btn-edit-row")) {
    console.log("clicked on edit blog-post");
    const id = $tr
      .find("#bp-id")
      .text()
      .trim();
    const title = $tr
      .find("#bp-title")
      .text()
      .trim();
    const author = $tr
      .find("#bp-author")
      .text()
      .trim();
    const description = $tr
      .find("#bp-description")
      .text()
      .trim();
    // populate the row value into the modal
    console.log(id, title, author, description);
    $("#id-input-edit-blog-post").val(id);
    $("#title-input-edit-blog-post").val(title);
    $("#author-input-edit-blog-post").val(author);
    $("#description-input-edit-blog-post").val(description);
  } else if ($ele.hasClass("btn-delete-row")) {
    // delete
    const bpId = $tr.find("#bp-id").text();
    console.log(bpId);
    $.ajax({
      url: "/api/blogs/" + bpId,
      method: "DELETE"
    }).then(() => {
      $tr.detach();
    });
  }
});

// populates product's edit modal with selected row's data
function populateProductEditModal($tr) {
  const $form = $("#edit-modal-product-form");
  const productID = $tr
    .find(".p-id")
    .text()
    .trim();
  const productName = $tr
    .find(".p-name")
    .text()
    .trim();
  const price = $tr
    .find(".p-price")
    .text()
    .trim();
  const msrp = $tr
    .find(".p-msrp")
    .text()
    .trim();
  const stock = $tr
    .find(".p-stock")
    .text()
    .trim();
  const model = $tr
    .find(".p-model")
    .text()
    .trim();
  const imageSRC = $tr.find("#img-buffer").attr("src");
  const description = $tr
    .find(".p-description")
    .text()
    .trim();
  const brandID = $tr.find(".p-brand").attr("data-value");
  const categoryID = $tr.find(".p-category").attr("data-value");
  const productTypeID = $tr.find(".p-type").attr("data-value");

  $form.find("input[name='id']").val(productID);
  $form.find("input[name='name']").val(productName);
  $form.find("input[name='price']").val(price);
  $form.find("input[name='msrp']").val(msrp);
  $form.find("input[name='model']").val(model);
  $form.find("textarea[name='description']").val(description);
  $form.find("input[name='stock']").val(stock);
  $("#image-preview-edit-products").empty();
  const img = $("<img>", {
    src: imageSRC,
    style: "width: 100px; height: 100px",
    alt: "no product image"
  });

  if (imageSRC) {    
    $("#image-preview-edit-products").append(img);
  }

  $("#ep-brand option").each(function() {
    if ($(this).val() === brandID) {
      $(this).prop("selected", true);
    }
  });

  $("#ep-productTypeId option").each(function() {
    if ($(this).val() === productTypeID) {
      $(this).prop("selected", true);
    }
  });

  $("#ep-categoryId option").each(function() {
    if ($(this).val() === categoryID) {
      $(this).prop("selected", true);
    }
  });
}
