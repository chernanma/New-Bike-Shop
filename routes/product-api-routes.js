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

  // POST route for saving a new Product
  app.post("/api/products", (req, res) => {

    db.Product.create(req.body).then(dbProduct => {
      res.json(dbProduct);

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
    console.log(req.body);
    const img = req.files.image;
    console.log(img);
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

  // PUT route for updating products
  app.put("/api/noImg/products", (req, res) => {
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
    db.Product.update(
      {
        name,
        price,
        msrp,
        model,
        stock,
        description,
        BrandId,
        CategoryId,
        productTypeId
      },
      {
        where: {
          id: req.body.id
        }
      }

    ).then(dbProduct => {

      res.json(dbProduct);
    });
  });
})
}
