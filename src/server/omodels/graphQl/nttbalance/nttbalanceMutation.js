const {nttBalanceType}=require('./nttbalanceSchema').toinit();
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,   GraphQLNonNull} = graphql;
const {nttBalance} = require('../../modelsSchema/index').toinit();
const {tonttbalance}=require('../../../features/nttbalance/staticNttbalance').toinit();
const nttbalanceMutation = (function () {
	const toCreateNttBalance = {
		type: nttBalanceType,
		args: {},
		resolve(parent, args, context, info) {
			let nttbalance = new nttBalance({});
			return nttbalance.save();
		}
	};
	const toUpdateNttBalance = {
		type: nttBalanceType,
		args: {},
		resolve(parent, args, context, info) {
			let nttbalance = new nttBalance({});
			return nttbalance.save();
		}
	};
	const toDeleteNttBalance = {
		type: nttBalanceType,
		args: {},
		resolve(parent, args, context, info) {
			let nttbalance = new nttBalance({});
			return nttbalance.save();
		}
	};
	function toinit() {
		return {
			toCreateNttBalance: toCreateNttBalance,
			toUpdateNttBalance: toUpdateNttBalance,
			toDeleteNttBalance: toDeleteNttBalance,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: nttbalanceMutation.toinit
};
