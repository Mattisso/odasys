
const _ = require('lodash');
const fs = require("fs");
const path = require('path');
// var nstbalancedata=require('../load/nstbalance/nstbalancedata');
const outdirname = path.join(__dirname, '../../DataService/data//source/data.json');
const  callbackdirname = path.join(__dirname, '../../DataService/data/source/callbackdata.json');
const { ostbleareadatas } = require('../../seed/data-seed/index').toinit().ostblareadata;
require('../../config/ohadb').connectserver();
const { combineLatest, Observable, of, pipe, from } = require('rxjs');
const { filter, map, tap, pluck, take, find, distinct, shareReplay } = require('rxjs/operators');
//const { index ,getocomptes$} = require('../ocompte/ocompteRepository').toinit();

 const {toseedostblareadata$,getseeddata} = require('./ostblareaSeed').toinit();
const {getostblareas$, index} = require('./ostblareaRepository').toinit();

const getoreportdetail$ = getostblareas$;



index(function(err,data){
   if(err) {
     console.log(err);
   }

 else {

  setTimeout(() => {
  //  const arr = getseeddata(ostbleareadatas,data);

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
  error: err => console.error('Observer got an error: ' + err)
 // complete: (); //=> console.log('Observer got a complete notification')
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



