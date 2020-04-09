const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const {getauditentity, gettoObject ,extendSchema, auditEntityPlugin, getbaseBalancesheet} = require('../helpers/odabaseSchema').toinit();
const {getFullNameById}= require('../helpers/utils').toinit();
const {nttbalanceClass,nttbalanceObject}=require('../modelClass/nttbalanceClass').toinit(); 
const nttbalance= (function(){

  const balanceSheetBaseSchema = new Schema(Object.assign({},getbaseBalancesheet,getauditentity),gettoObject);
  const nttBalanceSchema = extendSchema(balanceSheetBaseSchema, nttbalanceObject);

  nttBalanceSchema.loadClass(nttbalanceClass);
  nttBalanceSchema.plugin(auditEntityPlugin);
  nttBalanceSchema.index(
    {
      OexercComptaKey: 1,
      OtableauposteKey: 1,
      OreferenceKey: 1,
      NumCompte: 1  
    }
  );
  
  nttBalanceSchema.methods.getoreference = function (model, cb) {
    getFullNameById(model, this.OreferenceKey, function (err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  };
  
  nttBalanceSchema.methods.getoexercice = function (model, cb) {
    getFullNameById(model, this.OexercComptaKey, function (err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  };
  
  nttBalanceSchema.methods.getotableauposte = function (model, cb) {
    getFullNameById(model, this.OtableauposteKey, function (err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  };
  nttBalanceSchema.methods.getocompte = function (model, cb) {
    getFullNameById(model, this.OcompteKey, function (err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  };
  const nttBalance = mongoose.model('nttBalance', nttBalanceSchema);
  function toinit() {
    return {
        nttBalance: nttBalance    
    };
    }
   return {
    toinit: toinit
    };   
})();
  module.exports = {
    toinit: nttbalance.toinit
    };