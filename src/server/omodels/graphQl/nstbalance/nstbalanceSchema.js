const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID, GraphQLInt} = graphql;
const nstbalanceSchema = (function () {
	const nstBalanceType = new GraphQLObjectType({
			name: 'nstBalance',
			fields: () => ({
				id: {
					type: GraphQLID
				},
				SoldeCredit: {
					type: GraphQLInt
				},
				SoldeDebit: {
					type: GraphQLInt
				},
				NumCompte: {
					type: GraphQLString
				},
				IntitulCompte: {
					type: GraphQLString
				},
				OcompteKey: {
					type: GraphQLString
				},
				OreferenceKey: {
					type: GraphQLString
				},
				OtableauposteKey: {
					type: GraphQLString
				},
				OexercComptaKey: {
					type: GraphQLString
				},
			})
		});

	function toinit() {
		return {
			nstBalanceType: nstBalanceType,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: nstbalanceSchema.toinit
};
