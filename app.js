require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser')

const transactionRouter = require('./routes/transactions');
const categoryRouter = require('./routes/categories');
//const userRouter = require('./routes/users');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/money-manager',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connected successfully to MongoDB !'))
  .catch(() => console.log('Connection failed to MongoDB !'));



  app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/transaction',transactionRouter);
app.use('/api/category',categoryRouter);


module.exports = app;