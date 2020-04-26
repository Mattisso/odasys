const graphql = require('graphql');
const {oStblArea} = require('../../modelsSchema/index').toinit();
const {oStblAreaType}=require('./ostblareaSchema').toinit();
const { GraphQLObjectType,  GraphQLID,  GraphQLList} = graphql;


const ostblareaQuery = (function () {
	const getostblarea = {
	type: oStblAreaType,
	args: {
		id: {
			type: GraphQLID
		}
	},
	resolve(parent, args, context, info) {
		return oStblArea.findById(args.id);
	}
};
const getostblareas = {
	type: new GraphQLList(oStblAreaType),
	resolve(parent, args, context, info) {
		return oStblArea.find({});
	}
};
	function toinit() {
		return {
			getostblarea: getostblarea,
			getostblareas: getostblareas,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: ostblareaQuery.toinit
};
