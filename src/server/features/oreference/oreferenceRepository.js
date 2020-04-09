"use strict";
var _ = require('lodash');

const { oreferencedata } = require('../../seed/data-seed/index').toinit();
const { combineLatest, pipe } = require('rxjs');
const { map } = require('rxjs/operators');
const { oReference} = require('../../omodels/modelsSchema/index').toinit();
const { toOreference, togetoreference,getobjOreference,toUpdateoreference,statictReferenceByoTableauPostes ,staticReferenceByYears, toInitOreferenceInstance} = require('./staticOreference').toinit();
const staticObjects = require('../../SharedKernel/staticObjects').toinit();
const { getodafilter,odaByarg} = require('../../SharedKernel/odaFiltered').toinit();
const {getsrdcomptebalances$,getsrdocomptreferences$,getsrdocomptes$} = require('../../sharedkernel/odarepository/sharedRepository').toinit();
const {getodaindex$, odaindex,getodaByid$,toOdaUpdate$,toOdaCreate$,getodaindexapi$,getodaApiByid$}=require('../../SharedKernel/odaservice/dataservices').toinit();
const {svctoInitializeInstance,svctoapiUpdateInstance,svcodasave$, svcodaApiDel$,svcodaSearchBy}=require('../../SharedKernel/odaservice/odaservice').toinit();
const {svctoInitializeInstance$,svctoUpdateInstance$, toInitCustomInstance,svctoInitCustomInstance$,svcapiupdate$}=require('../../sharedkernel/odainstance/index').toinit(); 


const oreferenceRepository = (function () {
  const toInitializeFinalInstance = function (model, body) {
    const data = toInitCustomInstance(model, body,toInitOreferenceInstance);
    return data;
  };

  const index = function (callback) {
    return odaindex(oReference,togetoreference,callback);
  };
  const getoreferences$ =function() {
    return getodaindex$(oReference, togetoreference);
  };

  /* const getByid$ = function (requestparamid) {
    return getodaByid$(oReference, togetoreference, requestparamid, getobjOreference);
  }; */
  const getapioreferences$ =function() {
    return getodaindexapi$(oReference);
  };
  const getapiByid$ = function (requestparamid) {
    return getodaApiByid$(oReference, requestparamid,getobjOreference);
  };
  const toCreateoreferencedata$ = function (requestBody) {
    return svctoInitCustomInstance$(oReference, requestBody, toInitializeFinalInstance);
  };
  const insertoreference$ = function (arr) {
    return svcodasave$(arr);
  };
  const toUpdateoreferencedata$ = function (requestBody) {
    return svctoUpdateInstance$(requestBody, toUpdateoreference);
  };

  const editoreference$ = function (body, requestparamid) {
    return svcapiupdate$(oReference, body, requestparamid);
  };
  const odasearchBy = function (body) {
    return svcodaSearchBy(oReference, body);
  };
  const deleteoreference$ = function (requestparamid) {
    return svcodaApiDel$(oReference, requestparamid);
  };
  const _getoReferenceLists = pipe(
    map(function (n) {
      const arr = _.map(n, function (obj) {
        return ({
        "OreferenceKey": obj.id,
        "RefCode": obj.RefCode,
        "Description": obj.Description,
        "fullDescription": obj.fullDescription
        });
      });
      return _.uniqBy(arr, 'OreferenceKey');
    })
  );

  const getoReferenceLists$ = _getoReferenceLists(getoreferences$());

  const getReferenceByoTableauPostes$ = combineLatest(getapioreferences$(), getsrdocomptreferences$).pipe(
    //  tap(ev => console.log(ev)),
    map(function ([oreferences, getocomptreferences]) {
      return statictReferenceByoTableauPostes(getocomptreferences,oreferences);
       })
  );
  const GetReferenceByYears$ = combineLatest(getoreferences$(), getsrdcomptebalances$).pipe(
    // tap(ev => console.log(ev)),
    map(function ([getoreferences, getcomptebalances]) {
      return staticReferenceByYears(getcomptebalances,getoreferences);
    })
  );
  const DrpReferenceByoTableauPosteVM$ = combineLatest(getReferenceByoTableauPostes$, GetReferenceByYears$).pipe(
    //   tap(ev => console.log(ev)),
    map(function ([getreferenceByoTableaupostes, getReferenceByYears]) {
      return _.differenceBy(getreferenceByoTableaupostes, getReferenceByYears, 'OreferenceKey');
    })
  );


  function toinit() {
    return {
      getAll: index,
      getoreferences$: getapioreferences$(),
      getReferenceByoTableauPostes$: getReferenceByoTableauPostes$,
      getoReferenceLists$: getoReferenceLists$,
      GetReferenceByYears$: GetReferenceByYears$,
      DrpReferenceByoTableauPosteVM$: DrpReferenceByoTableauPosteVM$,
     getByid$:getapiByid$,
     toCreateoreferencedata$:toCreateoreferencedata$,
     toUpdateoreferencedata$:toUpdateoreferencedata$,
     insertoreference$:insertoreference$,
     editoreference$:editoreference$,
     deleteoreference$:deleteoreference$,
     odasearchBy:odasearchBy

    };
  }

  return {
    toinit: toinit
  };
}
)();
module.exports = {
  _toinit: oreferenceRepository.toinit,
  get toinit() {
    return this._toinit;
  },
  set toinit(value) {
    this._toinit = value;
  },
};


