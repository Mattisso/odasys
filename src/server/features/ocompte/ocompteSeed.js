"use strict";
const _ = require('lodash');
const {Ocompte} = require('../../omodels/modelsSchema/index').toinit();
const {ocomptedata} = require('../../seed/data-seed/index').toinit();
const {toOCompte}=require('./StaticOcompte').toinit();
const { combineLatest, Observable, of, pipe, from, concat } = require('rxjs');
const {svcodasave$,svcodaDel$, svctoseedOthersInstance}=require('../../SharedKernel/odaservice/odaservice').toinit();
const {toInitializeInstance}=require('../../sharedkernel/odainstance/toInitializeInstance').toinit();

const toseedarray=toInitializeInstance(Ocompte,ocomptedata,toOCompte);

const ocompteSeed = (function () {
  const  removeOcompte$= function(model,item) {
    return   svcodaDel$(model,item);
      };

  const insertoCompte$ = function(arr){
    return   svcodasave$(arr);
  };
const seedresult$= concat(removeOcompte$(Ocompte,'Ocompte'),insertoCompte$(toseedarray));

  function toinit() {
    return {
      seedresult$:seedresult$,
      toseedarray:toseedarray

    };
  }

return {
  toinit: toinit
};

}
)();
module.exports= {
toinit:ocompteSeed.toinit
};

