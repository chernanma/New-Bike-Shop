// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************
const path = require("path");
// Requiring our models
const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the orders_detail

  app.get("/api/orders_detail", (req, res) => {
    db.Order_detail.findAll({}).then((dbOrder_detail) => {
      res.json(dbOrder_detail);
    });
  });

  // GET route for retrieving a single Order_detail

  app.get("/api/orders_detail/:id", (req, res) => {
    // Find one Order_detail with the id in req.params.id and return them to the user with res.json
    db.Order_detail.findOne({
      where: {
        id: req.params.id
      },
      include: [{ model: db.Product }, { model: db.Order }]
    }).then((dbOrder_detail) => {
      res.json(dbOrder_detail);
    });
  });

  // POST route for saving a new Order_detail
  app.post("/api/orders_detail", (req, res) => {
    // Inserting order-details in bulk mode
    db.Order_detail.bulkCreate(req.body).then( dbOrder_detail => {
      res.json(dbOrder_detail);
    });
  });

  // DELETE route for deleting orders_detail
  app.delete("/api/orders_detail/:id", (req, res) => {
    db.Order_detail.destroy({
      where: {
        id: req.params.id
      }
    }).then((dbOrder_detail) => {
      res.json(dbOrder_detail);
    });
  });

  // PUT route for updating orders_detail
  app.put("/api/orders_detail", (req, res) => {
    db.Order_detail.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then((dbOrder_detail) => {
      res.json(dbOrder_detail);
    });
  });
  // Route to pull all details order by order ID
  app.get("/api/orders/orderDetail/:id", (req, res) => {
    // Here we add an "include" property to our options in our findAll query
    const orderDetailsArray = [];
    db.Order_detail.findAll({
      where: {
        OrderId: req.params.id
      }
    }).then(dbOrderDetails => {
      for (let i = 0; i < dbOrderDetails.length; i++) {
        orderDetailsArray.push(dbOrderDetails[i].dataValues);
      }
      console.log(dbOrderDetails);
      res.json(orderDetailsArray);
    });
  });
};
