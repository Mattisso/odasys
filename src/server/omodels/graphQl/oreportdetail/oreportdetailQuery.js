const graphql = require('graphql');
const {oReportDetail} = require('../../modelsSchema/index').toinit();
const {oReportDetailType}=require('./oreportdetailSchema').toinit();
const { GraphQLObjectType,  GraphQLID,  GraphQLList} = graphql;

const oreportdetailQuery = (function () {
	const getoreportdetail = {
	type: oReportDetailType,
	args: {
		id: {
			type: GraphQLID
		}
	},
	resolve(parent, args, context, info) {
		return oReportDetail.findById(args.id);
	}
};
const getoreportdetails = {
	type: new GraphQLList(oReportDetailType),
	resolve(parent, args, context, info) {
		return oReportDetail.find({});
	}
};
	function toinit() {
		return {
			getoreportdetail: getoreportdetail,
			getoreportdetails: getoreportdetails,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: oreportdetailQuery.toinit
};
