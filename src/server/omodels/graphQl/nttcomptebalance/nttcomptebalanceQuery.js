"use strict";

const graphql = require('graphql');
const {nttCompteBalance} = require('../../modelsSchema/index').toinit();
const {nttCompteBalanceType}=require('./nttcomptebalanceSchema').toinit();
const { GraphQLID,  GraphQLList} = graphql;

const nttcomptebalanceQuery = (function () {
	const getnttcomptebalance = {
		type: nttCompteBalanceType,
		args: {
			id: {
				type: GraphQLID
			}
		},
		resolve(parent, args, context, info) {
			return nttCompteBalance.findById(args.id);
		}
	};
	const getnttcomptebalances = {
		type: new GraphQLList(nttCompteBalanceType),
		resolve(parent, args, context, info) {
			return nttCompteBalance.find({});
		}
	};
	function toinit() {
		return {
			getnttcomptebalance: getnttcomptebalance,
			getnttcomptebalances: getnttcomptebalances,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: nttcomptebalanceQuery.toinit
};
