const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const { getauditentity, gettoObject, extendSchema, auditEntityPlugin} = require('../helpers/odabaseSchema').toinit();
const {ocompteReferenceClass,modelObject}=require('../modelClass/ocomptereferenceClass').toinit();


const  ocomptereference = (function(){
	const auditBaseSchema = new Schema(getauditentity, gettoObject);
	const OcompteReferenceSchema = extendSchema(auditBaseSchema, modelObject);
   
	OcompteReferenceSchema.loadClass(ocompteReferenceClass);
	OcompteReferenceSchema.plugin(auditEntityPlugin);
	OcompteReferenceSchema.index(
		{OcompteKey:1,
		OstblareaKey:1,
		OreferenceKey:1,
		OtableauposteKey:1,
		OstableauposteKey:1,
		Exception:1,
		Taux:1
	  });
	  
	  OcompteReferenceSchema.virtual('suboreferences', {
		  ref: 'oReference', // The model to use
		  localField: 'oreferences', // Find people where `localField`
		  foreignField: '_id', // is equal to `foreignField`
		  // If `justOne` is true, 'members' will be a single doc as opposed to
		  // an array. `justOne` is false by default.
		  justOne: false
		});
	  
		OcompteReferenceSchema.virtual('ostableauposte')
		.set(function(ostableauposte){
		  this.OstableauposteKey = ostableauposte;
		  }).get(function() {
		  return this.OstableauposteKey;
		  });
	  
		OcompteReferenceSchema.virtual('ocompte')
		.set(function(ocompte){
		  this._ocompte= ocompte;
		})
		.get(function() {
		  return this._ocompte;
		});
	  

let OcompteReference = mongoose.model('OcompteReference', OcompteReferenceSchema);

function toinit() {
	return {
OcompteReference:OcompteReference
	}
}
return {
	toinit:toinit
}
})();
module.exports={
toinit:ocomptereference.toinit
}


