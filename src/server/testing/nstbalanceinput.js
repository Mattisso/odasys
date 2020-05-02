const {toInitializeInstance}=require('../sharedkernel/odainstance/toInitializeInstance').toinit();
const {createData, arrcreateData, editData}=require('../testing/data/nstbalanceinputdata').toinit();
const {nstBalanceInput}=require('../omodels/modelsSchema/index').toinit();
//const {render}=require('../features/ocompte/ocompteView').toinit();
const { combineLatest, Observable, of, pipe, from ,concat} = require('rxjs');
const { filter, map, tap, pluck, take, find, distinct, shareReplay } = require('rxjs/operators');
const {getloadnstbalanceinputs, getloadnstbalanceinputs$}=require('../features/nstbalanceinput/nstbalanceinputRepository').toinit();
const {toInitCustomInstance, toapicreateinstance,svctoInitCustomInstance$}=require('../sharedkernel/odainstance/toInitializeInstance').toinit();
const {getTotalCount, getTotalSoldedebit, getTotalSoldecredit}=require('../SharedKernel/odaStats').toinit();
const {odaremoveDupnumcompte,addItem} = require('../Sharedkernel/odaUtility').toinit();
const { toBalanceinput, togetnstbalanceinput} = require('../features/nstbalanceinput/staticNstbalanceinput').toinit();

const {getstreams} = require('../Sharedkernel/odaCallback').toinit();

const {getstreamdata$, odagetObserver,getapistreamdata$,getapiObserver}=require('../SharedKernel/odaSubscribe').toinit();

     require('../config/ohadb') .connectserver();

     getapistreamdata$(getloadnstbalanceinputs$).subscribe(odagetObserver());
