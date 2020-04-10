const graphql = require('graphql');
const {User, OcompteReference, oCompte, nstBalance, nstBalanceInput, nttBalance, nttCompteBalance, nttCompteBalanceDetail, olevel, oStableauPoste, oStblArea, oTableauPoste, oReference, oReportDetail, oReportHeader}=require('../omodels/modelsSchema').toinit()
const {GraphQLObjectType, GraphQLString, GraphQLID,GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull} = graphql;

const  UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
        type: GraphQLID
    },
    username: {
        type: GraphQLString
    },
    role: {
        type: GraphQLString
    },
    password: {
        type: GraphQLString
    },
    loginAttempts: {
        type: GraphQLInt
    }
})
});


const OcompteType = new GraphQLObjectType({
  name: 'Ocompte',
  fields: () => ({
      id: {
          type: GraphQLID
      },
      CompteNumber: {
          type: GraphQLString
      },
      oreference: {
          type: OreferenceType,
          resolve(parent, args) {
              return Oreference.findById(parent.oreferenceID);
          }
      }

  })
});

const OreferenceType = new GraphQLObjectType({
  name: 'Oreference',
  fields: () => ({
      id: {
          type: GraphQLID
      },
      RefCode: {
          type: GraphQLString
      },
      Description: {
          type: GraphQLString
      },
      ocompte: {
          type: new GraphQLList(OcompteType),
          resolve(parent, args) {
              return Ocompte.find({
                  oreferenceID: parent.id
              });
          }
      }
  })
});

