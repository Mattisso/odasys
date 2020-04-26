const graphql = require('graphql');
const {oReportHeader} = require('../../modelsSchema/index').toinit();
const {oReportHeaderType}=require('./oreportheaderSchema').toinit();
const { GraphQLObjectType,  GraphQLID,  GraphQLList} = graphql;



const oreportheaderQuery = (function () {
	const getoreportheader = {
	type: oReportHeaderType,
	args: {
		id: {
			type: GraphQLID
		}
	},
	resolve(parent, args, context, info) {
		return oReportHeader.findById(args.id);
	}
};
const getoreportheaders = {
	type: new GraphQLList(oReportHeaderType),
	resolve(parent, args, context, info) {
		return oReportHeader.find({});
	}
};
	function toinit() {
		return {
			getoreportheader: getoreportheader,
			getoreportheaders: getoreportheaders,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: oreportheaderQuery.toinit
};
