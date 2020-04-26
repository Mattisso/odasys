const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID} = graphql;
// const {OreferenceType}= require('../oreference/oreferenceSchema').toinit();


const oexerciceSchema = (function () {
	const oExerciceType = new GraphQLObjectType({
			name: 'oExercice',
			fields: () => ({
				id: {
					type: GraphQLID
				},
				oExerciceEncour: {
					type: GraphQLString
				},
				ExercicePrev: {
					type: GraphQLString
				},
				OexercComptaPrevKey: {
					type: GraphQLString
				},
				OexercComptaEncourKey: {
					type: GraphQLString
				},
			})
		});

	function toinit() {
		return {
			oExerciceType: oExerciceType,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: oexerciceSchema.toinit
};
