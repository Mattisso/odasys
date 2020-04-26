const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql;


const otableauposteSchema = (function () {

  const oTableauPosteType = new GraphQLObjectType({
      name: 'oTableauPoste',
      fields: () => ({
        id: {
          type: GraphQLID
        },
        TableauName: {
          type: GraphQLString
        },
        tableauLongName: {
          type: GraphQLString
        },
        ostableaupostes: {
          type: GraphQLString
        },
      })
    });
    function toinit() {
      return {
        oTableauPosteType: oTableauPosteType,
      };
    }
    return {
      toinit: toinit
    };
  })();
  module.exports = {
    toinit: otableauposteSchema.toinit
  };
