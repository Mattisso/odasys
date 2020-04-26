const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID, GraphQLInt} = graphql;

const oreportdetailSchema = (function () {
	const oReportDetailType = new GraphQLObjectType({
		name: 'oReportDetail',
		fields: () => ({
			id: {
				type: GraphQLID
			},
			OtableauposteKey: {
				type: GraphQLString
			},
			OreferenceKey: {
				type: GraphQLString
			},
			olevelKey: {
				type: GraphQLString
			},
			SortOrder: {
				type: GraphQLInt
			},
		})
	});
	function toinit() {
		return {
			oReportDetailType: oReportDetailType
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: oreportdetailSchema.toinit
};

