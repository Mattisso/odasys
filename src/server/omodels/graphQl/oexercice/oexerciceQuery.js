const graphql = require('graphql');
const {oExercice} = require('../../modelsSchema/index').toinit();
const {oExerciceType}=require('./oexerciceSchema').toinit();
const { GraphQLObjectType,  GraphQLID,  GraphQLList} = graphql;

const oexerciceQuery = (function () {
  const getoexercices = {
    type: new GraphQLList(oExerciceType),
    resolve(parent, args, context, info) {
      return oExercice.find({});
    }
  };
  const getoexercice = {
    type: oExerciceType,
    args: {
      id: {
        type: GraphQLID
      }
    },
    resolve(parent, args, context, info) {
      return oExercice.findById(args.id);
    }
  };
  function toinit() {
    return {
      getoexercice: getoexercice,
      getoexercices: getoexercices,
    };
  }
  return {
    toinit: toinit
  };
})();
module.exports = {
  toinit: oexerciceQuery.toinit
};
