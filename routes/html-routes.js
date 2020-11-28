// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our models
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
// const dashboard = require("../public/js/dashboard.js");

module.exports = function(app) {
  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/management");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
    // res.render("dashboard");
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/management");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/management", isAuthenticated, (req, res) => {
    // res.sendFile(path.join(__dirname, "../public/employees.html"));
    const hbsObject = {
      user: res.req.user
    };
    console.log(hbsObject);
    res.render("dashboard", hbsObject); //Redering Data to dashboard.handlebars to be used in the dashboard-header.handlebars
  });

  // Rendering Products Data to products.handlebards
  app.get("/products", isAuthenticated, (req, res) => {
    db.Product.findAll({
      include: [
        { model: db.Brand },
        { model: db.Category },
        { model: db.Product_type }
      ]
    }).then(dbProduct => {
      const hbsObject = {
        products: dbProduct,
        user: res.req.user
      };
      console.log(hbsObject);
      res.render("products", hbsObject); //Render All Product Data to Products.handlebars
    });
  });
};
