const db = require("../models");

module.exports = function(app) {
  app.get("/api/payment", (req, res) => {
    // Here we add an "include" property to our options in our findAll query
    db.Payment.findAll({
      include: [db.Order]
    }).then(function(dbPayment) {
      res.json(dbPayment);
    });
  });

  app.get("/api/payment/:id", (req, res) => {
    // Here we add an "include" property to our options in our findOne query
    db.Payment.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Order]
    }).then(function(dbPayment) {
      res.json(dbPayment);
    });
  });

  app.post("/api/payment", (req, res) => {
    db.Payment.create(req.body).then(function(dbPayment) {
      res.json(dbPayment);
    });
  });

  app.delete("/api/payment/:id", (req, res) => {
    db.Payment.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPayment) {
      res.json(dbPayment);
    });
  });
};
