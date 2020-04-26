const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID} = graphql;
// const {OreferenceType}= require('../oreference/oreferenceSchema').toinit();

const ostblareaSchema = (function () {
	const oStblAreaType = new GraphQLObjectType({
			name: 'oStblArea',
			fields: () => ({
				id: {
					type: GraphQLID
				},
				AreaShortName: {
					type: GraphQLString
				},
				AreaLongName: {
					type: GraphQLString
				},
				ocomptes: {
					type: GraphQLString
				}
			})
		});

	function toinit() {
		return {
			oStblAreaType: oStblAreaType,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: ostblareaSchema.toinit
};
