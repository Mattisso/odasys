const {oReportHeaderType}=require('./oreportheaderSchema').toinit();
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,   GraphQLNonNull} = graphql;
const {oReportHeader} = require('../../modelsSchema/index').toinit();


const oreportheaderMutation = (function () {
	const toCreateOReportHeader = {
	type: oReportHeaderType,
	args: {},
	resolve(parent, args, context, info) {
		let oreportheader = new oReportHeader({});
		return oreportheader.save();
	}
};
const toUpdateOReportHeader = {
	type: oReportHeaderType,
	args: {},
	resolve(parent, args, context, info) {
		let oreportheader = new oReportHeader({});
		return oreportheader.save();
	}
};
const toDeleteOReportHeader = {
	type: oReportHeaderType,
	args: {},
	resolve(parent, args, context, info) {
		let oreportheader = new oReportHeader({});
		return oreportheader.save();
	}
};

	function toinit() {
		return {
			toCreateOReportHeader: toCreateOReportHeader,
			toUpdateOReportHeader: toUpdateOReportHeader,
			toDeleteOReportHeader: toDeleteOReportHeader,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: oreportheaderMutation.toinit
};
