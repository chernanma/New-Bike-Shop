// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Requiring our models
const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the categories

  app.get("/api/categories", (req, res) => {
    db.Category.findAll({}).then((dbCategory) => {
      res.json(dbCategory);
    });
  });

  // GET route for retrieving a single Category

  app.get("/api/categories/:id", (req, res) => {
    // Find one Category with the id in req.params.id and return them to the user with res.json
    db.Category.findOne({
      where: {
        id: req.params.id
      }
    }).then((dbCategory) => {
      res.json(dbCategory);
    });
  });

  // POST route for saving a new Category
  app.post("/api/categories", (req, res) => {
    db.Category.create(req.body).then((dbCategory) => {
      res.json(dbCategory);
    });
  });

  // DELETE route for deleting categories
  app.delete("/api/categories/:id", (req, res) => {
    db.Category.destroy({
      where: {
        id: req.params.id
      }
    }).then((dbCategory) => {
      res.json(dbCategory);
    });
  });

  // PUT route for updating categories
  app.put("/api/categories", (req, res) => {
    db.Category.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then((dbCategory) => {
      res.json(dbCategory);
    });
  });
};
