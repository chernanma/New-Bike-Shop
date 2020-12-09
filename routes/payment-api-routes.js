const db = require("../models");

module.exports = function(app) {
  app.get("/api/payments", (req, res) => {
    // Here we add an "include" property to our options in our findAll query
    db.Payment.findAll({
      include: [db.Order]
    }).then(dbPayment => {
      res.json(dbPayment);
    });
  });

  app.get("/api/payments/:id", (req, res) => {
    // Here we add an "include" property to our options in our findOne query
    db.Payment.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Order]
    }).then(dbPayment => {
      res.json(dbPayment);
    });
  });

  app.post("/api/payments", (req, res) => {
    db.Payment.create(req.body).then(dbPayment => {
      res.json(dbPayment);
    });
  });

  app.delete("/api/payments/:id", (req, res) => {
    db.Payment.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbPayment => {
      res.json(dbPayment);
    });
  });
};
