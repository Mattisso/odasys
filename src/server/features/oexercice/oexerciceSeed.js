
"use strict";
const _ = require('lodash');
const { odaCreateObjFromArray, getObjArray, asyncsave, odasave$,odaDel$ } = require('../../SharedKernel/odaservice/dataservices').toinit();
const { combineLatest, Observable, of, pipe, from, concat } = require('rxjs');
const { filter, map, tap, pluck, find, take, distinct, shareReplay, concatMap} = require('rxjs/operators');
const { tocreateOexerciceObject} = require('./StaticOexercice').toinit();
const { oExercice, oExercCompta } = require('../../omodels/modelsSchema/index').toinit();
const { odaindex} = require('../../SharedKernel/base').toinit();
const {getoexercice,togetoexerccompta} = require('../../SharedKernel/odaObjects').toinit();
const {toInitializeInstance}=require('../../sharedkernel/odainstance/toInitializeInstance').toinit(); 

const {svctoseedOthersInstance, svcodaDel$, svcodasave$} = require('../../SharedKernel/odaservice/odaservice').toinit();


const oexerciceSeed = (function () {
  const index = function (callback) {
return	odaindex(oExercCompta,togetoexerccompta,callback);
  };

  const _removeoExercice$= function(model,item) {
    return svcodaDel$(model,item);
    };
    const removeoExercice$= function() {
      return _removeoExercice$(oExercice,'oExercice');
      };
    const toseedOexercicedata$=  Observable.create(function (observer) {
        try {
    return odaindex(oExercCompta,togetoexerccompta,function(err,data){
      if (err) {
        observer.next(err);
      }
      else {
      const toseedOexercicedata = toInitializeInstance(oExercice, data,tocreateOexerciceObject);
        observer.next(toseedOexercicedata);
          setTimeout(() => {
          observer.complete();
        }, 100);
      }
    });
    }
    catch (err) {
      observer.error(err);
    }
      });
      const _insertoExerciCe$ = function(arr) {
        return  svcodasave$(arr);
           };
    const insertoexercice$=toseedOexercicedata$.pipe(concatMap(function(x) {
   return _insertoExerciCe$(x);
    }
    )
    );
      const seedOexercice$ = concat(removeoExercice$(),insertoexercice$);

  function toinit() {
    return {
    result$:seedOexercice$,
      getOexcompta:index,
      toseedOexercicedata$:toseedOexercicedata$
   //   removeoExercice$:removeoExercice$,
     // insertoexercice$:insertoexercice$
    };
  }

return {
  toinit: toinit
};



}
)();
module.exports= {
toinit:oexerciceSeed.toinit
};


