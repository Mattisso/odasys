const {OcompteReferenceType}=require('./ocomptereferenceSchema').toinit();
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,   GraphQLNonNull} = graphql;
const {OcompteReference} = require('../../modelsSchema/index').toinit();

const ocomptereferenceMutation = (function () {
	const toCreateOcompteReference = {
		type: OcompteReferenceType,
		args: {},
		resolve(parent, args, context, info) {
			let ocomptereference = new OcompteReference({});
			return ocomptereference.save();
		}
	};
	const toUpdateOcompteReference = {
		type: OcompteReferenceType,
		args: {},
		resolve(parent, args, context, info) {
			let ocomptereference = new OcompteReference({});
			return ocomptereference.save();
		}
	};
	const toDeleteOcompteReference = {
		type: OcompteReferenceType,
		args: {},
		resolve(parent, args, context, info) {
			let ocomptereference = new OcompteReference({});
			return ocomptereference.save();
		}
	};
	OcompteReference;
	function toinit() {
		return {
			toCreateOcompteReference: toCreateOcompteReference,
			toUpdateOcompteReference: toUpdateOcompteReference,
			toDeleteOcompteReference: toDeleteOcompteReference,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: ocomptereferenceMutation.toinit
};
