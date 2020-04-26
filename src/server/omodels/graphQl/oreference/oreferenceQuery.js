const graphql = require('graphql');
const {oReference} = require('../../modelsSchema/index').toinit();
const {oReferenceType}=require('./oreferenceSchema').toinit();
const { GraphQLID,   GraphQLList} = graphql;


const oreferenceQuery = (function () {
	const getoreference = {
	type: oReferenceType,
	args: {
		id: {
			type: GraphQLID
		}
	},
	resolve(parent, args, context, info) {
		return oReference.findById(args.id);
	}
};
const getoreferences = {
	type: new GraphQLList(oReferenceType),
	resolve(parent, args, context, info) {
		return oReference.find({});
	}
};
	function toinit() {
		return {
			getoreference: getoreference,
			getoreferences: getoreferences,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: oreferenceQuery.toinit
};
