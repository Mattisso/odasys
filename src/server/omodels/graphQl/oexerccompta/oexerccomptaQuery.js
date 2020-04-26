const graphql = require('graphql');
const {  oExercCompta} = require('../../modelsSchema/index').toinit();
const {  oExercComptaType} = require('./oexerccomptaSchema').toinit();
const {  GraphQLID,  GraphQLList} = graphql;

const oexerccomptaQuery = (function () {
  const getoexerccomptas = {
    type: new GraphQLList(oExercComptaType),
    resolve(parent, args, context, info) {
      return oExercCompta.find({});
    }
  };
  const getoexerccompta = {
    type: oExercComptaType,
    args: {
      id: {
        type: GraphQLID
      }
    },
    resolve(parent, args, context, info) {
      return oExercCompta.findById(args.id);
    }
  };
  function toinit() {
    return {
      getoexerccompta: getoexerccompta,
      getoexerccomptas: getoexerccomptas,
    };
  }
  return {
    toinit: toinit
  };
})();
module.exports = {
  toinit: oexerccomptaQuery.toinit
};
