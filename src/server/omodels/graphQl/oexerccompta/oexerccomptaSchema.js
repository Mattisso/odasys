const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID, GraphQLBoolean} = graphql;
//const {oReference} = require('../../modelsSchema/index').toinit();
// const {OreferenceType}= require('../oreference/oreferenceSchema').toinit();


const oexerccomptaSchema = (function () {
	const oExercComptaType = new GraphQLObjectType({
			name: 'oExercCompta',
			fields: () => ({
				id: {
					type: GraphQLID
				},
				DateDebut: {
					type: GraphQLString
				},
				Cloture: {
					type: GraphQLBoolean
				},
				Datefin: {
					type: GraphQLString
				},
				oExercComptaId: {
					type: GraphQLString
				},
			})
		});
	function toinit() {
		return {
			oExercComptaType: oExercComptaType,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: oexerccomptaSchema.toinit
};
