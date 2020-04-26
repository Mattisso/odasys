const {oStableauPosteType}=require('./ostableauposteSchema').toinit();
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,   GraphQLNonNull} = graphql;
const {oStableauPoste} = require('../../modelsSchema/index').toinit();


const ostableauposteMutation = (function () {
	const toCreateOStableauPoste = {
	type: oStableauPosteType,
	args: {},
	resolve(parent, args, context, info) {
		let ostableauposte = new oStableauPoste({});
		return ostableauposte.save();
	}
};
const toUpdateOStableauPoste = {
	type: oStableauPosteType,
	args: {},
	resolve(parent, args, context, info) {
		let ostableauposte = new oStableauPoste({});
		return ostableauposte.save();
	}
};
const toDeleteOStableauPoste = {
	type: oStableauPosteType,
	args: {},
	resolve(parent, args, context, info) {
		let ostableauposte = new oStableauPoste({});
		return ostableauposte.save();
	}
};
	function toinit() {
		return {
			toCreateOStableauPoste: toCreateOStableauPoste,
			toUpdateOStableauPoste: toUpdateOStableauPoste,
			toDeleteOStableauPoste: toDeleteOStableauPoste,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: ostableauposteMutation.toinit
};

