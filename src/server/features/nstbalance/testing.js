/* eslint-disable  no-console */
///*eslint-disable no-unused-vars */

const _ = require('lodash');
const fs = require("fs");
const path = require('path');
//var async = require('async')
require('../../config/ohadb').connectserver();

const outdirname = path.join(__dirname, '../../DataService/data//source/data.json');
const  callbackdirname = path.join(__dirname, '../../DataService/data/source/callbackdata.json');
const { combineLatest, Observable, of, pipe, from } = require('rxjs');
const { filter, map, tap, pluck, take, find, distinct, shareReplay } = require('rxjs/operators');

const { getloadnstbalanceinputs$,getcombinednindex$,getnstbalancedata$} = require('./nstbalanceRepository').toinit();

const {toloadnstbalancedata$} = require('./loadnstbalance').toinit();
const {getall,togetloadnstbalancedatas$}=require('./index.js').toinit();
// const {getloadnstbalanceinputs ,getloadnstbalanceinputs$} = require('../nstbalanceinput/nstbalanceinputRepository').toinit();

const getoreportdetail$ =  getcombinednindex$;

getall(function(err,data){
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
  ,tap(ev => console.log(ev.length? ev.length:ev.DetailCount))
  ,tap(ev => console.log(ev[0]))
  //,take(2)

);

 const getoreportdetailR$ = getObserverdata(getoreportdetail$);

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


