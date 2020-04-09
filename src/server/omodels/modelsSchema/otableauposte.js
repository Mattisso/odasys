const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const {getauditentity, gettoObject ,extendSchema, auditEntityPlugin} = require('../helpers/odabaseSchema').toinit();
const {otableauposteClass, modelObject}=require('../modelClass/otableauposteClass').tonit();
const otableauposte = (function(){
	const auditBaseSchema = new Schema(getauditentity, gettoObject);
	const otableauPosteSchema = extendSchema(auditBaseSchema, modelObject);
	otableauPosteSchema.loadClass(otableauposteClass);
	otableauPosteSchema.plugin(auditEntityPlugin);

	  otableauPosteSchema.virtual('ostableauposte')
	  .set(function(ostableauposte){
		this.OstableauposteKey = ostableauposte;
		}).get(function() {
		return this.OstableauposteKey;
		});	
/*
	otableauPosteSchema.virtual('subtableaupostes', {
		ref: 'oStableauPoste', // The model to use
		localField: 'ostableaupostes', // Find people where `localField`
		foreignField: '_id', // is equal to `foreignField`
		// If `justOne` is true, 'members' will be a single doc as opposed to
		// an array. `justOne` is false by default.
		justOne: false
	});
	
	*/
	
	let oTableauPoste = mongoose.model('oTableauPoste', otableauPosteSchema);
function toinit(){
	return {
		oTableauPoste:oTableauPoste
	}
	
}
return {
toinit:toinit
}
})();
module.exports={
	toinit: otableauposte.toinit
} 

// require('../../config/ohadb').connectserver();
const obj = {
    "tblRefCode": "BZ",
    "Description": "Total General ( I +  II +  III +  IV)",
    "TableauName": "tblActif",
    "tableauLongName": "Bilan Actif",
    "ostableaupostes": [{
        "StableauName": "tblAmortImmo"
      }, {
        "StableauName": "tblBilanActif"
      }, {
        "StableauName": "tblProvision"
      }
    ]

  }


// otableauposte.toinit().oTableauPoste.create(obj);
// const obj={ olevelNum: '86'}
/* var small = otableauposte.toinit().oTableauPoste(obj);
small.save(function (err) {
if (err) return handleError(err);
// saved!
});  */
 /*otableauposte.toinit().oTableauPoste.find({}, function (err, data) {
if (err)
  throw err;
console.log(JSON.stringify(data));
});*/
 