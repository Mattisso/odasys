const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const {getauditentity, gettoObject ,extendSchema, auditEntityPlugin} = require('../helpers/odabaseSchema').toinit();
const {OcompteClass, ocompteObj}=require('../modelClass/ocompteClass').toinit();

const ocompte= (function(){
  const auditBaseSchema = new Schema(getauditentity,gettoObject);
  const ocompteschema = extendSchema(auditBaseSchema, ocompteObj);
  ocompteschema.loadClass(OcompteClass);
  ocompteschema.plugin(auditEntityPlugin);
  ocompteschema.index({
    CompteNumber: 1
  });

  let Ocompte = mongoose.model('Ocompte', ocompteschema);
  function toinit() {
    return {
      Ocompte: Ocompte    
    };
    }
   return {
    toinit: toinit
    };   
})();
  module.exports = {
    toinit: ocompte.toinit
    };

