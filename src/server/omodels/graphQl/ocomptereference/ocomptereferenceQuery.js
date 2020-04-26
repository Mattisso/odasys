
"use strict";

const graphql = require('graphql');
const {OcompteReference} = require('../../modelsSchema/index').toinit();
const {OcompteReferenceType}=require('./ocomptereferenceSchema').toinit();
const { GraphQLID,  GraphQLList} = graphql;

const ocomptereferenceQuery = (function () {

	const getocomptereference = {
		type: OcompteReferenceType,
		args: {
			id: {
				type: GraphQLID
			}
		},
		resolve(parent, args, context, info) {
			return OcompteReference.findById(args.id);
		}
	};
	const getocomptereferences = {
		type: new GraphQLList(OcompteReferenceType),
		resolve(parent, args, context, info) {
			return OcompteReference.find({});
		}
	};
	function toinit() {
		return {
			getocomptereference: getocomptereference,
			getocomptereferences: getocomptereferences,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: ocomptereferenceQuery.toinit
};
