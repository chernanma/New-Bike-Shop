// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Requiring our models
const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the products_type

  app.get("/api/products_type", (req, res) => {
    db.Product_type.findAll({}).then((dbProduct_type) => {
      res.json(dbProduct_type);
    });
  });

  // GET route for retrieving a single Product_type

  app.get("/api/products_type/:id", (req, res) => {
    // Find one Product_type with the id in req.params.id and return them to the user with res.json
    db.Product_type.findOne({
      where: {
        id: req.params.id
      }
    }).then((dbProduct_type) => {
      res.json(dbProduct_type);
    });
  });

  // POST route for saving a new Product_type
  app.post("/api/products_type", (req, res) => {
    db.Product_type.create(req.body).then((dbProduct_type) => {
      res.json(dbProduct_type);
    });
  });

  // DELETE route for deleting products_type
  app.delete("/api/products_type/:id", (req, res) => {
    db.Product_type.destroy({
      where: {
        id: req.params.id
      }
    }).then((dbProduct_type) => {
      res.json(dbProduct_type);
    });
  });

  // PUT route for updating products_type
  app.put("/api/products_type", (req, res) => {
    db.Product_type.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then((dbProduct_type) => {
      res.json(dbProduct_type);
    });
  });
};
