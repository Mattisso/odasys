const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const {getauditentity, gettoObject ,extendSchema, auditEntityPlugin} = require('../helpers/odabaseSchema').toinit();
const {oExerciceClass,initObjOexcerice}=require('../modelClass/oexerciceClass').tonit();

const oexercice= (function(){
  const auditBaseSchema = new Schema(getauditentity,gettoObject);
  const oexerciceschema = extendSchema(auditBaseSchema, initObjOexcerice);

  oexerciceschema.loadClass(oExerciceClass);
  oexerciceschema.plugin(auditEntityPlugin);
  oexerciceschema.index({
    oExerciceEncour: 1
  });
  let oExercice = mongoose.model('oExercice', oexerciceschema);
  function toinit() {
    return {
      oExercice: oExercice    
    };
    }
   return {
    toinit: toinit
    };   
})();
  module.exports = {
    toinit: oexercice.toinit
    };