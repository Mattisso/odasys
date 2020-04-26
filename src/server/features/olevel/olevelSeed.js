"use strict";
const _ = require('lodash');
const async = require('async');
const {Olevel} = require('../../omodels/modelsSchema/index').toinit();
const {oleveldata} = require('../../seed/data-seed/index').toinit();
const {toOlevel}=require('./Staticolevel').toinit();
const {concat } = require('rxjs');
const {svcodaDel$, svcodasave$} = require('../../SharedKernel/odaservice/odaservice').toinit();
const {toInitializeInstance} = require('../../SharedKernel/odainstance/toInitializeInstance').toinit();



const olevelSeed = (function () {
  const toseedarray=toInitializeInstance(Olevel,oleveldata,toOlevel);

  var removeData$=function(model, item){
    return   svcodaDel$(model,item);
      };
      const insertolevel$ = function(arr) {
        return svcodasave$(arr);
      };
    const seedresult$= concat(removeData$(Olevel,'Olevel'),insertolevel$(toseedarray));

  function toinit() {
    return {
      result$:seedresult$,
      toseedarray:toseedarray
    };
  }

return {
  toinit: toinit
};

}
)();
module.exports= {
toinit:olevelSeed.toinit
};

