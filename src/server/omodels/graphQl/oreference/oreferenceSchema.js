
const {GraphQLObjectType, GraphQLString, GraphQLID,  GraphQLList} = require('graphql');
// const {Ocompte} = require('../../modelsSchema/index').toinit();
 // const {OcompteType}=require('../ocompte/ocompteSchema').toinit();

 const oreferenceSchema = (function () {
	const oReferenceType = new GraphQLObjectType({
			name: 'oReference',
			fields: () => ({
				id: {
					type: GraphQLID
				},
				Description: {
					type: GraphQLString
				},
				fullDescription: {
					type: GraphQLString
				},
				RefCode: {
					type: GraphQLString
				},
				ocomptes: {
					type: GraphQLString
				}
			})
		});
	function toinit() {
		return {
			oReferenceType: oReferenceType,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: oreferenceSchema.toinit
};
