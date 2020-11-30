// data
let ALL_BRANDS = [];
let ALL_CATEGORIES = [];
let ALL_PRODUCT_TYPES = [];

// tables
const $productsTable = $("#products-table");
const $brandsTable = $("#brands-table");
const $categoryTable = $("#category-table");
const $productTypeTable = $("#product-type-table");

// image input group for image upload in modals
const $imageInputProducts = $("#image-input-products");
const $imageInputProductType = $("#image-input-product-type");

/** image upload button */

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

/** event listener for modal's add button */

// add new products
$("#add-new-products-btn").on("click", () => {});

// add new brands
$("#add-new-brand-btn").on("click", () => {
  const brandName = $("#brand-name").val();
  if (brandName) {
    $.ajax({
      url: "/api/brands/",
      method: "POST",
      data: { name: brandName }
    })
      .then(res => {
        ALL_BRANDS.push({ id: res.id, name: res.name });
        //requestListOfAllBrands();
        location.reload();
      })
      .catch(err => {
        console.log(err);
      })
      .always(() => {
        $("#brands-modal").modal("toggle");
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
      .then(res => {
        ALL_CATEGORIES.push(res);
        //renderCategoryTableData();
        location.reload();
      })
      .catch(err => {
        console.log(err);
      })
      .always(() => {
        $("#categories-modal").modal("toggle");
      });
  }
});

// add new product type
$("#add-new-product-type-btn").on("click", () => {
  console.log("add new product type");
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
      .then(res => {
        ALL_PRODUCT_TYPES.push(res);
        //renderCategoryTableData();
        location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }
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
      .then(res => {
        console.log(res);
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
        ALL_BRANDS = ALL_BRANDS.map(row => {
          if (row.id === record.id) {
            return { id: row.id, name: record.name };
          }
          return row;
        });
        //renderBrandsTableData();
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
        ALL_CATEGORIES = ALL_CATEGORIES.map(row => {
          if (row.id === record.id) {
            return { id: row.id, name: record.name };
          }
          return row;
        });
        //renderBrandsTableData();
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
    const record = {
      id: $tr
        .find(".pt-id")
        .text()
        .trim(),
      name: $tr
        .find(".pt-name")
        .text()
        .trim(),
      image: $tr.find(".pt-image")
    };
    // update record/row
    $.ajax({
      url: "/api/products_type",
      method: "PUT",
      data: record
    })
      .then(() => {
        ALL_PRODUCT_TYPES = ALL_PRODUCT_TYPES.map(row => {
          if (row.id === record.id) {
            return { id: row.id, name: record.name };
          }
          return row;
        });
        location.reload();
        //renderBrandsTableData();
      })
      .catch(err => {
        console.log(err);
      });
  } else if ($ele.hasClass("btn-delete-row")) {
    const ptId = $tr.find(".pt-id").text();
    $.ajax({
      url: "/api/products_type/" + ptId,
      method: "DELETE"
    })
      .then(res => {
        ALL_PRODUCT_TYPES = ALL_PRODUCT_TYPES.filter(row => {
          return row.id !== res.id;
        });
        $tr.detach();
      })
      .catch(err => {
        console.log(err);
      });
  }
});

/** render data to differnt tables */

// // products table
// function renderProductsTableData(data) {
//   for (const row in data) {
//     $productsTable.find("tbody").empty();
//     const record = data[row];
//     const newTr = `
//         <tr>
// <td class="pt-3-half p-id" contenteditable="true">${record.id}</td>
// <td class="pt-3-half p-name" contenteditable="true">${record.name}</td>
// <td class="pt-3-half p-price" contenteditable="true">${record.price}</td>
// <td class="pt-3-half p-msrp" contenteditable="true">${record.msrp}</td>
// <td class="pt-3-half p-model" contenteditable="true">${record.model}</td>
// <td class="pt-3-half p-stock" contenteditable="true">${record.stock}</td>
// <td class="pt-3-half p-image" contenteditable="true">${record.image}</td>
// <td class="pt-3-half p-description" contenteditable="true">${record.description}</td>
// <td class="pt-3-half p-brand" contenteditable="true">${record.Brand.name}</td>
// <td class="pt-3-half p-category" contenteditable="true">${record.Category}</td>
// <td class="pt-3-half p-type" contenteditable="true">${record.Product_type.id}</td>
// <td>
// <span class="table-remove">
// <button type="button"
// class="  btn btn-save-row  btn-success line-coverage btn-rounded btn-md my-0"><i class="btn-save-row L0 fas fa-save"></i></button>
// <button type="button"
// class="  btn btn-delete-row  btn-danger btn-rounded btn-md my-0"><i class="btn-delete-row L2 fas fa-times"></i></button>
// </span>
// </td>
// </tr>`;

//     // append to the table
//     $productsTable.find("tbody").append(newTr);
//   }
// }

// function renderBrandsTableData() {
//   $brandsTable.find("tbody").empty();
//   for (const row in ALL_BRANDS) {
//     // console.log(data[row]);
//     const record = ALL_BRANDS[row];
//     const newTr = `
//           <tr>
//   <td class="pt-3-half b-id" contenteditable="true">${record.id}</td>
//   <td class="pt-3-half b-name" contenteditable="true">${record.name}</td>
//   <td>
//   <span class="table-remove">
//   <button type="button"
//   class="  btn btn-save-row  btn-success line-coverage btn-rounded btn-md my-0"><i class="btn-save-row L0 fas fa-save"></i></button>
//   <button type="button"
//   class="  btn btn-delete-row  btn-danger btn-rounded btn-md my-0"><i class="btn-delete-row L2 fas fa-times"></i></button>
//   </span>
//   </td>
//   </tr>`;

//     // append to the table
//     $brandsTable.find("tbody").append(newTr);
//   }
// }

// // category table
// function renderCategoryTableData() {
//   $categoryTable.find("tbody").empty();
//   for (const row in ALL_CATEGORIES) {
//     // console.log(data[row]);
//     const record = ALL_CATEGORIES[row];
//     const newTr = `
//           <tr>
//   <td class="pt-3-half c-id" contenteditable="true">${record.id}</td>
//   <td class="pt-3-half c-name" contenteditable="true">${record.name}</td>
//   <td>
//   <span class="table-remove">
//   <button type="button"
//   class="  btn btn-save-row  btn-success line-coverage btn-rounded btn-md my-0"><i class="btn-save-row L0 fas fa-save"></i></button>
//   <button type="button"
//   class="  btn btn-delete-row  btn-danger btn-rounded btn-md my-0"><i class="btn-delete-row L2 fas fa-times"></i></button>
//   </span>
//   </td>
//   </tr>`;

//     // append to the table
//     $categoryTable.find("tbody").append(newTr);
//   }
// }

// // product type table
// function renderProductTypeTableData() {
//   console.log("0000000000000");
//   console.log(ALL_PRODUCT_TYPES);
//   $productTypeTable.find("tbody").empty();
//   for (const row in ALL_PRODUCT_TYPES) {
//     console.log("000000000000");
//     // console.log(data[row]);
//     const record = ALL_PRODUCT_TYPES[row];
//     // Obtain a blob: URL for the image data.
//     const arrayBufferView = new Uint8Array( record.image );
//     const blob = new Blob([arrayBufferView], { type: "image/jpeg" });
//     const urlCreator = window.URL || window.webkitURL;
//     const imageUrl = urlCreator.createObjectURL(blob);

//     console.log(record.image.data);
//     const newTr = `
//           <tr>
//   <td class="pt-3-half pt-id" contenteditable="true">${record.id}</td>
//   <td class="pt-3-half pt-name" contenteditable="true">${record.name}</td>
//   <td class="pt-3-half pt-image" contenteditable="true"><img id="img-buffer" class="img-fluid" src="data:image/png;base64,${toBase64(record.image)}" alt="" /></td>
//   <td>
//   <span class="table-remove">
//   <button type="button"
//   class="  btn btn-save-row  btn-success line-coverage btn-rounded btn-md my-0"><i class="btn-save-row L0 fas fa-save"></i></button>
//   <button type="button"
//   class="  btn btn-delete-row  btn-danger btn-rounded btn-md my-0"><i class="btn-delete-row L2 fas fa-times"></i></button>
//   </span>
//   </td>
//   </tr>`;

//     // append to the table
//     $productTypeTable.find("tbody").append(newTr);
//   }
// }
function toBase64(arr) {
  arr = new Uint8Array(arr);
  return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ""));
}

/** ajax request to get data for different tables */

// ajax request for all products
// function requestListOfAllProducts() {
//   // ajax request to products api
//   $.ajax({
//     url: "/api/products",
//     method: "GET"
//   })
//     .then(res => {
//       //renderProductsTableData(res);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// // ajax request for all brands
// function requestListOfAllBrands() {
//   // ajax request to products api
//   $.ajax({
//     url: "/api/brands",
//     method: "GET"
//   })
//     .then(res => {
//       ALL_BRANDS = res.map(record => {
//         return { id: record.id, name: record.name };
//       });
//       renderBrandsTableData();
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// // ajax request for all category
// function requestListOfAllCategory() {
//   // ajax request to products api
//   $.ajax({
//     url: "/api/categories",
//     method: "GET"
//   })
//     .then(res => {
//       ALL_CATEGORIES = res.map(row => {
//         return { id: row.id, name: row.name };
//       });
//       renderCategoryTableData();
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// // ajax request for all product type
// function requestListOfAllProductType() {
//   // ajax request to products api
//   $.ajax({
//     url: "/api/products_type",
//     method: "GET"
//   })
//     .then(res => {
//       console.log(res);
//       ALL_PRODUCT_TYPES = res.map(row => {
//         return { id: row.id, name: row.name, image: row.image };
//       });
//       renderProductTypeTableData();
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// initializes all the table
// (function() {
//   requestListOfAllProducts();
//   requestListOfAllBrands();
//   requestListOfAllCategory();
//   requestListOfAllProductType();
// })();
