"use strict";

const graphql = require('graphql');
const {nttCompteBalanceDetail} = require('../../modelsSchema/index').toinit();
const {nttCompteBalanceDetailType}=require('./nttcomptebalancedetailSchema').toinit();
const { GraphQLID,  GraphQLList} = graphql;

const nttcomptebalancedetailQuery = (function () {
	const getnttcomptebalancedetail = {
		type: nttCompteBalanceDetailType,
		args: {
			id: {
				type: GraphQLID
			}
		},
		resolve(parent, args, context, info) {
			return nttCompteBalanceDetail.findById(args.id);
		}
	};
	const getnttcomptebalancedetails = {
		type: new GraphQLList(nttCompteBalanceDetailType),
		resolve(parent, args, context, info) {
			return nttCompteBalanceDetail.find({});
		}
	};
	function toinit() {
		return {
			getnttcomptebalancedetail: getnttcomptebalancedetail,
			getnttcomptebalancedetails: getnttcomptebalancedetails,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: nttcomptebalancedetailQuery.toinit
};
