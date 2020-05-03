const { oExercice, oExercCompta } = require('../../omodels/modelsSchema/index').toinit();

// const getexeccomptas$ = sharedrepository.getexeccomptas$;
const {toOexercice,togetoexercice, tocreateOexerciceObject}=require('./StaticOexercice').toinit();
const {togetoexerccompta} =require('../../SharedKernel/odaObjects').toinit();
const {getobjOexercice} =require('../../SharedKernel/staticObjects').toinit();
const {svcodaDel$, svcodasave$} = require('../../SharedKernel/odaservice/odaservice').toinit();
const { concatMap} = require('rxjs/operators');
const { Observable, concat } = require('rxjs');
const {getodaindex$, odaindex,getodaByid$}=require('../../SharedKernel/odaservice/dataservices').toinit();
const {toInitializeInstance, svctoInitializeInstance$,svctoUpdateInstance$}=require('../../sharedkernel/odainstance/index').toinit();
const oexerciceRepository = (function () {

  const index = function (callback) {
    return odaindex(oExercice,togetoexercice ,callback);
  };
  const _tocreateoexerciceobject = function (callback) {
    return odaindex(oExercCompta, togetoexerccompta, function(err, data){
      if(err) {
        throw (err);
      }
        else {
          const finalObj=tocreateOexerciceObject(data);
          callback(null, finalObj);
        }
    });
      };
      const getoExercices$ = function() {
        return  getodaindex$(oExercice,togetoexercice);
      };

      const getByid$ = function (requestparamid) {
        return  getodaByid$(oExercice,togetoexercice,requestparamid,getobjOexercice);
      };

  const removeoExercice$= function(model, item) {
    return svcodaDel$(model, item);
    };
    const toseedOexercicedata$=  Observable.create(function (observer) {
        try {
    return _tocreateoexerciceobject(function(err,data){
      if (err) {
        observer.next(err);
      }
      else {

      const toseedOexercicedata = toInitializeInstance(oExercice, data);
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
      const seedOexercice$ = concat(removeoExercice$(oExercice, 'oExercice'),insertoexercice$);
  function toinit() {
    return {
      getoexercices$: getoExercices$(),
      getByid$:getByid$,
      result$:seedOexercice$,
      index:index,
      toseedOexercicedata$:toseedOexercicedata$,
      _tocreateoexerciceobject:_tocreateoexerciceobject
    };
  }

  return {
    toinit: toinit
  };



}
)();
module.exports = {
  toinit: oexerciceRepository.toinit
};


