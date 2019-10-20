const mongoose = require('mongoose');
const express = require('express');
const request = require('request');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const API_PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());

const path = require("path");
app.use(express.static(path.join(__dirname, "FrontEnd", "build")));


// this is our MongoDB database
const dbRoute =
  'mongodb+srv://sysAdmin:Sjgd1234@cluster0-qvark.mongodb.net/db_articles?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });
let connection = mongoose.connection;

connection.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const articlesRouter = require('./routes/articles');
app.use('/articles', articlesRouter);

app.get("*", (req, res) => {
	request(
    { url: 'https://https://serler-v3-stage.herokuapp.com/articles' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
	res.sendFile(path.join(__dirname, "FrontEnd", "build", "index.html"));
});

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
