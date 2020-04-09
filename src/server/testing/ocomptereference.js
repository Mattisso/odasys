const {toInitializeInstance}=require('../sharedkernel/odainstance/toInitializeInstance').toinit()
const {createData, arrcreateData, editData}=require('../testing/data/nstbalanceinputdata').toinit();
const {OcompteReference}=require('../omodels/modelsSchema/index').toinit();
//const {render}=require('../features/ocompte/ocompteView').toinit();
const { combineLatest, Observable, of, pipe, from ,concat} = require('rxjs');
const { filter, map, tap, pluck, take, find, distinct, shareReplay } = require('rxjs/operators');
const {getocomptreferences$}=require('../features/ocomptereference/ocomptreferenceRepository').toinit();
const {toInitCustomInstance, toapicreateinstance,svctoInitCustomInstance$}=require('../sharedkernel/odainstance/toInitializeInstance').toinit()
const {getTotalCount, getTotalSoldedebit, getTotalSoldecredit}=require('../SharedKernel/odaStats').toinit();
const {odaremoveDupnumcompte,addItem} = require('../Sharedkernel/odaUtility').toinit();
const { toBalanceinput, togetnstbalanceinput} = require('../features/ocomptereference/staticocomptereference').toinit();

const {getstreams} = require('../Sharedkernel/odaCallback').toinit();

const {getstreamdata$, odagetObserver,getapistreamdata$,getapiObserver}=require('../SharedKernel/odaSubscribe').toinit();

// console.log(toInitializeInstance(nstBalanceInput,arrcreateData))

     require('../config/ohadb') .connectserver()


     getapistreamdata$(getocomptreferences$).subscribe(odagetObserver());
/* 
     const _index = function (model) {
      var getquery = model.find({},{});//, { limit: 2});
      console.log(getquery)
      return getquery;
    };
 */
/* const _index = function (model) {
  var getquery = model.find({}, {});//, { limit: 2});
  return getquery;
};
const index = function (model, f, callback) {
return _index(model).exec(
  function (err, datas) {
  if (err)
    throw err;
  const finalobj = f(datas);
  callback(null, finalobj[10]);
});
}; */
  
      /* const getquery = function (model,cb) {
       model.find({}, function(err,data){
        if(err)  throw err //console.log(err);
      cb(null,data[10])
      })//, { limit: 2});
    } */
// const getoreportdetail$= sharedrepository.getocomptreferences$;
 //const getcallbackdata = ostblareaRepository.index;
//  const getoreportdetail$ = olevelRepository.getolevelsBy$(3);
// console.log(comptebalancedata.createData);
 /* const getoreportdetail$ = toCreateBalanceinputdata$; // 

getstreamdata$(getoreportdetail$(arrcreateData)).subscribe(odagetObserver()); */
/* getloadnstbalanceinputs(function(err, data) {
  if(err) console.log(err)
  console.log(data[10])
  // return getstreams(data);

}) */

// console.log(getquery)
// getstreams(getloadnstbalanceinputs);

 //     const data = toInitializeFinalInstance(nstBalanceInput, createData, toBalanceinput)
 //    console.log(data);