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
    }).then((dbProduct) => {
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
    }).then((dbProduct) => {
      res.json(dbProduct);
    });
  });

  // POST route for saving a new Product
  app.post("/api/products", (req, res) => {
    const img = req.files.image;
    console.log(img);
    const IMAGE_PATH = `/images/products/${req.body.name}.${
      img.mimetype.split("/")[1]
    }`;
    // Use the mv() method to place the file somewhere on your server
    img.mv(
      path.join(__dirname, `../public/images/products/${req.body.name}.jpeg`),
      err => {
        if (err) {
          return res.status(500).send(err);
        }
        console.log("moved image");
        console.log(IMAGE_PATH);
        db.Product.create({
          name: req.body.name,
          price: req.body.price,
          msrp: req.body.msrp,
          model: req.body.model,
          image: IMAGE_PATH,
          stock: req.body.stock,
          description: req.body.description,
          BrandId: req.body.BrandId,
          CategoryId: req.body.CategoryId,
          ProductTypeId: req.body.productTypeId
        }).then(dbProduct => {
          res.json(dbProduct);
        });
      }
    );
  });

  // DELETE route for deleting products
  app.delete("/api/products/:id", (req, res) => {
    db.Product.destroy({
      where: {
        id: req.params.id
      }
    }).then((dbProduct) => {
      res.json(dbProduct);
    });
  });

  // PUT route for updating products
  app.put("/api/products", (req, res) => {
    db.Product.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then((dbProduct) => {
      res.json(dbProduct);
    });
  });
};
