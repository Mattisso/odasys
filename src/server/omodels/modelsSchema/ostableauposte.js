const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const {getauditentity, gettoObject ,extendSchema, auditEntityPlugin} = require('../helpers/odabaseSchema').toinit();
const {ostableauposteClass, modelObject}=require('../modelClass/ostableauposteClass').toinit()

const ostableauposte = (function () {
	const auditBaseSchema = new Schema(getauditentity, gettoObject);
	const oStableauPosteSchema = extendSchema(auditBaseSchema, modelObject);
	oStableauPosteSchema.loadClass(ostableauposteClass);
	oStableauPosteSchema.plugin(auditEntityPlugin);
	oStableauPosteSchema.index({
		StableauName: 1
	});

	oStableauPosteSchema.virtual('ostblarea').set(function (ostblarea) {
		this._ostblarea = ostblarea;
	}).get(function () {
		return this._ostblarea;
	});

	let oStableauPoste = mongoose.model('oStableauPoste', oStableauPosteSchema);

	/*
	oStableauPosteSchema.virtual('subostblareas', {
	ref: 'oStblArea', // The model to use
	localField: '_id', // Find people where `localField`
	foreignField: 'OstableauposteKey', // is equal to `foreignField`
	// If `justOne` is true, 'members' will be a single doc as opposed to
	// an array. `justOne` is false by default.
	justOne: false
	});*/

	function toinit() {
		return {
			oStableauPoste: oStableauPoste
		}
	}

	return {
		toinit: toinit
	}

})()
module.exports = {
	toinit: ostableauposte.toinit
};
// require('../../config/ohadb').connectserver();
const obj = {
  "StableauName": "tblAmortImmo",
  "StbleauLongName": "Amortissements",
  "ostblareas": [{ "AreaShortName": "AmortImmo" }]}


// ostableauposte.toinit().oStableauPoste.create(obj);
// const obj={ olevelNum: '86'}
/*var small = ostableauposte.toinit().oStableauPoste(obj);
small.save(function (err) {
if (err) return handleError(err);
// saved!
}); */
/*ostableauposte.toinit().oStableauPoste.find({}, function (err, data) {
if (err)
  throw err;
console.log(JSON.stringify(data));
});*/
