const db = require("../models");

module.exports = function(app) {
  app.get("/api/customer", (req, res) => {
    // Here we add an "include" property to our options in our findAll query
    db.Customer.findAll({
      include: [db.Order]
    }).then(dbCustomer => {
      res.json(dbCustomer);
    });
  });

  app.get("/api/customer/:id", (req, res) => {
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

  app.post("/api/customer", (req, res) => {
    db.Customer.create(req.body).then(dbCustomer => {
      res.json(dbCustomer);
    });
  });

  app.delete("/api/customer/:id", (req, res) => {
    db.Customer.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbCustomer => {
      res.json(dbCustomer);
    });
  });
};
