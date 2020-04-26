const {OcompteType}=require('./ocompteSchema').toinit();
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,   GraphQLNonNull} = graphql;
const {Ocompte} = require('../../modelsSchema/index').toinit();
