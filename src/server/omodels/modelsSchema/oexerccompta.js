const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const { getauditentity,gettoObject, extendSchema, auditEntityPlugin} = require('../helpers/odabaseSchema').toinit();
const {oExercComptaClass, initObject}=require('../modelClass/oxerccomptaClass').toinit();
const oexerccompta = (function () {
  const auditBaseSchema = new Schema(getauditentity, gettoObject);
  const oexerccomptaschema = extendSchema(auditBaseSchema, initObject);

  oexerccomptaschema.loadClass(oExercComptaClass);
  oexerccomptaschema.plugin(auditEntityPlugin);
  oexerccomptaschema.index({
    oExercComptaId: 1
  });
  let oExercCompta = mongoose.model('oExercCompta', oexerccomptaschema);
  function toinit() {
    return {
      oExercCompta: oExercCompta
    };
  }
  return {
    toinit: toinit
  };
})();
module.exports = {
  toinit: oexerccompta.toinit
};
