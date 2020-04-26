const {oReportDetailType}=require('./oreportdetailSchema').toinit();
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,   GraphQLNonNull} = graphql;
const {oReportDetail} = require('../../modelsSchema/index').toinit();

const oreportdetailMutation = (function () {
	const toCreateOReportDetail = {
	type: oReportDetailType,
	args: {},
	resolve(parent, args, context, info) {
		let oreportdetail = new oReportDetail({});
		return oreportdetail.save();
	}
};
const toUpdateOReportDetail = {
	type: oReportDetailType,
	args: {},
	resolve(parent, args, context, info) {
		let oreportdetail = new oReportDetail({});
		return oreportdetail.save();
	}
};
const toDeleteOReportDetail = {
	type: oReportDetailType,
	args: {},
	resolve(parent, args, context, info) {
		let oreportdetail = new oReportDetail({});
		return oreportdetail.save();
	}
};
	function toinit() {
		return {
			toCreateOReportDetail: toCreateOReportDetail,
			toUpdateOReportDetail: toUpdateOReportDetail,
			toDeleteOReportDetail: toDeleteOReportDetail,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: oreportdetailMutation.toinit
};

