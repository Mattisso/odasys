
const _ = require('lodash');
const fs = require("fs");
const path = require('path');
const outdirname = path.join(__dirname, '../../DataService/data//source/data.json');
const  callbackdirname = path.join(__dirname, '../../DataService/data/source/callbackdata.json');
// var nstbalancedata=require('../load/nstbalance/nstbalancedata');

require('../../config/ohadb').connectserver();
const {odaremove} =require('../../SharedKernel/odaUtility').toinit();

const { combineLatest, Observable, of, pipe, from } = require('rxjs');
const { filter, map, tap, pluck, take, find, distinct, shareReplay } = require('rxjs/operators');
// const {combinedSeedata$} = require('./ostblareaRepository').toinit();
//const {getloadocomptereferencedata$} = require('../../DataService/loadRepository').toinit();
const { result$,getAll,getoreportdetailBy$}=require('./index').toinit();



// const getoreportdetail$= sharedrepository.getocomptreferences$;
 //const getcallbackdata = ostblareaRepository.index;
//  const getoreportdetail$ = olevelRepository.getolevelsBy$(3);

const getoreportdetail$ = getoreportdetailBy$(3);



getAll(function(err,data){
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
   console.log("Data written successfully!");
   process.exit(0);
 });

});

