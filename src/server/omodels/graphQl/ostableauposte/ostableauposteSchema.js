const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql;
const {
  oReference
} = require('../../modelsSchema/index').toinit();
// const {OreferenceType}= require('../oreference/oreferenceSchema').toinit();
const ostableauposteSchema = (function () {
	const oStableauPosteType = new GraphQLObjectType({
			name: 'oStableauPoste',
			fields: () => ({
				id: {
					type: GraphQLID
				},
				StableauName: {
					type: GraphQLString
				},
				StbleauLongName: {
					type: GraphQLString
				},
				OtableauposteKey: {
					type: GraphQLString
				},
				ostblareas: {
					type: GraphQLString
				},
			})
		});
	function toinit() {
		return {
			oStableauPosteType: oStableauPosteType,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: ostableauposteSchema.toinit
};
