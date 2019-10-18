const router = require('express').Router();
let article = require('../models/article.model');

router.route('/').get((req, res) => {
    article.find((err, articles) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, articles: articles });
    });
  });

module.exports = router;