"use strict";

const graphql = require('graphql');
const {nttBalance} = require('../../modelsSchema/index').toinit();
const {nttBalanceType}=require('./nttbalanceSchema').toinit();
const { GraphQLID,  GraphQLList} = graphql;
const nttbalanceQuery = (function () {
	const getnttbalance = {
		type: nttBalanceType,
		args: {
			id: {
				type: GraphQLID
			}
		},
		resolve(parent, args, context, info) {
			return nttBalance.findById(args.id);
		}
	};
	const getnttbalances = {
		type: new GraphQLList(nttBalanceType),
		resolve(parent, args, context, info) {
			return nttBalance.find({});
		}
	};
	function toinit() {
		return {
			getnttbalance: getnttbalance,
			getnttbalances: getnttbalances,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: nttbalanceQuery.toinit
};
