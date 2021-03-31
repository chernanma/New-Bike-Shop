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
    db.Product_type.findAll({}).then(dbProductType => {
      res.json(dbProductType);
    });
  });

  // GET route for retrieving a single Product_type

  app.get("/api/products_type/:id", (req, res) => {
    // Find one Product_type with the id in req.params.id and return them to the user with res.json
    db.Product_type.findOne({
      where: {
        id: req.params.id
      }
    }).then(dbProductType => {
      res.json(dbProductType);
    });
  });

  // POST route for saving a new Product_type
  app.post("/api/products_type", (req, res) => {
    console.log(req.body);
    db.Product_type.create({
      name: req.body.name,
      image: req.body.image
    })
      .then(dbProductType => {
        res.json(dbProductType);
      })
      .catch(err => {
        res.json(err);
      });
  });
  // });

  // DELETE route for deleting products_type
  app.delete("/api/products_type/:id", (req, res) => {
    db.Product_type.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbProductType => {
      res.json(dbProductType);
    });
  });

  // PUT route for updating products_type
  app.put("/api/products_type", (req, res) => {
    console.log(req.body);
    const { name, image } = req.body;
    db.Product_type.update(
      {
        name,
        image
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(dbProductType => {
      res.json(dbProductType);
    });
  });

  // PUT route for updating products_type
  app.put("/api/noImg/products_type", (req, res) => {
    const { name, id } = req.body;
    db.Product_type.update(
      { name: name },
      {
        where: {
          id: id
        }
      }
    )
      .then(dbProductType => {
        res.json(dbProductType);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  });
};
