// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const ArticleSchema = new Schema(
  {
    article_title: String,
    article_authors: String,
    article_publication_type: String,
    article_publication: String,
    article_doi: Number,
    article_year: Number,
    article_location: String,
    article_method: String,
    article_status: String,
    article_rating: Number
  },
  { timestamps: true }
);

//The string is the database name??
const Article = mongoose.model("col_articles", ArticleSchema);
// export the new Schema so we could modify it using Node.js
module.exports = Article;