
const {GraphQLObjectType, GraphQLString, GraphQLID,  GraphQLList} = require('graphql');
// const {Ocompte} = require('../../modelsSchema/index').toinit();
 // const {OcompteType}=require('../ocompte/ocompteSchema').toinit();

const oreferenceSchema= (function(){
  const OreferenceType = new GraphQLObjectType({
    name: 'oReference',
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
      fullDescription: {
        type: GraphQLString
      } ,
     /*  ocomptes: {
        type: new GraphQLList(OcompteType),
        resolve(parent, args) {
          return Ocompte.find({
            id: parent.id
          });
        }
      }  */
    })
  });
  function toinit(){
    return {
      OreferenceType:OreferenceType
    };
  }
  return {
    toinit:toinit
  };
})();
module.exports={
  toinit:oreferenceSchema.toinit
};
