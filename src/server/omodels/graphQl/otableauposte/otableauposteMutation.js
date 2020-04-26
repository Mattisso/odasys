const {oTableauPosteType}=require('./otableauposteSchema').toinit();
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,   GraphQLNonNull} = graphql;
const {oTableauPoste} = require('../../modelsSchema/index').toinit();


const otableauposteMutation = (function () {

	const toCreateOTableauPoste = {
	type: oTableauPosteType,
	args: {},
	resolve(parent, args, context, info) {
		let otableauposte = new oTableauPoste({});
		return otableauposte.save();
	}
};
const toUpdateOTableauPoste = {
	type: oTableauPosteType,
	args: {},
	resolve(parent, args, context, info) {
		let otableauposte = new oTableauPoste({});
		return otableauposte.save();
	}
};
const toDeleteOTableauPoste = {
	type: oTableauPosteType,
	args: {},
	resolve(parent, args, context, info) {
		let otableauposte = new oTableauPoste({});
		return otableauposte.save();
	}
};

	function toinit() {
		return {
			toCreateOTableauPoste: toCreateOTableauPoste,
			toUpdateOTableauPoste: toUpdateOTableauPoste,
			toDeleteOTableauPoste: toDeleteOTableauPoste,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: otableauposteMutation.toinit
};
