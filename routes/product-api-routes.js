// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Requiring our models
const db = require("../models");

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

  // POST route for saving a new Product
  app.post("/api/products", (req, res) => {
    db.Product.create(req.body).then(dbProduct => {
      res.json(dbProduct);
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
    db.Product.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dbProduct => {
      res.json(dbProduct);
    });
  });
};
