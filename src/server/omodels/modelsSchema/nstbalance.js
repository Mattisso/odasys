const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const {getauditentity, gettoObject ,extendSchema, auditEntityPlugin, getbaseBalancesheet} = require('../helpers/odabaseSchema').toinit();
const {getFullNameById}= require('../helpers/utils').toinit();
const {nstbalanceClass,nstbalanceObject}=require('../modelClass/nstbalanceClass').toinit(); 
// const {oReference}=require('./oreference').toinit();
const nstbalance= (function(){

  const balanceSheetBaseSchema = new Schema(Object.assign({},getbaseBalancesheet,getauditentity),gettoObject);
  const nstBalanceSchema = extendSchema(balanceSheetBaseSchema, nstbalanceObject);
  nstBalanceSchema.loadClass(nstbalanceClass);
  nstBalanceSchema.plugin(auditEntityPlugin);
  nstBalanceSchema.index(
    {
      OexercComptaKey: 1,
      OtableauposteKey: 1,
      OreferenceKey: 1,
      NumCompte: 1  
    }
  );
  
  nstBalanceSchema.methods.getoreference = function (model, cb) {
    getFullNameById(model, this.OreferenceKey, function (err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  };
  
  nstBalanceSchema.methods.getoexercice = function (model, cb) {
    getFullNameById(model, this.OexercComptaKey, function (err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  };
  
  nstBalanceSchema.methods.getotableauposte = function (model, cb) {
    getFullNameById(model, this.OtableauposteKey, function (err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  };

  nstBalanceSchema.methods.getocompte = function (model, cb) {
    getFullNameById(model, this.OcompteKey, function (err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  };
  const nstBalance = mongoose.model('nstBalance', nstBalanceSchema);
  function toinit() {
    return {
        nstBalance: nstBalance    
    };
    }
   return {
    toinit: toinit
    };   
})();
  module.exports = {
    toinit: nstbalance.toinit
    };