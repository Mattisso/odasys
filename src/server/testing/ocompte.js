
const {svctoInitializeInstance$}=require('../sharedkernel/odainstance/toInitializeInstance').toinit();
const {objocomptedata,arrocomptedata}=require('../testing/data/ocomptedata').toinit();
const {Ocompte}=require('../omodels/modelsSchema/ocompte').toinit();
const {render}=require('../features/ocompte/ocompteView').toinit();
const { combineLatest, Observable, of, pipe, from ,concat} = require('rxjs');
const { filter, map, tap, pluck, take, find, distinct, shareReplay } = require('rxjs/operators');
const {getstreamdata$, odagetObserver,getapistreamdata$,getapiObserver}=require('../SharedKernel/odaSubscribe').toinit();
const {toseedarray} = require('../features/ocompte/ocompteSeed').toinit();
//
const { toCreateOComptedata$, getAllocomptes} = require('../features/ocompte/ocompteRepository').toinit();
const { toBalanceinput} = require('../features/nstbalanceinput/staticNstbalanceinput').toinit();
require('../config/ohadb') .connectserver();


// const getoreportdetail$= sharedrepository.getocomptreferences$;
 //const getcallbackdata = ostblareaRepository.index;
//  const getoreportdetail$ = olevelRepository.getolevelsBy$(3);
// console.log(comptebalancedata.createData);
 const getoreportdetail$ = toCreateOComptedata$; // 

// getstreamdata$(getoreportdetail$(arrocomptedata)).subscribe(odagetObserver());

//const getoreportdetail$ =  toseedarray

// console.log((toseedarray));
getAllocomptes(function(err,data){
  if (err) console.log(err);
  console.log(data[10]);
});