/* const graphql = require('graphql');
const {GraphQLObjectType,GraphQLString,GraphQLID,GraphQLList} = graphql;
const ocompteSchema=(function(){

  
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
    },  
      ocompte: {
          type: new GraphQLList(OcompteType),
          resolve(parent, args) {
              return oCompte.find({
                  oreferenceID: parent.id
              });
          }
      }
  })
});

  const OcompteType = new GraphQLObjectType({
    name: 'oCompte',
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
                return oReference.findById(parent.oreferenceID);
            }
        }

    })
});

  function toinit(){
    return {
      OcompteType:OcompteType,
      OreferenceType:OreferenceType
    }
      };
    return {
      toinit:toinit
    }
    })()
    module.exports={
      toinit:ocompteSchema.toinit
    } */