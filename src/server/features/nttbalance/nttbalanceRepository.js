"use strict";
const _ = require('lodash');
const  {nttBalance} = require('../../omodels/modelsSchema/index').toinit();
const {getobjnttBalance, togetnttbalance,tonttbalance,toUpdatenttbalancedata, toInitNttbalanceInstance}=require('./staticNttbalance').toinit();
const { combineLatest, concat} = require('rxjs');
const { map, shareReplay} = require('rxjs/operators');
const {isValid} = require('../../SharedKernel/odaUtility').toinit();
const { getobjOreference,getobjOexercCompta,getobjOtableauposte}=require('../../SharedKernel/staticObjects').toinit();
const {getsrdexeccomptas$,getsrdnttbalances$,getsrdotableaupostes$,getsrdoreferences$}=require('../../sharedkernel/odarepository/sharedRepository').toinit();

const {getodaindex$, odaindex,getodaByid$,toOdaUpdate$,toOdaCreate$,getodasharedByid$}=require('../../SharedKernel/odaservice/dataservices').toinit();
const {svctoInitializeInstance,svctoapiUpdateInstance,svcodasave$, svcodaApiDel$,svcodaSearchBy}=require('../../SharedKernel/odaservice/odaservice').toinit();
const {svctoInitializeInstance$,svctoUpdateInstance$, toInitCustomInstance,svctoInitCustomInstance$,svcapiupdate$}=require('../../sharedkernel/odainstance/index').toinit(); 

const nttbalanceRepository = (function () {
  
  const toInitializeFinalInstance = function (model, body) {
    const data = toInitCustomInstance(model, body,toInitNttbalanceInstance);
    return data;
  };
  const index = function (callback) {
    return odaindex(nttBalance, togetnttbalance, callback);
  };
  const getnttbalances$ = function () {
    return getodaindex$(nttBalance, togetnttbalance);
  };
  const getByid$ = function (requestparamid) {
    return getodaByid$(nttBalance, togetnttbalance, requestparamid, getobjnttBalance);
  };
  const getcombinedByid$ =function(arr,requestparamid){
    return getodasharedByid$(arr,requestparamid,getobjnttBalance);
      };

  const toCreateBalancedata$ = function (requestBody) {
    return svctoInitializeInstance$(nttBalance, requestBody, toInitializeFinalInstance);
  };
  const insertnttbalance$ = function (arr) {
    return concat(svcodasave$(arr));
  };
  const toUpdatenttbalancedata$ = function (requestBody) {
    return svctoUpdateInstance$(requestBody, toUpdatenttbalancedata);
  };
  const editnttbalance$ = function (body, requestparamid) {
    return concat(svcapiupdate$(nttBalance, body, requestparamid));
  };
  const odasearchBy = function (body) {
    return svcodaSearchBy(nttBalance, body);
  };
  const deletenttbalance$ = function (requestparamid) {
    return svcodaApiDel$(nttBalance, requestparamid);
  };

  const getcombinednIndex$ = combineLatest(getnttbalances$(), getsrdoreferences$, getsrdotableaupostes$, getsrdexeccomptas$).pipe(
      //   tap(ev => console.log(ev)),
      map(function ([getnttbalances, getoreferences, getotableaupostes, getAlloexerccompta]) {
        let neobj;
        neobj = _.map(getnttbalances, function (obj) {
            const objoreference = getobjOreference(getoreferences, obj.OreferenceKey).filteredObject();
            const objotableauposte = getobjOtableauposte(getotableaupostes, obj.OtableauposteKey).filteredObject();
            const objoexercompta = getobjOexercCompta(getAlloexerccompta, obj.OexercComptaKey).filteredObject();
            if (isValid(getnttbalances) === true && isValid(obj)) {
             return _.assign({}, obj, objoreference, objotableauposte, objoexercompta);

            }
          });
        return (neobj);
      }), shareReplay(1));

  function toinit() {
    return {
      getnttbalances$: getnttbalances$(),
      getByid$: getByid$,
      index: index,
      toCreateBalancedata$: toCreateBalancedata$,
      insertnttbalance$: insertnttbalance$,
      toUpdatenttbalancedata$: toUpdatenttbalancedata$,
      editnttbalance$: editnttbalance$,
      odasearchBy: odasearchBy,
      deletenttbalance$: deletenttbalance$,
      getcombinednindex$: getcombinednIndex$,
      getcombinedByid$:getcombinedByid$

    };
  }
  return {
    toinit: toinit
  };
})();
module.exports = {
  toinit: nttbalanceRepository.toinit
};

