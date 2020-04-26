const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,   GraphQLNonNull} = graphql;

const {oReference} = require('../../modelsSchema/index').toinit();
const {oReferenceType} = require('../oreference/oreferenceSchema').toinit();


const oreferenceMutation = (function () {
	const toCreateOReference = {
		type: oReferenceType,
		args: {},
		resolve(parent, args, context, info) {
			let oreference = new oReference({});
			return oreference.save();
		}
	};
	const toUpdateOReference = {
		type: oReferenceType,
		args: {},
		resolve(parent, args, context, info) {
			let oreference = new oReference({});
			return oreference.save();
		}
	};
	const toDeleteOReference = {
		type: oReferenceType,
		args: {},
		resolve(parent, args, context, info) {
			let oreference = new oReference({});
			return oreference.save();
		}
	};
	function toinit() {
		return {
			toCreateOReference: toCreateOReference,
			toUpdateOReference: toUpdateOReference,
			toDeleteOReference: toDeleteOReference,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: oreferenceMutation.toinit
};
