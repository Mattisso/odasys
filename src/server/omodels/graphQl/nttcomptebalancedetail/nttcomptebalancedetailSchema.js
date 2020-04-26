const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID, GraphQLInt} = graphql;
const nttcomptebalancedetailSchema = (function () {
	const nttCompteBalanceDetailType = new GraphQLObjectType({
			name: 'nttCompteBalanceDetail',
			fields: () => ({
				id: {
					type: GraphQLID
				},

				nttcomptebalanceKey: {
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
				AmortAmnt: {
					type: GraphQLInt
				},
				ProvisAmnt: {
					type: GraphQLInt
				},
				NetAmnt: {
					type: GraphQLInt
				}

			})
		});

	function toinit() {
		return {
			nttCompteBalanceDetailType: nttCompteBalanceDetailType
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: nttcomptebalancedetailSchema.toinit
};
