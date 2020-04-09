
"use strict";
var _ = require('lodash');
require('../config/ohadb').connectserver();
const { Observable,concat, pipe} = require('rxjs');
const  { concatMap, map  } =require('rxjs/operators');

const {nstbalanceinputLoad$ }=require('../features/nstbalanceinput/index').toinit();
const {nstbalanceload$}=require('../features/nstbalance/index').toinit();
const {nttbalanceload$}=require('../features/nttbalance/index').toinit();
const {nttcomptebalanceload$}=require('../features/nttcomptebalance/index').toinit();
const {nttcomptebalancedetailload$}=require('../features/nttcomptebalancedetail/index').toinit();
const {getstreamdata$, odagetObserver}=require('../SharedKernel/odaSubscribe').toinit();

const index = (function () {
const seedAll$=  concat(
 nstbalanceinputLoad$,
 nstbalanceload$,
 nttbalanceload$, 
nttcomptebalanceload$,
nttcomptebalancedetailload$
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

// const getLoaddData$$ =   seedAll$;

getstreamdata$(seedAll$).subscribe(odagetObserver());
 