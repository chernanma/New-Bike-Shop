// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Requiring our models
const db = require("../models");
const path = require("path");

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
    const img = req.files.image;
    console.log(img);
    const IMAGE_PATH = `/public/images/${req.body.name}.${
      img.mimetype.split("/")[1]
    }`;

    // Use the mv() method to place the file somewhere on your server
    img.mv(
      path.join(__dirname, `../public/images/${req.body.name}.jpeg`),
      err => {
        if (err) {
          return res.status(500).send(err);
        }
        console.log("moved image");
        db.Product_type.create({
          name: req.body.name,
          image: IMAGE_PATH
        }).then(dbProductType => {
          res.json(dbProductType);
        });
      }
    );
  });

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
    db.Product_type.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dbProductType => {
      res.json(dbProductType);
    });
  });
};
