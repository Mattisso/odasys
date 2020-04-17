const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID} = graphql;
const {oReference} = require('../../modelsSchema/index').toinit();
// const {OreferenceType}= require('../oreference/oreferenceSchema').toinit();

const ocompteSchema = (function () {

	const OcompteType = new GraphQLObjectType({
    name: 'Ocompte',
    fields: () => ({
      id: {
        type: GraphQLID
      },
      CompteNumber: {
        type: GraphQLString
      }/* ,
      oreference: {
        type: OreferenceType,
        resolve(parent, args) {
          // const {id}=args;
          return oReference.findById(parent.id);
        }
      } */
    })
  });

  function toinit() {

    return{
      OcompteType:OcompteType
    };  // userresolver
  }
  return {
    toinit: toinit
  };
})();
module.exports = {
  toinit: ocompteSchema.toinit
};
//type Query { ... }
//type Mutation { ... }
// type Subscription { ... }
