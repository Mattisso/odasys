"use strict";
const _ = require('lodash');

const { ocompterefencedata, oreportdetaildata, oreportheaderdata} = require('../../seed/data-seed/index').toinit();
const { getoreferences$ } = require('../../features/oreference/oreferenceRepository').toinit();
const { getotableaupostes$ } = require('../../features/otableauposte/otableauposteRepository').toinit();
const { getostblareas$ } = require('../../features/ostblarea/ostblareaRepository').toinit();
const { getocomptes$ } = require('../../features/ocompte/ocompteRepository').toinit();
const { getostableaupostes$ } = require('../../features/ostableauposte/ostableauposteRepository').toinit();
const { getolevels$ } = require('../../features/olevel/olevelRepository').toinit();
const staticObjects= require('../../SharedKernel/staticObjects').toinit();
const {odareduceArray, isValid, oarray}=require('../../SharedKernel/odaUtility').toinit();
const { combineLatest, Observable, of, pipe, from } = require('rxjs');
const { filter, map, tap, pluck, find, shareReplay } = require('rxjs/operators');

const loadRepository = (function () {
  const seededatas = oarray(ocompterefencedata);
  const oreportdetailseededatas = oarray(oreportdetaildata);
  const oreportheaderseededatas = oarray(oreportheaderdata);

  const getloadocomptereferenceOne$ = combineLatest(getoreferences$, getocomptes$, getostblareas$, getostableaupostes$, getotableaupostes$).pipe(
    //   tap(ev => console.log(ev)),
    map(function ([getoreferences, getocomptes, getostblareas, getostableaupostes, getotableaupostes]) {
      return _.map(getoreferences, function (oreference) {
        const Objocompte = staticObjects.getobjOcompte(getocomptes, oreference.OcompteKey).odaObject();
        const Objosblarea = staticObjects.getobjOstblarea(getostblareas, oreference.OcompteKey).odaObject();
        const Objostableauposte = staticObjects.getobjOstableauposte(getostableaupostes, Objosblarea.id).odaObject();
        const Objotableauposte = staticObjects.getobjOtableauposte(getotableaupostes, Objostableauposte.id).odaObject();
        return  ({
          "OreferenceKey": oreference.id,
          "OcompteKey": Objocompte.id,
          "CompteNumber": Objocompte.CompteNumber,
          "OstblareaKey": Objosblarea.id,
          "OstableauposteKey": Objostableauposte.id,
          "StableauName": Objostableauposte.StableauName,
          "OtableauposteKey": Objotableauposte.id,
          "TableauName": Objotableauposte.TableauName,
          "RefCode": oreference.RefCode,
          "Description": oreference.Description,
          "fullDescription": oreference.fullDescription,
          "AreaShortName": Objosblarea.AreaShortName
        });
      });
    }),
    shareReplay(1)
  );

  const getloadocomptereferencedata$ = combineLatest(getoreferences$, getocomptes$, getostblareas$, getostableaupostes$, getotableaupostes$).pipe(
    //   tap(ev => console.log(ev)),
    map(function ([getoreferences, getocomptes, getostblareas, getostableaupostes, getotableaupostes]) {
      return _.map(seededatas, function (seed) {
       const Objocompte = staticObjects.getobjOcompte(getocomptes, seed.CompteNumber).odaObject();
        const Objoreference = staticObjects.getobjOreference(getoreferences, seed.RefCode).odaObject();
      const Objosblarea = staticObjects.getobjOstblarea(getostblareas, seed.AreaShortName).odaObject();
       const Objostableauposte = staticObjects.getobjOstableauposte(getostableaupostes, seed.StableauName).odaObject();
       const Objotableauposte = staticObjects.getobjOtableauposte(getotableaupostes, seed.TableauName).odaObject();
       if(isValid(Objocompte)===true && isValid(Objoreference)===true && isValid(Objosblarea)===true && isValid(Objostableauposte)===true && isValid(Objotableauposte)===true) {
         return  ({
            "OreferenceKey": Objoreference.id,
            "OcompteKey": Objocompte.id,
            "OstblareaKey": Objosblarea.id,
            "OstableauposteKey": Objostableauposte.id,
            "StableauName": Objostableauposte.StableauName,
            "OtableauposteKey": Objotableauposte.id,
            "CompteNumber": Objocompte.CompteNumber,
            "TableauName": Objotableauposte.TableauName,
            "RefCode": Objoreference.RefCode,
            "Description": Objoreference.Description,
            "fullDescription": Objoreference.fullDescription,
            "AreaShortName": Objosblarea.AreaShortName,
            'Exception': seed.Exception,
            'Taux': seed.Taux,
          });
      }
//return Objosblarea;
      });
    }),
    shareReplay(1)
  );


  const getseedreportdetaildata$ = combineLatest(getotableaupostes$, getoreferences$, getolevels$).pipe(
    //   tap(ev => console.log(ev)),
    map(function ([getotableaupostes,getoreferences,getolevels]) {
      let neobj;
      neobj = _.map(oreportdetailseededatas, function (seed) {
       // const filteredvalue = filtered.odaByarg("nttcomptebalanceKey", ntcompttbalance.id);
       const olevelObject = staticObjects.getobjolevel(getolevels, seed.olevelNum).odaObject();
      const Objotableauposte = staticObjects.getobjOtableauposte(getotableaupostes, seed.ReportName).odaObject();
      const oreferenceObject = staticObjects.getobjOreference(getoreferences, seed.RefCode).odaObject();
   return _.assign({}, seed,({
  "OtableauposteKey": Objotableauposte.id,
     "OreferenceKey": oreferenceObject.id,
     "olevelKey": olevelObject.id,
     }));

      });
      return odareduceArray(neobj);
    }),
    shareReplay(1)

  );

  const getseedreportheaderdata$ = combineLatest(getotableaupostes$, getoreferences$).pipe(
    //   tap(ev => console.log(ev)),
    map(function ([getotableaupostes,getoreferences]) {
      let neobj;
      neobj = _.map(oreportheaderseededatas, function (seed) {
       // const filteredvalue = filtered.odaByarg("nttcomptebalanceKey", ntcompttbalance.id);
       //const olevelObject = staticObjects.getobjolevel(getolevels, seed.olevelNum).odaObject();
      const Objotableauposte = staticObjects.getobjOtableauposte(getotableaupostes, seed.ReportName).odaObject();
      const oreferenceObject = staticObjects.getobjOreference(getoreferences, seed.RefCode).odaObject();
   return _.assign({}, seed,({
  "OtableauposteKey": Objotableauposte.id,
     "OreferenceKey": oreferenceObject.id
     //"olevelKey": olevelObject.id,
     }));

      });
      return odareduceArray(neobj);
    }),
    shareReplay(1)

  );

  const getnstbalancedata$ = combineLatest(getotableaupostes$, getoreferences$).pipe(
    //   tap(ev => console.log(ev)),
    map(function ([getotableaupostes,getoreferences,getolevels]) {
      let neobj;
      neobj = _.map(oreportheaderseededatas, function (seed) {
       // const filteredvalue = filtered.odaByarg("nttcomptebalanceKey", ntcompttbalance.id);
       //const olevelObject = staticObjects.getobjolevel(getolevels, seed.olevelNum).odaObject();
      const Objotableauposte = staticObjects.getobjOtableauposte(getotableaupostes, seed.ReportName).odaObject();
      const oreferenceObject = staticObjects.getobjOreference(getoreferences, seed.RefCode).odaObject();
   return _.assign({}, seed,({
  "OtableauposteKey": Objotableauposte.id,
     "OreferenceKey": oreferenceObject.id
     //"olevelKey": olevelObject.id,
     }));

      });
      return odareduceArray(neobj);
    }),
    shareReplay(1)

  );
  function toinit() {
    return {
      getloadocomptereferenceOne$: getloadocomptereferenceOne$,
      getloadocomptereferencedata$: getloadocomptereferencedata$,
      getseedreportdetaildata$: getseedreportdetaildata$,
      getseedreportheaderdata$:getseedreportheaderdata$,
    };
  }
  return {
    toinit: toinit
  };
}
)();
module.exports = {
  toinit: loadRepository.toinit
};


