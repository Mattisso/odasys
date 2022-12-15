"use strict";

const {createData,editData}=require('../testing/data/comptebalancedata').toinit();
const {nttCompteBalance,nttCompteBalanceDetail}=require('../omodels/modelsSchema/index').toinit();
const {toInitComptebalanceInstance}=require('../features/nttcomptebalance/staticNttcomptebalance').toinit();
const {odaremoveDupnumcompte} = require('../sharedkernel/odaUtility').toinit();
const {toInitCustomInstance, toapicreateinstance,svctoInitCustomInstance$}=require('../sharedkernel/odainstance/toInitializeInstance').toinit();
const {toInitializeFinalInstance}=require('../features/nttcomptebalance/nttcomptebalanceRepository').toinit();

const {getstreamdata$, odagetObserver,getapistreamdata$,getapiObserver}=require('../sharedkernel/odaSubscribe').toinit();

const data = toInitializeFinalInstance(nttCompteBalance,createData);
//const data =toInitComptebalanceInstance(nttCompteBalance,createData,toapicreateinstance)
// JSON.stringify(toInitializeInstance(nttCompteBalance,createData)));
console.log(data);
/* const comptedata=data.getData;
const detailsdata=comptedata.nttcomptebalancedetails
 const details= toapicreateinstance(nttCompteBalanceDetail,detailsdata);
console.log(details) */
/* const toCreateBalancedata$ = function (requestBody) {
  //   console.log(requestBody);
     return svctoInitCustomInstance$(nttCompteBalance, requestBody,  toInitCustomInstance);
   }; */
   // const getLoaddData$ = toCreateOComptedata$;



// getstreamdata$(getLoaddData$(obj)).subscribe(odagetObserver());