const {OcompteType}=require('./ocompteSchema').toinit();
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,   GraphQLNonNull} = graphql;
const {Ocompte} = require('../../modelsSchema/index').toinit();

  const ocompteMutation = (function () {

    const toCreateOcompte = {
    type: OcompteType,
    args: {},
    resolve(parent, args, context, info) {
      let ocompte = new Ocompte({});
      return ocompte.save();
    }
  };
  const toUpdateOcompte = {
    type: OcompteType,
    args: {},
    resolve(parent, args, context, info) {
      let ocompte = new Ocompte({});
      return ocompte.save();
    }
  };
  const toDeleteOcompte = {
    type: OcompteType,
    args: {},
    resolve(parent, args, context, info) {
      let ocompte = new Ocompte({});
      return ocompte.save();
    }
  };
    function toinit() {
      return {
        toCreateOcompte: toCreateOcompte,
        toUpdateOcompte: toUpdateOcompte,
        toDeleteOcompte: toDeleteOcompte,
      };
    }
    return {
      toinit: toinit
    };
  })();
  module.exports = {
    toinit: ocompteMutation.toinit
  };
