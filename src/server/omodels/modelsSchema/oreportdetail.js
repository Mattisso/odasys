const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const {getauditentity, gettoObject ,extendSchema, auditEntityPlugin} = require('../helpers/odabaseSchema').toinit();
const {oreportDetailClass, modelObject}=require('../modelClass/oreportdetailClass').toinit();

const  oreportdetail = (function(){
  const auditBaseSchema = new Schema(getauditentity, gettoObject);
	const oReportDetailSchema = extendSchema(auditBaseSchema, modelObject);
	oReportDetailSchema.loadClass(oreportDetailClass);
	oReportDetailSchema.plugin(auditEntityPlugin);

  let oReportDetail = mongoose.model('oReportDetail', oReportDetailSchema);

oReportDetailSchema.index(
  {
    OtableauposteKey: 1,
    OreferenceKey: 1,
    olevelKey: 1
  }
);

oReportDetailSchema.virtual('otableauposte')
  .set(function (otableauposte) {
    this._otableauposte = otableauposte;
  })
  .get(function () {
    return this._otableauposte;
  });

  function toinit(){
   return {
    oReportDetail:oReportDetail
   } 
  }
  return {
    toinit:toinit
  }
})()
module.exports={
  toinit:oreportdetail.toinit
}


