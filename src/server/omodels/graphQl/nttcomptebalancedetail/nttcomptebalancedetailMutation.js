const {nttCompteBalanceDetailType}=require('./nttcomptebalancedetailSchema').toinit();
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,   GraphQLNonNull, GraphQLInt} = graphql;
const {nttCompteBalanceDetail} = require('../../modelsSchema/index').toinit();

const nttcomptebalancedetailMutation = (function () {
	const toCreateNttCompteBalanceDetail = {
		type: nttCompteBalanceDetailType,
		args: {
			nttcomptebalanceKey: {
				type: GraphQLString
			},
			NumCompte: {
				type: GraphQLString
			},
			IntitulCompte: {
				type: GraphQLInt
			},
			SoldeDebit: {
				type: GraphQLInt
			},
			SoldeCredit: {
				type: GraphQLInt
			},
		},
		resolve(parent, args, context, info) {
			let nttcomptebalancedetail = new nttCompteBalanceDetail({});
			return nttcomptebalancedetail.save();
		}
	};
	const toUpdateNttCompteBalanceDetail = {
		type: nttCompteBalanceDetailType,
		args: {},
		resolve(parent, args, context, info) {
			let nttcomptebalancedetail = new nttCompteBalanceDetail({});
			return nttcomptebalancedetail.save();
		}
	};
	const toDeleteNttCompteBalanceDetail = {
		type: nttCompteBalanceDetailType,
		args: {},
		resolve(parent, args, context, info) {
			let nttcomptebalancedetail = new nttCompteBalanceDetail({});
			return nttcomptebalancedetail.save();
		}
	};

	function toinit() {
		return {
			toCreateNttCompteBalanceDetail: toCreateNttCompteBalanceDetail,
			toUpdateNttCompteBalanceDetail: toUpdateNttCompteBalanceDetail,
			toDeleteNttCompteBalanceDetail: toDeleteNttCompteBalanceDetail
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: nttcomptebalancedetailMutation.toinit
};
