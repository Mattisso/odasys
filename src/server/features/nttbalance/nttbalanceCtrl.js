"use strict";
const _ = require('lodash');
const {getnttbalances$,getByid$,insertnttbalance$,deletenttbalance$,odasearchBy,toUpdatenttbalancedata$, editnttbalance$,toCreateBalancedata$, getcombinednindex$,getcombinedByid$} = require('./nttbalanceRepository').toinit();

const { concatMap } = require('rxjs/operators');

const nttbalanceCtrl = (function () {
  const index$ = function () {
    return getnttbalances$;
  };
  const index$$ = function () {
    return getcombinednindex$;
  };
  const getbyid$ = function (id) {
    return getByid$(id);
  };

  const odasearchby = function (body) {
    return odasearchBy(body);
  };
  const insert$ = function (body) {
    return toCreateBalancedata$(body).pipe(concatMap(function (x) {
        return insertnttbalance$(x);
      }));
  };
  const getnttbalance$ = function(id) {
    return getcombinednindex$.pipe(concatMap(function (x) {
      return getcombinedByid$(x,id);
    }));
  };
  const update$ = function (body, requestparamid) {
    return toUpdatenttbalancedata$(body).pipe(concatMap(function (x) {
        return editnttbalance$(x, requestparamid);
      }));
  };

  const delete$ = function (requestparamid) {
    return deletenttbalance$(requestparamid);

  };
  function toinit() {
    return {
      index$: index$(),
      index$$:index$$(),
      getbyid$: getbyid$,
      odasearchby: odasearchby,
      insert$: insert$,
      update$: update$,
      delete$: delete$,
      getallbyid$:getnttbalance$
    };
  }



return {
  toinit: toinit
};



}
)();
module.exports= {
toinit:nttbalanceCtrl.toinit
};

