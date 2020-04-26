"use strict";
/*eslint no-undef: "error"*/
const dotenv= require('dotenv');
const express = require('express');
const _path = require('path');

//const graphqlHTTP = require('express-graphql');
const {ApolloServer}= require('apollo-server-express');
const path = '/graphql';
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
// headers and content type
app.use(function(req, res, next) {
  //set headers to allow cross origin request.
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse various different custom JSON types as JSON
  app.use(express.static(_path.resolve(__dirname, '../public')));
const server = new ApolloServer({schema, cors:true, introspection:true});
server.applyMiddleware({app, path});
/* const extensions = ({
    document,
    variables,
    operationName,
    result,
    context,
  }) => {
    return {
      runTime: Date.now() - context.startTime,
    };
  }; */


  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/client/index.html'));
  });
//app.get('/graphql', graphqlHTTP({

  //   schema:schema,
     //   server,
     //   schema: MyGraphQLSchema,
     //   context: { startTime: Date.now() },
      //  extensions,
     //   graphiql: true // process.env.NODE_ENV=== 'development',
//
    //directing express-graphql to use this schema to map out the graph
  //  server,
    //directing express-graphql to use graphiql when goto '/graphql' address in the browser
    //which provides an interface to make GraphQl queries
  //  graphiql:true
//})
//);
/* app.post('/graphql', graphqlHTTP({
  schema:schema,

    graphiql: true // process.env.NODE_ENV=== 'development',


})
); */
if (!module.parent){
app.listen(app.get('port'), () => {
    console.log(`listening on port  ${app.get('port')}/${server.graphqlPath}`);
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
