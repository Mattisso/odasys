const  {toCreateNstBalance,toUpdateNstBalance,toDeleteNstBalance}=require('./nstbalance/nstbalanceMutation').toinit();
const  {toCreateNstBalanceInput,toUpdateNstBalanceInput,toDeleteNstBalanceInput}=require('./nstbalanceinput/nstbalanceinputMutation').toinit();
const  {toCreateNttBalance,toUpdateNttBalance,toDeleteNttBalance}=require('./nttbalance/nttbalanceMutation').toinit();
const  {toCreateNttCompteBalance,toUpdateNttCompteBalance,toDeleteNttCompteBalance}=require('./nttcomptebalance/nttcomptebalanceMutation').toinit();
const  {toCreateNttCompteBalanceDetail,toUpdateNttCompteBalanceDetail,toDeleteNttCompteBalanceDetail}=require('./nttcomptebalancedetail/nttcomptebalancedetailMutation').toinit();
const  {toCreateOcompte,toUpdateOcompte,toDeleteOcompte}=require('./ocompte/ocompteMutation').toinit();
const  {toCreateOcompteReference,toUpdateOcompteReference,toDeleteOcompteReference}=require('./ocomptereference/ocomptereferenceMutation').toinit();
const  {toCreateOExercCompta,toUpdateOExercCompta,toDeleteOExercCompta}=require('./oexerccompta/oexerccomptaMutation').toinit();
const  {toCreateOExercice,toUpdateOExercice,toDeleteOExercice}=require('./oexercice/oexerciceMutation').toinit();
const  {toCreateOlevel,toUpdateOlevel,toDeleteOlevel}=require('./olevel/olevelMutation').toinit();
const  {toCreateOReference,toUpdateOReference,toDeleteOReference}=require('./oreference/oreferenceMutation').toinit();
const  {toCreateOReportDetail,toUpdateOReportDetail,toDeleteOReportDetail}=require('./oreportdetail/oreportdetailMutation').toinit();
const  {toCreateOReportHeader,toUpdateOReportHeader,toDeleteOReportHeader}=require('./oreportheader/oreportheaderMutation').toinit();
const  {toCreateOStableauPoste,toUpdateOStableauPoste,toDeleteOStableauPoste}=require('./ostableauposte/ostableauposteMutation').toinit();
const  {toCreateOStblArea,toUpdateOStblArea,toDeleteOStblArea}=require('./ostblarea/ostblareaMutation').toinit();
const  {toCreateOTableauPoste,toUpdateOTableauPoste,toDeleteOTableauPoste}=require('./otableauposte/otableauposteMutation').toinit();
const  {toCreateUser,toUpdateUser,toDeleteUser}=require('./user/userMutation').toinit();
const mutations = (function () {
  const togetRootMutation = {
    toCreateNstBalance: toCreateNstBalance,
    toUpdateNstBalance: toUpdateNstBalance,
    toDeleteNstBalance: toDeleteNstBalance,
    toCreateNstBalanceInput: toCreateNstBalanceInput,
    toUpdateNstBalanceInput: toUpdateNstBalanceInput,
    toDeleteNstBalanceInput: toDeleteNstBalanceInput,
    toCreateNttBalance: toCreateNttBalance,
    toUpdateNttBalance: toUpdateNttBalance,
    toDeleteNttBalance: toDeleteNttBalance,
    toCreateNttCompteBalance: toCreateNttCompteBalance,
    toUpdateNttCompteBalance: toUpdateNttCompteBalance,
    toDeleteNttCompteBalance: toDeleteNttCompteBalance,
    toCreateNttCompteBalanceDetail: toCreateNttCompteBalanceDetail,
    toUpdateNttCompteBalanceDetail: toUpdateNttCompteBalanceDetail,
    toDeleteNttCompteBalanceDetail: toDeleteNttCompteBalanceDetail,
    toCreateOcompte: toCreateOcompte,
    toUpdateOcompte: toUpdateOcompte,
    toDeleteOcompte: toDeleteOcompte,
    toCreateOcompteReference: toCreateOcompteReference,
    toUpdateOcompteReference: toUpdateOcompteReference,
    toDeleteOcompteReference: toDeleteOcompteReference,
    toCreateOExercCompta: toCreateOExercCompta,
    toUpdateOExercCompta: toUpdateOExercCompta,
    toDeleteOExercCompta: toDeleteOExercCompta,
    toCreateOExercice: toCreateOExercice,
    toUpdateOExercice: toUpdateOExercice,
    toDeleteOExercice: toDeleteOExercice,
    toCreateOlevel: toCreateOlevel,
    toUpdateOlevel: toUpdateOlevel,
    toDeleteOlevel: toDeleteOlevel,
    toCreateOReference: toCreateOReference,
    toUpdateOReference: toUpdateOReference,
    toDeleteOReference: toDeleteOReference,
    toCreateOReportDetail: toCreateOReportDetail,
    toUpdateOReportDetail: toUpdateOReportDetail,
    toDeleteOReportDetail: toDeleteOReportDetail,
    toCreateOReportHeader: toCreateOReportHeader,
    toUpdateOReportHeader: toUpdateOReportHeader,
    toDeleteOReportHeader: toDeleteOReportHeader,
    toCreateOStableauPoste: toCreateOStableauPoste,
    toUpdateOStableauPoste: toUpdateOStableauPoste,
    toDeleteOStableauPoste: toDeleteOStableauPoste,
    toCreateOStblArea: toCreateOStblArea,
    toUpdateOStblArea: toUpdateOStblArea,
    toDeleteOStblArea: toDeleteOStblArea,
    toCreateOTableauPoste: toCreateOTableauPoste,
    toUpdateOTableauPoste: toUpdateOTableauPoste,
    toDeleteOTableauPoste: toDeleteOTableauPoste,
    toCreateUser: toCreateUser,
    toUpdateUser: toUpdateUser,
    toDeleteUser: toDeleteUser
  };
  function toinit() {
    return {
      togetRootMutation: togetRootMutation
    };
  }
  return {
    toinit: toinit
  };
})();
module.exports = {
  toinit: mutations.toinit
};
