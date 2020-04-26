const {nstBalanceType}=require('./nstbalanceSchema').toinit();
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,   GraphQLNonNull} = graphql;
const {nstBalance} = require('../../modelsSchema/index').toinit();
const {tonttbalance}=require('../../../features/nttbalance/staticNttbalance').toinit();
const nstbalanceMutation = (function () {
	const toCreateNstBalance = {
		type: nstBalanceType,
		args: {},
		resolve(parent, args, context, info) {
			let nstbalance = new nstBalance({});
			return nstbalance.save();
		}
	};
	const toUpdateNstBalance = {
		type: nstBalanceType,
		args: {},
		resolve(parent, args, context, info) {
			let nstbalance = new nstBalance({});
			return nstbalance.save();
		}
	};
	const toDeleteNstBalance = {
		type: nstBalanceType,
		args: {},
		resolve(parent, args, context, info) {
			let nstbalance = new nstBalance({});
			return nstbalance.save();
		}
	};
	function toinit() {
		return {
			toCreateNstBalance: toCreateNstBalance,
			toUpdateNstBalance: toUpdateNstBalance,
			toDeleteNstBalance: toDeleteNstBalance,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: nstbalanceMutation.toinit
};
