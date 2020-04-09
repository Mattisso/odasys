
const fs = require("fs");
const path = require('path');
const outdirname = path.join(__dirname, '../../DataService/data//source/data.json');
const  callbackdirname = path.join(__dirname, '../../DataService/data/source/callbackdata.json');
// var nstbalancedata=require('../load/nstbalance/nstbalancedata');

require('../../config/ohadb').connectserver();
const { pipe } = require('rxjs');
const { map, tap } = require('rxjs/operators');

const { getAll, getReferenceByoTableauPostes$,GetReferenceByYears$,DrpReferenceByoTableauPosteVM$} = require('./oreferenceRepository').toinit();


// const getoreportdetail$= sharedrepository.getocomptreferences$;
 //const getcallbackdata = ostblareaRepository.index;
//  const getoreportdetail$ = olevelRepository.getolevelsBy$(3);

const getoreportdetail$ = DrpReferenceByoTableauPosteVM$;



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

