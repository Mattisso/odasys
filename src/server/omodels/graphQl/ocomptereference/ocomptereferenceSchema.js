const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID, GraphQLFloat, GraphQLBoolean} = graphql;
const {oReference} = require('../../modelsSchema/index').toinit();
// const {OreferenceType}= require('../oreference/oreferenceSchema').toinit();
const ocomptereferenceSchema = (function () {
	const OcompteReferenceType = new GraphQLObjectType({
			name: 'OcompteReference',
			fields: () => ({
				id: {
					type: GraphQLID
				},
				OcompteKey: {
					type: GraphQLString
				},
				OstblareaKey: {
					type: GraphQLString
				},
				OreferenceKey: {
					type: GraphQLString
				},
				OtableauposteKey: {
					type: GraphQLString
				},
				OstableauposteKey: {
					type: GraphQLString
				},
				Exception: {
					type: GraphQLBoolean
				},
				Taux: {
					type: GraphQLFloat
				},
			})
		});
	function toinit() {
		return {
			OcompteReferenceType: OcompteReferenceType,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: ocomptereferenceSchema.toinit
};
