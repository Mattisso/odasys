"use strict";

const graphql = require('graphql');
const {nstBalance} = require('../../modelsSchema/index').toinit();
const {nstBalanceType}=require('./nstbalanceSchema').toinit();
const { GraphQLID,  GraphQLList} = graphql;

const nstbalanceQuery = (function () {
	const getnstbalance = {
		type: nstBalanceType,
		args: {
			id: {
				type: GraphQLID
			}
		},
		resolve(parent, args, context, info) {
			return nstBalance.findById(args.id);
		}
	};
	const getnstbalances = {
		type: new GraphQLList(nstBalanceType),
		resolve(parent, args, context, info) {
			return nstBalance.find({});
		}
	};
	function toinit() {
		return {
			getnstbalance: getnstbalance,
			getnstbalances: getnstbalances,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: nstbalanceQuery.toinit
};
