const router = require("express").Router();
let article = require("../models/article.model");

router.route("/").get((req, res) => {
  article.find((err, articles) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, articles: articles });
  });
});

// set route to add data to database
router.route("/add").post((req, res) => {
  let addArticle = new article(req.body);
  addArticle
    .save()
    .then(() => {
      res.status(200).json({ addArticle: "article added" });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// set route to get data by id from database
router.route("/detail/:id").get(function(req, res) {
  let id = req.params.id;
  article.findById(id, function(err, article) {
    res.json(article);
  });
});

module.exports = router;
