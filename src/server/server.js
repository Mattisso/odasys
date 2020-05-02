"use strict";
/*eslint no-undef: "error"*/
const dotenv= require('dotenv');
const express = require('express');
//const graphqlHTTP = require('express-graphql');
const setRoutes= require('../client/api/index');

const {ApolloServer}= require('apollo-server-express');
const path = require('path');
const schema = require('../server/omodels/graphQl/schema').toinit();
const app = express();
var logger = require('morgan');
var cors = require('cors');
dotenv.config({path: '.env'});
app.set('port', (process.env.PORT || 3000));
var bodyParser = require('body-parser');
app.use(logger('combined'));
app.use(logger('dev'));
app.use(logger(':method :url :status :res[content-length] - :response-time ms'));
require('./config/ohadb').connectserver();
app.use(cors());
app.use(function(req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.resolve(__dirname, '../public')));
const server = new ApolloServer({schema, cors:true, introspection:true});
server.applyMiddleware({app});


app.use(setRoutes);

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/client/index.html'));
  });

if (!module.parent){
app.listen(app.get('port'), () => {
    console.log(`listening on port  ${app.get('port')}${server.graphqlPath}`);
  });
}

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.status('error', {
          message: err.message,
          error: err
      });
  });
}
