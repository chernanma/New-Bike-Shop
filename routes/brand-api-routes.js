// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Requiring our models
const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the brands

  app.get("/api/brands", (req, res) => {
    db.Brand.findAll({}).then(dbBrand => {
      res.json(dbBrand);
    });
  });

  // GET route for retrieving a single brand

  app.get("/api/brands/:id", (req, res) => {
    // Find one Brand with the id in req.params.id and return them to the user with res.json
    db.Brand.findOne({
      where: {
        id: req.params.id
      }
    }).then(dbBrand => {
      res.json(dbBrand);
    });
  });

  // POST route for saving a new brand
  app.post("/api/brands", (req, res) => {
    db.Brand.create(req.body).then(dbBrand => {
      res.json(dbBrand);
    });
  });

  // DELETE route for deleting brands
  app.delete("/api/brands/:id", (req, res) => {
    db.Brand.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbBrand => {
      res.json(dbBrand);
    });
  });

  // PUT route for updating brands
  app.put("/api/brands", (req, res) => {
    db.Brand.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dbBrand => {
      res.json(dbBrand);
    });
  });
};
