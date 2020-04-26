"use strict";

const graphql = require('graphql');
const {nstBalanceInput} = require('../../modelsSchema/index').toinit();
const {nstBalanceInputType}=require('./nstbalanceinputSchema').toinit();
const { GraphQLID,  GraphQLList} = graphql;


const nstbalanceinputQuery = (function () {
	const getnstbalanceinput = {
	type: nstBalanceInputType,
	args: {
		id: {
			type: GraphQLID
		}
	},
	resolve(parent, args, context, info) {
		return nstBalanceInput.findById(args.id);
	}
};
const getnstbalanceinputs = {
	type: new GraphQLList(nstBalanceInputType),
	resolve(parent, args, context, info) {
		return nstBalanceInput.find({});
	}
};
	function toinit() {
		return {
			getnstbalanceinput: getnstbalanceinput,
			getnstbalanceinputs: getnstbalanceinputs,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: nstbalanceinputQuery.toinit
};
