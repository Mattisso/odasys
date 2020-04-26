//['ocomptes','oreferences','orptgroupingas','orptgroupingbs','orptgroupingcs','ostableaupostes','ostblareas','otableaugestions','otableaupostes','OcompteReference']

"use strict";
var index = (function () {
  function toinit() {
    return {
      'Ocompte': require('./ocompte').toinit().Ocompte,
      'oReference': require('./oreference').toinit().oReference,
      'nstBalance': require('./nstBalance').toinit().nstBalance,
      'nstBalanceInput': require('./nstbalanceinput').toinit().nstBalanceInput,
      'nttBalance': require('./nttBalance').toinit().nttBalance,
      'nttCompteBalance': require('./nttcomptebalance').toinit().nttCompteBalance,
      'nttCompteBalanceDetail': require('./nttcomptebalancedetail').toinit().nttCompteBalanceDetail,
      'oExercCompta': require('./oexerccompta').toinit().oExercCompta,
      'oExercice': require('./oexercice').toinit().oExercice,
      //'oRptGroupingA': require('./orptgroupingA').toinit(),
     // 'oRptGroupingB': require('./orptgroupingB').toinit(),
    //  'oRptGroupingC': require('./orptgroupingC').toinit(),
      'oStableauPoste': require('./ostableauposte').toinit().oStableauPoste,
      'oStblArea': require('./ostblarea').toinit().oStblArea,
      'oTableauPoste': require('./otableauPoste').toinit().oTableauPoste,
     // 'oGestion': require('./ogestion').toinit(),
      'olevel': require('./olevel').toinit().Olevel,
       'User': require('./user').toinit().User,
       'OcompteReference': require('./ocomptereference').toinit().OcompteReference,
       'oReportDetail': require('./oreportdetail').toinit().oReportDetail,
       'oReportHeader': require('./oreportheader').toinit().oReportHeader
    };
  }

return {
  toinit: toinit
};



}
)();
module.exports= {
toinit:index.toinit
};


