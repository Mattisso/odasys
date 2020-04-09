
"use strict";
require('../../config/ohadb').connectserver();
const { concat, pipe} = require('rxjs');
const  { map  } =require('rxjs/operators');

const {seedOcompte$ }=require('../../features/ocompte/index').toinit();
const { seeduser$}=require('../../features/user/index').toinit();
const {seedOreference$ }=require('../../features/oreference/index').toinit();
const {seedOstblarea$ }=require('../../features/ostblarea/index').toinit();
const { seedostableauposte$}=require('../../features/ostableauposte/index').toinit();
const { seedotableauposte$}=require('../../features/otableauposte/index').toinit();
const {seedolevel$ }=require('../../features/olevel/index').toinit();
const { seedoexcompta$}=require('../../features/oexerccompta/index').toinit();
const { seedocomptereference$}=require('../../features/ocomptereference/index').toinit();
const {seedorepOrtdetail$}=require('../../features/oreportdetail/index').toinit();
 const {seedoreportheader$}=require('../../features/oreportheader/index').toinit();

const index = (function () {

 const seedAll$=  concat(
// seeduser$,
seedoexcompta$,
 /* seedolevel$,
 seedOcompte$,
 seedOreference$ ,
 seedOstblarea$,
 seedostableauposte$,
 seedotableauposte$,
 seedocomptereference$,
 seedorepOrtdetail$,
  seedoreportheader$  */
  );


  function toinit() {
    return {

 seedAll$ :seedAll$
     };
  }
return {
  toinit: toinit
};
}
)();
module.exports= {
toinit:index.toinit
};

const {seedAll$} = index.toinit();

const getseededData$ =   seedAll$;

  const getObserverdata = pipe(
  map(n => n)
 // ,tap(ev => console.log(ev))
  //,take(2)

);
//const p1=getObserverdata(_insert$);
//const p2=getObserverdata(_remove$);

const loadgetseededData$ = getObserverdata(getseededData$);

loadgetseededData$.subscribe({
  next: x=>console.log(x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('all seeds completed')
}

);

//sub.unsubscribe();
