const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const {getauditentity, gettoObject ,extendSchema, auditEntityPlugin, getbaseBalancesheet} = require('../helpers/odabaseSchema').toinit();
const {nttcomptebalanceDetailClass,modelObject}=require('../modelClass/nttcomptebalanceDetailClass').toinit();

const nttcomptebalancedetail=(function(){
  const balanceSheetBaseSchema = new Schema(Object.assign({},getbaseBalancesheet,getauditentity),gettoObject);
  const nttcomptebalanceDetailSchema = extendSchema(balanceSheetBaseSchema, modelObject);

  nttcomptebalanceDetailSchema.loadClass(nttcomptebalanceDetailClass);
  nttcomptebalanceDetailSchema.plugin(auditEntityPlugin);
  
nttcomptebalanceDetailSchema.virtual('nttcomptebalance')
.set(function (nttcomptebalance) {
  this._nttcomptebalance = nttcomptebalance;
})
.get(function () {
  return this._nttcomptebalance;
});

nttcomptebalanceDetailSchema.index(
{
  nttcomptebalancekey: 1,
  NumCompte: 1,
  IntitulCompte: 1

}
);

let  nttCompteBalanceDetail = mongoose.model('nttCompteBalanceDetail', nttcomptebalanceDetailSchema);
  function toinit(){
    return {
      nttCompteBalanceDetail:nttCompteBalanceDetail
    }
  }
  return {
    toinit:toinit
  }
})();
module.exports={
toinit:nttcomptebalancedetail.toinit
}
