const graphql = require('graphql');
const {Olevel} = require('../../modelsSchema/index').toinit();
const {OlevelType}=require('./olevelSchema').toinit();
const { GraphQLObjectType,  GraphQLID,  GraphQLList} = graphql;



const olevelQuery = (function () {
	const getolevel = {
	type: OlevelType,
	args: {
		id: {
			type: GraphQLID
		}
	},
	resolve(parent, args, context, info) {
		return Olevel.findById(args.id);
	}
};
const getolevels = {
	type: new GraphQLList(OlevelType),
	resolve(parent, args, context, info) {
		return Olevel.find({});
	}
};
	function toinit() {
		return {
			getolevel: getolevel,
			getolevels: getolevels,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: olevelQuery.toinit
};
