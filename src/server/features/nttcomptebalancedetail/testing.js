/* eslint-disable  no-console */
///*eslint-disable no-unused-vars */
const _ = require('lodash');
const fs = require("fs");
const path = require('path');
var async = require('async');
const outdirname = path.join(__dirname, '../../DataService/data//source/data.json');
const  callbackdirname = path.join(__dirname, '../../DataService/data/source/callbackdata.json');
// var nstbalancedata=require('../load/nstbalance/nstbalancedata');
const {odaremove, odareduceArray}=require('../../SharedKernel/odaUtility').toinit();
//const {getstreamdata$}=require('../../SharedKernel/odaSubscribe').toinit();
const { combineLatest, Observable, of, pipe, from } = require('rxjs');
const { filter, map, tap, pluck, take, find, distinct, shareReplay } = require('rxjs/operators');
//var async = require('async')
require('../../config/ohadb').connectserver();
// const  dataservice = require('./nstbalanceinputCtrl');
 // var _ = require('lodash')
/* var option={"NumCompte":"999999","IntitulCompte":"mensah","SoldeDebit":"50001"};
 dataservice.createBalanceInput(option,function(err, objdata){
if(err) console.log(err);
console.log(JSON.stringify(objdata));
  });
 */
const{comptebalancedata}=require('../../testing/data/index').toinit();


const { index, getcompteBalancedetails$,toCreateCompteBalanceDetaildata$} = require('./nttcomptebalancedetailRepository').toinit();

const {toloadnttcomptebalancedetaildata$} = require('./loadnttcomptebalancedetail').toinit();


// const getoreportdetail$= sharedrepository.getocomptreferences$;
 //const getcallbackdata = ostblareaRepository.index;
//  const getoreportdetail$ = olevelRepository.getolevelsBy$(3);

const getoreportdetail$ = toCreateCompteBalanceDetaildata$(comptebalancedata.createData,'5d2678c7e2547423d45c3081');


index(function(err,data){
   if(err) {
     console.log(err);
   }

 else {

  setTimeout(() => {
    var filename = JSON.stringify(data);
//      callback(JSON.stringify(nttcomptebalances));

fs.writeFile(callbackdirname, filename, function (err) {
if (err) {
return console.error(err);
}
console.log('Data written successfully!');

});

  });
}
    // console.log(dataservice.getobjolevel(data,_refoce).odakey());
 });

  const getObserverdata = pipe(
  map(n => n)
  ,tap(ev => console.log(ev.length))
,tap(ev => console.log(ev[0]))
  //,take(2)

);

 const getoreportdetailR$ = getObserverdata(getoreportdetail$);
/*  dataservice._getolevels(function(err, data){
     if(err) {
         console.log(err)
     }
     console.log(data)

 }) */

  /*  const odagetObserver= {
  next: x => console.log(x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification')
};

 getoreportdetailR$.subscribe(odagetObserver);
 */

  getoreportdetailR$.subscribe(function (x) {
  var filename = JSON.stringify(x);
  fs.writeFile(outdirname, filename, function (err) {
    if (err) {
      return console.error(err);
    }
    console.log("Data$ written successfully!");
//    process.exit(0);
  });

});


