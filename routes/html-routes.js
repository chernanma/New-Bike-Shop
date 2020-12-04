// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our models
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const employee = require("../models/employee");
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
      const productArray = [];
      for (let i = 0; i < dbProduct.length; i++) {
        productArray.push(dbProduct[i].dataValues);
      }
      db.Brand.findAll({}).then(dbBrand => {
        const brandArray = [];
        for (let i = 0; i < dbBrand.length; i++) {
          brandArray.push(dbBrand[i].dataValues);
        }
        db.Category.findAll({}).then(dbCategory => {
          const categoryArray = [];
          for (let i = 0; i < dbCategory.length; i++) {
            categoryArray.push(dbCategory[i].dataValues);
          }
          db.Product_type.findAll({}).then(dbProduct_type => {
            const product_typeArray = [];
            for (let i = 0; i < dbProduct_type.length; i++) {
              product_typeArray.push(dbProduct_type[i].dataValues);
            }
            console.log(productArray);
            const hbsObject = {
              products: productArray,
              brands: brandArray,
              categories: categoryArray,
              products_type: product_typeArray,
              user: res.req.user
            };
            console.log(hbsObject);
            res.render("products", hbsObject); //Render All Product Data to Products.handlebars
          });
        });
      });
    });
  });

  // // Rendering Products Data to products.handlebards
  // app.get("/products", isAuthenticated, (req, res) => {
  //   db.Product.findAll({
  //     include: [
  //       { model: db.Brand },
  //       { model: db.Category },
  //       { model: db.Product_type },
  //     ],
  //   }).then((dbProduct) => {
  //     const productArray = [];
  //     for (let i = 0; i < dbProduct.length; i++) {
  //       productArray.push(dbProduct[i].dataValues);
  //     }
  //     console.log(productArray);
  //     const hbsObject = {
  //       products: productArray,
  //       user: res.req.user,
  //     };
  //     console.log(hbsObject);
  //     res.render("products", hbsObject); //Render All Product Data to Products.handlebars
  //   });
  // });

  app.get("/employees", isAuthenticated, (req, res) => {
    db.Employee.findAll({}).then(dbEmployee => {
      const employeeArray = [];
      for (let i = 0; i < dbEmployee.length; i++) {
        employeeArray.push(dbEmployee[i].dataValues);
      }
      console.log(employeeArray);
      const hbsObject = {
        employees: employeeArray,
        user: res.req.user
      };
      console.log(hbsObject);
      //res.json(hbsObject);
      res.render("employees", hbsObject); //Render All Employee Data to employees.handlebars
    });
  });

  app.get("/customers", isAuthenticated, (req, res) => {
    db.Customer.findAll({}).then(dbCustomer => {
      const customerArray = [];
      for (let i = 0; i < dbCustomer.length; i++) {
        customerArray.push(dbCustomer[i].dataValues);
      }
      console.log(customerArray);
      const hbsObject = {
        customers: customerArray,
        user: res.req.user
      };
      console.log(hbsObject);
      //res.json(hbsObject);
      res.render("customers", hbsObject); //Render All Customers Data to customers.handlebars
    });
  });

  app.get("/orders", isAuthenticated, (req, res) => {
    db.Order.findAll({
      include: [{ model: db.Customer }]
    }).then(dbOrder => {
      const orderArray = [];
      for (let i = 0; i < dbOrder.length; i++) {
        orderArray.push(dbOrder[i].dataValues);
      }
      db.Customer.findAll({}).then(dbCustomer => {
        const customerArray = [];
        for (let i = 0; i < dbCustomer.length; i++) {
          customerArray.push(dbCustomer[i].dataValues);
        }
        db.Product.findAll({
          include: [
            { model: db.Brand },
            { model: db.Category },
            { model: db.Product_type }
          ]
        }).then(dbProduct => {
          const productArray = [];
          for (let i = 0; i < dbProduct.length; i++) {
            productArray.push(dbProduct[i]);
          }
          console.log(orderArray);
          const hbsObject = {
            orders: orderArray,
            customers: customerArray,
            products: productArray,
            user: res.req.user
          };
          console.log(hbsObject);
          res.render("orders", hbsObject); //Render All Product Data to Products.handlebars
        });
      });
    });
  });

  // Rendering Payment Data to payments.handlebards
  app.get("/payments", isAuthenticated, (req, res) => {
    db.Payment.findAll({
      include: [
        {
          model: db.Order,
          include: [
            {
              model: db.Customer
            }
          ]
        }
      ]
    }).then(dbPayment => {
      console.log(dbPayment);
      const hbsObject = {
        payments: dbPayment
      };
      console.log(hbsObject);
      res.render("payments", hbsObject); //Render All payments Data to payments.handlebars
    });
  });
};
