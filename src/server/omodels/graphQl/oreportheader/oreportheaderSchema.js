const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID, GraphQLInt} = graphql;
const {oReference} = require('../../modelsSchema/index').toinit();
// const {OreferenceType}= require('../oreference/oreferenceSchema').toinit();
const oreportheaderSchema = (function () {
	const oReportHeaderType = new GraphQLObjectType({
			name: 'oReportHeader',
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
				SortOrderH: {
					type: GraphQLInt
				},
			})
		});

	function toinit() {
		return {
			oReportHeaderType: oReportHeaderType,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: oreportheaderSchema.toinit
};
