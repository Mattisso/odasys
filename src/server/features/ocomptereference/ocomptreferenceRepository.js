"use strict";
var _ = require('lodash');
const  {OcompteReference} = require('../../omodels/modelsSchema/index').toinit();
const { ocompterefencedata} = require('../../seed/data-seed/index').toinit();
const { getoreferences$ } = require('../oreference/oreferenceRepository').toinit();
const { getotableaupostes$ } = require('../otableauposte/otableauposteRepository').toinit();
const { getostblareas$ } = require('../ostblarea/ostblareaRepository').toinit();
const { getocomptes$ } = require('../ocompte/ocompteRepository').toinit();
const { getostableaupostes$ } = require('../ostableauposte/ostableauposteRepository').toinit();
const {togetocomptereference,getObjOcomptereference,toOcomptereference,toUpdateocomptereference, toInitOcomptereferenceInstance} =require('./staticocomptereference').toinit();
const {getobjOcompte, getobjOreference,getobjOstableauposte,getobjOtableauposte,getobjOstblarea} =require('../../SharedKernel/staticObjects').toinit();
const {getodaindex$, odaindex,getodaByid$}=require('../../SharedKernel/odaservice/dataservices').toinit();
const {svcodasave$, svcodaApiDel$,svcodaSearchBy}=require('../../SharedKernel/odaservice/odaservice').toinit();
const {svctoInitializeInstance$,svctoUpdateInstance$, toInitCustomInstance,svctoInitCustomInstance$,svcapiupdate$}=require('../../sharedkernel/odainstance/index').toinit(); 

const { isValid, oarray} = require('../../SharedKernel/odaUtility').toinit();
const { combineLatest } = require('rxjs');
const { map, shareReplay} = require('rxjs/operators');
const seededatas = oarray(ocompterefencedata);

const ocomptreferenceRepository = (function () {
  const toInitializeFinalInstance = function (model, body) {
    const data = toInitCustomInstance(model, body,toInitOcomptereferenceInstance);
    return data;
  };
  const index = function (callback) {
    return odaindex(OcompteReference,togetocomptereference,callback);
  };
  const getocomptreferenceindex$ = function () {
    return getodaindex$(OcompteReference, togetocomptereference);
  };
  const getByid$ = function (requestparamid) {
    return getodaByid$(OcompteReference, togetocomptereference, requestparamid, getObjOcomptereference);

  };
  const toCreateocomptereferencedata$ = function (requestBody) {

    return svctoInitCustomInstance$(OcompteReference, requestBody, toInitializeFinalInstance);
  };
  const insertocomptereference$ = function (arr) {
    return svcodasave$(arr);
  };
  const toUpdateocomptereferencedata$ = function (requestBody) {
    return svctoUpdateInstance$(requestBody, toUpdateocomptereference);
  };

  const editocomptereference$ = function (body, requestparamid) {
    return svcapiupdate$(OcompteReference, body, requestparamid);
  };
  const odasearchBy = function (body) {
    return svcodaSearchBy(OcompteReference, body);
  };
  const deleteocomptereference$ = function (requestparamid) {
    return svcodaApiDel$(OcompteReference, requestparamid);
  };
  const getloadocomptereferencedata$ = combineLatest(getoreferences$, getocomptes$, getostblareas$, getostableaupostes$, getotableaupostes$).pipe(
    //   tap(ev => console.log(ev)),
    map(function ([getoreferences, getocomptes, getostblareas, getostableaupostes, getotableaupostes]) {
      let neobj;
      neobj= _.map(seededatas, function (seed) {
       const Objocompte = getobjOcompte(getocomptes, seed.CompteNumber).odaObject();
       const Objoreference = getobjOreference(getoreferences, seed.RefCode).odaObject();
      const Objosblarea = getobjOstblarea(getostblareas, seed.AreaShortName).odaObject();
       const Objostableauposte = getobjOstableauposte(getostableaupostes, seed.StableauName).odaObject();
       const Objotableauposte = getobjOtableauposte(getotableaupostes, seed.TableauName).odaObject();
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
      });
      return neobj;
    }),
    shareReplay(1)
  );

  const getocomptreferences$ = combineLatest(getocomptreferenceindex$(),getoreferences$, getocomptes$, getostblareas$, getostableaupostes$, getotableaupostes$).pipe(    //   tap(ev => console.log(ev)),

    map(function ([getocomptreferencindex, getoreferences, getocomptes, getostblareas, getostableaupostes, getotableaupostes]) {
      let neobj;
      neobj= _.map(getocomptreferencindex, function (obj) {
       const Objocompte = getobjOcompte(getocomptes, obj.OcompteKey).odaObject();
      const Objoreference = getobjOreference(getoreferences, obj.OreferenceKey).odaObject();
      const Objosblarea = getobjOstblarea(getostblareas, obj.OstblareaKey).odaObject();
       const Objostableauposte = getobjOstableauposte(getostableaupostes, obj.OstableauposteKey).odaObject();
       const Objotableauposte = getobjOtableauposte(getotableaupostes, obj.OtableauposteKey).odaObject();
       if(isValid(Objocompte)===true && isValid(Objoreference)===true && isValid(Objosblarea)===true && isValid(Objostableauposte)===true && isValid(Objotableauposte)===true) {
         return  ({
            "OreferenceKey": Objoreference.id,
            "TableauName": Objotableauposte.TableauName,
            "RefCode": Objoreference.RefCode,
            "Description": Objoreference.Description,
            "fullDescription": Objoreference.fullDescription,
            "OcompteKey": Objocompte.id,
            "CompteNumber": Objocompte.CompteNumber,
            "OstblareaKey": Objosblarea.id,
            "AreaShortName": Objosblarea.AreaShortName,
            "OstableauposteKey": Objostableauposte.id,
            "StableauName": Objostableauposte.StableauName,
            "OtableauposteKey": Objotableauposte.id,
            'Exception': obj.Exception,
            'Taux': obj.Taux,
          });
      }
      });
      return neobj;
    }),
    shareReplay(1)
  );
  function toinit() {
    return {
      getocomptreferences$: getocomptreferences$,
      getAll: index,
      index$:getocomptreferenceindex$(),
      getloadocomptereferencedata$:getloadocomptereferencedata$,
      getByid$:getByid$,
      toCreateocomptereferencedata$:toCreateocomptereferencedata$,
      insertocomptereference$:insertocomptereference$,
      toUpdateocomptereferencedata$:toUpdateocomptereferencedata$,
      editocomptereference$:editocomptereference$,
      odasearchBy:odasearchBy,
      deleteocomptereference$:deleteocomptereference$

    };
  }

  return {
    toinit: toinit
  };
}
)();
module.exports = {
  toinit: ocomptreferenceRepository.toinit
};

