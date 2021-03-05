// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Routes
// =============================================================
module.exports = function(app) {
  // when user click on shop now button
  app.get("/blog", async (req, res) => {
    try {
      res.render("blog", {
        blogs: "List of blogs"
      });
    } catch (e) {
      console.log(e);
    }
  });
};
