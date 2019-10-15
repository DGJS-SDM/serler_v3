const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const API_PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());

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

const articlesRouter = require('./routes/articles');
app.use('/articles', articlesRouter);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
