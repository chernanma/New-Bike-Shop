$(document).ready(() => {
  const filterOption = {};

  // on form change
  $("#catalog-filter").on("change", () => {
    const inStock = $("#filter-availability").val();

    const category = $("#filter-category").find("input");
    const categoryElement = category.filter(c => $(category[c]).is(":checked"));

    const brand = $("#filter-brands").find(":checked");
    const brandElement = brand.filter(b => $(brand[b]).is(":checked"));

    const productType = $("#filter-product-type").find(":checked");
    const ptElement = productType.filter(p => $(productType[p]).is(":checked"));

    const priceRange = $("input[name='filter-price']:checked").val();

    filterOption.inStock = inStock;
    filterOption.category = categoryElement.map(e => categoryElement[e].value);
    filterOption.brands = brandElement.map(e => brandElement[e].value);
    filterOption.productType = ptElement.map(e => ptElement[e].value);
    filterOption.priceRange = priceRange;

    // submit request
    submitFilterRequest();
  });

  // create url query string
  function createFilterQueryString() {
    const params = new URLSearchParams();
    params.append("inStock", filterOption.inStock);
    params.append("categories", textFromInputArray(filterOption.category));
    params.append("brands", textFromInputArray(filterOption.brands));
    params.append("productType", textFromInputArray(filterOption.productType));
    params.append("priceRange", filterOption.priceRange);

    return params.toString();
  }

  // returns array values from array of html elements
  function textFromInputArray(array) {
    const data = [];
    for (const i of array) {
      data.push(i);
    }
    return data;
  }

  // ajax request to submit the form
  function submitFilterRequest() {
    const queryParams = createFilterQueryString();
    // // window.location.href = window"/catalog?" + queryParams;
    // console.log(window.location.href);
    $.ajax({
      url: "api/catalog?" + queryParams,
      method: "GET"
    }).then(res => {
      console.log(res);
      populateProductList(res.products);
    });
  }

  // populate product list
  function populateProductList(products) {
    const $productListCol = $("#catalog-product-list");

    $productListCol.empty();

    for (const i in products) {
      console.log(i);
      const product = products[i];
      console.log(product.image);
      const card = `
    <!-- card -->
    <div class="card m-2" style="width: 14rem;">
      <img class="card-img-top" src="${product.image}" alt="${product.name} image">
      <div class="card-body">
        <h5 class="card-title product-name">${product.name}</h5>
        <p class="card-text">$${product.msrp}</p>
        <a href="/api/product/display/${product.id}" class="btn btn-primary">View Details</a>
      </div>
    </div>`;
      $productListCol.append(card);
    }
  }
});
