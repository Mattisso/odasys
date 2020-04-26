const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,  GraphQLID, GraphQLInt} = graphql;
const nttcomptebalanceSchema = (function () {
	const nttCompteBalanceType = new GraphQLObjectType({
			name: 'nttCompteBalance',
			fields: () => ({
				id: {
					type: GraphQLID
				},
        OexercComptaKey: {
          type: GraphQLString
        },
        OtableauposteKey: {
          type: GraphQLString
        },
        OreferenceKey: {
          type: GraphQLString
        },
        totalSoldeDebit: {
          type: GraphQLInt
        },
        totalSoldeCredit: {
          type: GraphQLInt
        },
        TotalAmortissment: {
          type: GraphQLInt
        },
        TotalProvision: {
          type: GraphQLInt
        },
        amntNet: {
          type: GraphQLInt
        },
        nttcomptebalancedetails: {
          type: GraphQLString
        }
			})
		});

	function toinit() {
		return {
			nttCompteBalanceType: nttCompteBalanceType,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: nttcomptebalanceSchema.toinit
};
