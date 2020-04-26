/* eslint-disable no-undef */
/* eslint-disable  no-console */
///*eslint-disable no-unused-vars */


const _ = require('lodash');
const fs = require("fs");
const path = require('path');
// const outdirname = path.join(__dirname, '../../DataService/data//source/data.json');
//   callbackdirname = path.join(__dirname, '../../DataService/data/source/callbackdata.json');
// var nstbalancedata=require('../load/nstbalance/nstbalancedata');

const { combineLatest, Observable, of, pipe, from } = require('rxjs');
const { filter, map, tap, pluck, take, find, distinct, shareReplay } = require('rxjs/operators');

//var async = require('async')
require('../../config/ohadb').connectserver();

//const {Loadnstbalanceinput$} = require('./index').toinit();
const {getnstbalanceinputes$,index ,getloadnstbalanceinputs,getloadnstbalanceinputs$, createBalanceInput$} = require('./nstbalanceinputRepository').toinit();
const {Insert$,Update$,Delete$,getByid$,index$} = require('./index').toinit();

const getoreportdetail$ = getloadnstbalanceinputs$; //createBalanceInput$(obj);

index(function(err,data){
   if(err) {
     console.log(err);
   }
 else {

  setTimeout(() => {
    var filename = JSON.stringify(data);
//      callback(JSON.stringify(nttcomptebalances));


// eslint-disable-next-line no-undef
fs.writeFile(callbackdirname, filename, function (err) {
if (err) {
return console.error(err);
}

console.log('Data written successfully!');

});

  });
}
 });

  const getObserverdata = pipe(
  map(n => n)
  ,tap(ev => console.log(ev.length? ev.length:ev.DetailCount))
  //,take(2)
);

 const getoreportdetailR$ = getObserverdata(getoreportdetail$);

  getoreportdetailR$.subscribe(function (x) {
  var filename = JSON.stringify(x);
  //console.log(getodaAggreateData(x));
  fs.writeFile(outdirname, filename, function (err) {
    if (err) {
      return console.error(err);
    }
    console.log("Data written successfully!");
    process.exit(0);
  });

});

