const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID} = graphql;

const olevelSchema = (function () {

	const OlevelType = new GraphQLObjectType({
			name: 'Olevel',
			fields: () => ({
				id: {
					type: GraphQLID
				},
				olevelNum: {
					type: GraphQLString
				},
				olevelDescption: {
					type: GraphQLString
				}
			})
		});

	function toinit() {
		return {
			OlevelType: OlevelType,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: olevelSchema.toinit
};
