const db = require("../models");

module.exports = function(app) {
  app.get("/api/orders", (req, res) => {
    // Here we add an "include" property to our options in our findAll query
    db.Order.findAll({
      include: [db.Payment]
    }).then(dbOrder => {
      res.json(dbOrder);
    });
  });

  app.get("/api/orders/customer/:id", (req, res) => {
    // Here we add an "include" property to our options in our findAll query
    db.Order.findAll({
      where: {
        CustomerId: req.params.id,
        payment_status: "Pending"
      }
    }).then(dbOrder => {
      console.log(dbOrder);
      res.json(dbOrder);
    });
  });

  app.get("/api/orders/:id", (req, res) => {
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

  app.post("/api/orders", (req, res) => {
    db.Order.create(req.body).then(dbOrder => {
      res.json(dbOrder);
    });
  });

  app.put("/api/orders", (req, res) => {
    console.log(req.body.id);
    db.Order.update(
      { payment_status: req.body.payment_status},
      {
        where: {
          id: req.body.id
        }
      }
    ).then(dbOrder => {
      res.json(dbOrder);
    });
  });

  app.delete("/api/orders/:id", (req, res) => {
    db.Order.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbOrder => {
      res.json(dbOrder);
    });
  });
};
