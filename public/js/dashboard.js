// tables
const $productsTable = $("#products-table");
const $brandsTable = $("#brands-table");
const $categoryTable = $("#category-table");
const $productTypeTable = $("#product-type-table");

// image input group for image upload in modals
const $imageInputProducts = $("#image-input-products");
const $imageInputProductType = $("#image-input-product-type");
const $imageInputEditProductType = $("#image-input-edit-product-type");

// event listender for product type image edit button on product_type table

// products modal - creates a preview
$imageInputProducts.on("change", e => {
  const $previewDiv = $("#image-preview-products");
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
  const files = $("#image-input-products")[0].files;

  // form data
  const fd = new FormData();
  fd.append("price", price);
  fd.append("msrp", msrp);
  fd.append("stock", stock);
  fd.append("BrandId", brandID);
  fd.append("CategoryId", categoryID);
  fd.append("model", model);
  fd.append("productTypeId", productTypeID);
  fd.append("name", productName);
  fd.append("description", description);
  fd.append("image", files[0]);

  if (files.length > 0) {
    console.log(fd);
    $.ajax({
      url: "api/products",
      type: "POST",
      data: fd,
      contentType: false,
      processData: false
    })
      .then(() => {
        //renderCategoryTableData();
        location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }
});

// add new brands
$("#add-new-brand-btn").on("click", () => {
  const brandName = $("#brand-name").val();
  if (brandName) {
    $.ajax({
      url: "/api/brands/",
      method: "POST",
      data: { name: brandName }
    })
      .then(() => {
        location.reload();
      })
      .catch(err => {
        console.log(err);
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
    })
      .then(() => {
        location.reload();
      })
      .catch(err => {
        console.log(err);
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
    console.log(fd);
    $.ajax({
      url: "api/products_type",
      type: "POST",
      data: fd,
      contentType: false,
      processData: false
    })
      .then(() => {
        location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }
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

  console.log(ptId);
  console.log(ptName);
  console.log(ptImage);

  const fd = new FormData();
  fd.append("id", ptId);
  fd.append("name", ptName);
  fd.append("image", ptImage);
  $.ajax({
    url: "/api/products_type",
    type: "PUT",
    data: fd,
    contentType: false,
    processData: false
  })
    .then(() => {
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
});

/** table event listener - listens for save or delete button */

// products table
$productsTable.on("click", e => {
  const $ele = $(e.target);
  const $tr = $ele.parents("tr");

  // save
  if ($ele.hasClass("btn-save-row")) {
    const record = {
      id: $tr
        .find(".p-id")
        .text()
        .trim(),
      name: $tr
        .find(".p-name")
        .text()
        .trim(),
      price: $tr
        .find(".p-price")
        .text()
        .trim(),
      model: $tr
        .find(".p-model")
        .text()
        .trim(),
      msrp: $tr
        .find(".p-msrp")
        .text()
        .trim(),
      stock: $tr
        .find(".p-stock")
        .text()
        .trim(),
      image: $tr
        .find(".p-image")
        .text()
        .trim(),
      description: $tr
        .find(".p-description")
        .text()
        .trim(),
      BrandId: 1,
      CategoryId: 1,
      ProductTypeId: 1
    };
    // update record/row
    $.ajax({
      url: "/api/products/",
      method: "PUT",
      data: record
    })
      .then(() => {
        location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  } else if ($ele.hasClass("btn-delete-row")) {
    // delete
    const pId = $tr.find(".p-id").text();
    $.ajax({
      url: "/api/products/" + pId,
      method: "DELETE"
    })
      .then(res => {
        console.log(res);
        $tr.detach();
      })
      .catch(err => {
        console.log(err);
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
    })
      .then(() => {
        location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  } else if ($ele.hasClass("btn-delete-row")) {
    const bId = $tr.find(".b-id").text();
    $.ajax({
      url: "/api/brands/" + bId,
      method: "DELETE"
    })
      .then(res => {
        ALL_BRANDS = ALL_BRANDS.filter(row => {
          return row.id !== res.id;
        });
        $tr.detach();
      })
      .catch(err => {
        console.log(err);
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
    })
      .then(() => {
        location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  } else if ($ele.hasClass("btn-delete-row")) {
    const cId = $tr.find(".c-id").text();
    $.ajax({
      url: "/api/categories/" + cId,
      method: "DELETE"
    })
      .then(res => {
        ALL_CATEGORIES = ALL_CATEGORIES.filter(row => {
          return row.id !== res.id;
        });
        $tr.detach();
      })
      .catch(err => {
        console.log(err);
      });
  }
});

// category table
$productTypeTable.on("click", e => {
  const $ele = $(e.target);
  const $tr = $ele.parents("tr");

  if ($ele.hasClass("btn-save-row")) {
    const id = $tr
      .find(".pt-id")
      .text()
      .trim();
    const name = $tr
      .find(".pt-name")
      .text()
      .trim();
    const imageSRC = $tr.find(".pt-image").attr("src");
    // populate the row value into the modal
    $("#id-input-edit-product-type").val(id);
    $("#image-input-edit-product-type").attr("src", imageSRC);
    $("#name-input-edit-product-type").val(name);
  } else if ($ele.hasClass("btn-delete-row")) {
    console.log("Delete");
    const ptId = $tr.find(".pt-id").text();
    $.ajax({
      url: "/api/products_type/" + ptId,
      method: "DELETE"
    })
      .then(() => {
        $tr.detach();
      })
      .catch(err => {
        console.log(err);
      });
  }
});
