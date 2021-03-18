// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");
const fileupload = require("express-fileupload");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(fileupload());

// set handlers
const exphbs = require("express-handlebars");

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "handlebars");

// Creating a handlebars helper
const helpers = exphbs.create({});
helpers.handlebars.registerHelper("ifvalue", function(conditional, options) {
  if (conditional === options.hash.equals) {
    return options.fn(this);
  }
  return options.inverse(this);
});

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/brand-api-routes.js")(app);
require("./routes/category-api-routes.js")(app);
require("./routes/order_detail-api-routes.js")(app);
require("./routes/product_type-api-routes.js")(app);
require("./routes/product-api-routes.js")(app);
require("./routes/order-api-routes.js")(app);
require("./routes/employee-api-routes.js")(app);
require("./routes/customer-api-routes.js")(app);
require("./routes/payment-api-routes.js")(app);
require("./routes/products-catalog.js")(app);
require("./routes/blog-api-route.js")(app);
// require("./routes/image-upload.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
