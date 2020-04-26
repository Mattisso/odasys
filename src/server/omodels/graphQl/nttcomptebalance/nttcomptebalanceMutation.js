const {nttCompteBalanceType}=require('./nttcomptebalanceSchema').toinit();
const graphql = require('graphql');
const {nttCompteBalance} = require('../../modelsSchema/index').toinit();
const NttCompteBalanceMutation = (function () {
	const toCreateNttCompteBalance = {
    type: nttCompteBalanceType,
    args: {},
    resolve(parent, args, context, info) {
      let nttcomptebalance = new nttCompteBalance({});
      return nttcomptebalance.save();
    }
  };
  const toUpdateNttCompteBalance = {
    type: nttCompteBalanceType,
    args: {},
    resolve(parent, args, context, info) {
      let nttcomptebalance = new nttCompteBalance({});
      return nttcomptebalance.save();
    }
  };
  const toDeleteNttCompteBalance = {
    type: nttCompteBalanceType,
    args: {},
    resolve(parent, args, context, info) {
      let nttcomptebalance = new nttCompteBalance({});
      return nttcomptebalance.save();
    }
  };

	function toinit() {
		return {
			toCreateNttCompteBalance: toCreateNttCompteBalance,
			toUpdateNttCompteBalance: toUpdateNttCompteBalance,
			toDeleteNttCompteBalance: toDeleteNttCompteBalance
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: NttCompteBalanceMutation.toinit
};
