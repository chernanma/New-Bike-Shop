# BikeShopApp
As our project name suggest, Bicycle App shop is  an application that allows users to select bicycles by brand name, accessories, and service request. The user will have the ability to view the actual image of their selection along with the price and inventory in –stock associated  with each item.  This webpage contains fully functional forms for the users and members  to sign in, along with operational features that allow them to easily navigate , view options, make selections, and checkout successfully



[Click here to go to Bike App Site](https://github.com/chernanma/BikeShopApp)

![picture](./public/images/bikeshopapp1.jpg)

### Table of Contents
- [Description](#description)
- [How to Use](#how-to-use)
- [Screenshots](#screenshots)
- [References](#references)
- [Author Info](#author-info)
---
## Description
User will be able to search for bicycle types, search for parts and accessories, and request repair services for bicycles. The app will also allow the owner and employee to perform the CRUD operations for the products, orders, employees, and customers 


##### Technologies

- Html
- jQuery
- node.js
- MySQL
- 3rd party framework
- Express
- Handlebars
- Css
-MVC model
Packages:
-Inquire.js
express.js
express-handlebars.js
mysql.js

   


##### Code sample-
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


`
[Back To The Top](#Covid-19-Test-Sites-&-stats)
---
## How To Use
Complete the following steps in your local host:
	Clone the following repository in your computer 	 git@github.com chernanma/BikeShopApp.git.
Install all required packages:
	Run npm install in local terminal.
Run the App:
	node server.js in local terminal.

  

## Screenshots

-accessories
![picture](./public/images/Clothing.jpeg)
-Bikes
![picture](./public/images/Bikes.jpeg)
-Services
![picture](./public/images/Service.jpeg/)





---
## License
Copyright (c) [2020] International Team

[Back To The Top](#Covid-19-Test-Sites-&-stats)
---
## Author Info
- Linkedin -- [Cesar Martinez](https://www.linkedin.com/in/cesar-martinez-3986b3120/)
- Linkedin -- [Adrian Storr](https://www.linkedin.com/in/adrian-storr-98773731)
- Linkedin -- [Amit Karmacharya](https://www.linkedin.com/in/amit-karmacharya-b344731ab/)
- Linkedin -- [Cesar A Martinez](https://www.linkedin.com/in/cesar-augusto-martinez-auquilla-03934a16b()



