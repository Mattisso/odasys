
const _ = require('lodash');
const fs = require("fs");
const path = require('path');
const outdirname = path.join(__dirname, '../../DataService/data//source/data.json');
const  callbackdirname = path.join(__dirname, '../../DataService/data/source/callbackdata.json');
// var nstbalancedata=require('../load/nstbalance/nstbalancedata');

require('../../config/ohadb').connectserver();
const { combineLatest, Observable, of, pipe, from ,concat} = require('rxjs');
const { filter, map, tap, pluck, take, find, distinct, shareReplay } = require('rxjs/operators');
const { oExercCompta, oExercice} = require('../../omodels/modelsSchema/index').toinit();

const { getAll, getoexercices$} = require('./index').toinit();
// const {index,getoexercices$} = require('./oexerciceRepository').toinit();

const getoreportdetail$ =  getoexercices$;


getAll(function(err,data){
   if(err) {
 throw (err);
   }

 else {

  setTimeout(() => {
   // console.log(data);
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
 // ,tap(ev => console.log(ev))
  //,take(2)

);
//const p1=getObserverdata(_insert$);
//const p2=getObserverdata(_remove$);

const getoreportdetailR$ = getObserverdata(getoreportdetail$);




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


