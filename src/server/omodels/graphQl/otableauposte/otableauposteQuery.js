const graphql = require('graphql');
const {
  oTableauPoste
} = require('../../modelsSchema/index').toinit();
const {
  oTableauPosteType
} = require('./otableauposteSchema').toinit();
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList
} = graphql;

const getotableauposte = {
  type: oTableauPosteType,
  args: {
    id: {
      type: GraphQLID
    }
  },
  resolve(parent, args, context, info) {
    return oTableauPoste.findById(args.id);
  }
};
const getotableaupostes = {
  type: new GraphQLList(oTableauPosteType),
  resolve(parent, args, context, info) {
    return oTableauPoste.find({});
  }
};
const otableauposteQuery = (function () {
  function toinit() {
    return {
      getotableauposte: getotableauposte,
      getotableaupostes: getotableaupostes,
    };
  }
  return {
    toinit: toinit
  };
})();
module.exports = {
  toinit: otableauposteQuery.toinit
};
