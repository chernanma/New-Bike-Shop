// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Requiring our models
const db = require("../models");
const { Op } = require("sequelize");

// Routes
// =============================================================
module.exports = function(app) {
  // when user click on shop now button
  app.get("/catalog", async (req, res) => {
    try {
      const productList = await db.Product.findAll({});
      const allBrands = await db.Brand.findAll({});
      const allCategories = await db.Category.findAll({});
      const allProductType = await db.Product_type.findAll({});

      res.render("products-catalog", {
        products: productList,
        brands: allBrands,
        categories: allCategories,
        productType: allProductType
      });
    } catch (e) {
      console.log(e);
    }
  });

  // GET route - get all catalog
  app.get("/api/catalog", async (req, res) => {
    console.log(req.query);

    const filter = createWhereConditionFilter(req.query);
    const query = {};
    if (Object.keys(filter).length !== 0) {
      query.where = filter;
    }
    console.log(query);
    try {
      const allBrands = await db.Brand.findAll({});
      const allCategories = await db.Category.findAll({});
      const allProductType = await db.Product_type.findAll({});
      const productList = await db.Product.findAll(query);

      // console.log(productList);
      res.json({
        products: productList,
        brands: allBrands,
        categories: allCategories,
        productType: allProductType
      });
    } catch (e) {
      console.log(e);
    }
  });
};

// creates query based on the filter values
function createWhereConditionFilter(option) {
  const condition = {};

  const inStock = option.inStock === "true";
  console.log(inStock);
  if (inStock) {
    console.log("INSTOCK **");
    condition.stock = {
      [Op.gt]: 0
    };
  }

  if (option.categories !== "") {
    const categories = stringArrToIntArr(option.categories);
    condition.CategoryId = {
      [Op.in]: categories
    };
  }

  if (option.brands !== "") {
    const brands = stringArrToIntArr(option.brands);
    condition.BrandId = {
      [Op.in]: brands
    };
  }

  if (option.productType !== "") {
    const productType = stringArrToIntArr(option.productType);
    condition.ProductTypeId = {
      [Op.in]: productType
    };
  }

  if (option.priceRange !== "" && option.priceRange !== "undefined") {
    if (option.priceRange === "600") {
      condition.msrp = {
        [Op.gte]: 500
      };
    } else {
      condition.msrp = {
        [Op.lt]: parseInt(option.priceRange)
      };
    }
  }

  console.log(condition);

  return condition;
}

// comma separated string to int array
function stringArrToIntArr(stringArr) {
  const arr = stringArr.split(",");
  const intArr = arr.map(e => parseInt(e));
  return intArr;
}
