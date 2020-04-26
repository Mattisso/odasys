const {OlevelType}=require('./olevelSchema').toinit();
const graphql = require('graphql');
const {Olevel} = require('../../modelsSchema/index').toinit();


const olevelMutation = (function () {

  const toCreateOlevel = {
    type: OlevelType,
    args: {},
    resolve(parent, args, context, info) {
      let olevel = new Olevel({});
      return olevel.save();
    }
  };
  const toUpdateOlevel = {
    type: OlevelType,
    args: {},
    resolve(parent, args, context, info) {
      let olevel = new Olevel({});
      return olevel.save();
    }
  };
  const toDeleteOlevel = {
    type: OlevelType,
    args: {},
    resolve(parent, args, context, info) {
      let olevel = new Olevel({});
      return olevel.save();
    }
  };
    function toinit() {
      return {
        toCreateOlevel: toCreateOlevel,
        toUpdateOlevel: toUpdateOlevel,
        toDeleteOlevel: toDeleteOlevel,
      };
    }
    return {
      toinit: toinit
    };
  })();
  module.exports = {
    toinit: olevelMutation.toinit
  };
