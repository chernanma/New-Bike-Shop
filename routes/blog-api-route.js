// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Requiring our models
const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the blogs

  app.get("/api/blogs", (req, res) => {
    db.Blog.findAll({}).then(dbBlog => {
      res.json(dbBlog);
    });
  });

  // GET route for retrieving a single brand

  app.get("/api/blogs/:id", (req, res) => {
    // Find one Blog with the id in req.params.id and return them to the user with res.json
    db.Blog.findOne({
      where: {
        id: req.params.id
      }
    }).then(dbBlog => {
      res.json(dbBlog);
    });
  });

  // POST route for saving a new blog
  app.post("/api/blogs", (req, res) => {
    db.Blog.create(req.body).then(dbBlog => {
      res.json(dbBlog);
    });
  });

  // DELETE route for deleting blog
  app.delete("/api/blogs/:id", (req, res) => {
    db.Blog.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbBlog => {
      res.json(dbBlog);
    });
  });

  // PUT route for updating blogs
  app.put("/api/blogs", (req, res) => {
    db.Blog.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dbBlog => {
      res.json(dbBlog);
    });
  });
};
