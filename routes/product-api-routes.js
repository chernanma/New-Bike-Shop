// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Requiring our models
const db = require("../models");
const path = require("path");
// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the products
  app.get("/api/products", (req, res) => {
    db.Product.findAll({
      include: [
        { model: db.Brand },
        { model: db.Category },
        { model: db.Product_type }
      ]
    }).then(dbProduct => {
      res.json(dbProduct);
    });
  });

  // GET route for retrieving a single Product
  app.get("/api/products/:id", (req, res) => {
    // Find one Product with the id in req.params.id and return them to the user with res.json
    db.Product.findOne({
      where: {
        id: req.params.id
      },
      include: [
        { model: db.Brand },
        { model: db.Category },
        { model: db.Product_type }
      ]
    }).then(dbProduct => {
      res.json(dbProduct);
    });
  });

  // Get route to to display details about the product
  app.get("/api/product/display/:id", async (req, res) => {
    const id = req.params.id;

    try {
      // Find one Product with the id in req.params.id and return them to the user with res.json
      const productInfo = await db.Product.findOne({
        where: {
          id: id
        },
        include: [
          { model: db.Brand },
          { model: db.Category },
          { model: db.Product_type }
        ]
      });

      // const get related products from same category
      const relatedProductsInfo = await db.Product.findAll({
        where: {
          CategoryId: productInfo.CategoryId
        }
      });

      const product = {
        id: productInfo.id,
        name: productInfo.name,
        msrp: productInfo.msrp,
        stock: productInfo.stock,
        model: productInfo.model,
        image: productInfo.image,
        brand: productInfo.Brand.name,
        category: productInfo.Category.name,
        productType: productInfo.Product_type.name
      };

      if (productInfo.stock <= 0) {
        product.inStock = false;
      } else {
        product.inStock = true;
      }

      const relatedProducts = relatedProductsInfo.map(p => {
        return {
          name: p.name,
          image: p.image,
          msrp: p.msrp,
          id: p.id
        };
      });

      // render the data
      res.render("product-display", {
        product: product,
        relatedProducts: relatedProducts
      });

      // exception handling
    } catch (e) {
      console.log(e);
      return res.json(e);
    }
  });

  // POST route for saving a new Product
  app.post("/api/products", (req, res) => {
    console.log("--------------------------");
    const img = req.files.image;
    const {
      name,
      price,
      msrp,
      model,
      stock,
      description,
      BrandId,
      CategoryId,
      productTypeId
    } = req.body;
    const imgName = name.split(" ").join("-");
    const imgType = img.mimetype.split("/")[1];
    const IMAGE_PATH_CLIENT = `./images/products/${imgName}.${imgType}`;
    const IMAGE_PATH_SERVER = path.join(
      __dirname,
      `../public/${IMAGE_PATH_CLIENT}`
    );
    // Use the mv() method to place the file somewhere on your server
    img.mv(IMAGE_PATH_SERVER, err => {
      if (err) {
        return res.status(500).send(err);
      }
      console.log("moved image");
      db.Product.create({
        name: name,
        price: price,
        msrp: msrp,
        model: model,
        image: IMAGE_PATH_CLIENT,
        stock: stock,
        description: description,
        BrandId: BrandId,
        CategoryId: CategoryId,
        ProductTypeId: productTypeId
      }).then(dbProduct => {
        res.json(dbProduct);
      });
    });
  });

  // DELETE route for deleting products
  app.delete("/api/products/:id", (req, res) => {
    db.Product.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbProduct => {
      res.json(dbProduct);
    });
  });

  // PUT route for updating products
  app.put("/api/products", (req, res) => {
    const img = req.files.image;
    const {
      id,
      name,
      price,
      msrp,
      model,
      stock,
      description,
      BrandId,
      CategoryId,
      productTypeId
    } = req.body;
    const imgName = name.split(" ").join("-");
    const imgType = img.mimetype.split("/")[1];
    const IMAGE_PATH_CLIENT = `./images/products/${imgName}.${imgType}`;
    const IMAGE_PATH_SERVER = path.join(
      __dirname,
      `../public/${IMAGE_PATH_CLIENT}`
    );
    // Use the mv() method to place the file somewhere on your server
    img.mv(IMAGE_PATH_SERVER, err => {
      if (err) {
        return res.status(500).send(err);
      }
      console.log("moved image");
      console.log(IMAGE_PATH_SERVER);
      db.Product.update(
        {
          name: name,
          price: price,
          msrp: msrp,
          model: model,
          image: IMAGE_PATH_CLIENT,
          stock: stock,
          description: description,
          BrandId: BrandId,
          CategoryId: CategoryId,
          ProductTypeId: productTypeId
        },
        {
          where: {
            id: id
          }
        }
      ).then(dbProduct => {
        res.json(dbProduct);
      });
    });
  });
};
