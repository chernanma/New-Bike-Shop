const db = require("../models");

module.exports = function(app) {
  app.get("/api/order", (req, res) => {
    // Here we add an "include" property to our options in our findAll query
    db.Order.findAll({
      include: [db.Order_detail]
      // include: [db.Order_detail,db.Payment]
    }).then(dbOrder => {
      res.json(dbOrder);
    });
  });

  app.get("/api/order/:id", (req, res) => {
    // Here we add an "include" property to our options in our findOne query
    db.Order.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Order_detail, db.Payment]
    }).then(dbOrder => {
      res.json(dbOrder);
    });
  });

  app.post("/api/order", (req, res) => {
    db.Order.create(req.body).then(dbOrder => {
      res.json(dbOrder);
    });
  });

  app.delete("/api/order/:id", (req, res) => {
    db.Order.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbOrder => {
      res.json(dbOrder);
    });
  });
};
