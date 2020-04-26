const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID, GraphQLInt} = graphql;
const nttbalanceSchema = (function () {
	const nttBalanceType = new GraphQLObjectType({
			name: 'nttBalance',
			fields: () => ({
				id: {
					type: GraphQLID
				},
				OtableauposteKey: {
					type: GraphQLString
				},
				OexercComptaKey: {
					type: GraphQLString
				},
				OcompteKey: {
					type: GraphQLString
				},
				OreferenceKey: {
					type: GraphQLString
				},
				NumCompte: {
					type: GraphQLString
				},
				IntitulCompte: {
					type: GraphQLString
				},
				SoldeDebit: {
					type: GraphQLInt
				},
				SoldeCredit: {
					type: GraphQLInt
				},
			})
		});

	function toinit() {
		return {
			nttBalanceType: nttBalanceType,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: nttbalanceSchema.toinit
};
