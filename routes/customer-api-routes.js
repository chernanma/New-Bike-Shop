const db = require("../models");

module.exports = function(app) {
  app.get("/api/customers", (req, res) => {
    // Here we add an "include" property to our options in our findAll query
    db.Customer.findAll({
      include: [db.Order]
    }).then(dbCustomer => {
      res.json(dbCustomer);
    });
  });

  // get customer info with id
  app.get("/api/customers/:id", (req, res) => {
    // Here we add an "include" property to our options in our findOne query
    db.Customer.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Order]
    }).then(dbCustomer => {
      res.json(dbCustomer);
    });
  });

  // get customer info with email
  app.get("/api/find/customer", (req, res) => {
    db.Customer.findOne({
      where: {
        email: req.query.email
      }
    }).then(dbCustomer => {
      res.json(dbCustomer);
    });
  });

  app.post("/api/customers", (req, res) => {
    db.Customer.create(req.body).then(dbCustomer => {
      res.json(dbCustomer);
    });
  });

  app.delete("/api/customers/:id", (req, res) => {
    db.Customer.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbCustomer => {
      res.json(dbCustomer);
    });
  });

  // PUT route for updating customer
  app.put("/api/customers", (req, res) => {
    db.Customer.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then((dbCustomer) => {
      res.json(dbCustomer);
    });
  });
};
