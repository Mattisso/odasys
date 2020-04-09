"use strict";
const {
  forEach,
  merge
} = require('lodash');
const {
  Observable
} = require('rxjs');
const {
  inArray,
  isValid
} = require('../odaUtility').toinit();

const odaApirepository = (function () {
  function SearchByid(model, ObjParams) {
    var getquery = model.findOne({
      "_id": ObjParams
    }, {});
    return getquery;
  }
  function odacount(option) {
    if (isValid(option.oadsum) === true) {
      return option.odasum;
    } else if (isValid(option.DetailCount) === true) {
      return option.DetailCount;
    } else if (isValid(option.DetailCount) === false && isValid(option.oadsum) === false) {
      return undefined;
    } else {
      return 0;
    }
  }
  const odaApiDel$ = function (model, requestparamid) {
    /// const option=('_id',requestparamid);
    return Observable.create(function (observer) {
      try {
        if (isValid(requestparamid) === true) {
          SearchByid(model, requestparamid)
          .exec(function (err, data) {
            if (err) {
              return observer.next(err);
            } else {
              data.deleteOne(function (err) {
                if (err) {
                  observer.next(err);
                }
              });
            }
          });
        }
        //			observer.next((`item id ${JSON.stringify(requestparamid)} was  Deleted`));

        setTimeout(() => {
          observer.complete((`item id ${JSON.stringify(requestparamid)} was  Deleted`));
        }, 100);

      } catch (err) {
        observer.error(err);
      }

    });
  };
  const odaApiBulkDel$ = function (model, ArgOne) {
    return Observable.create(function (observer) {
      try {
        if (isValid(ArgOne) === true && inArray(ArgOne) === true && ArgOne.arrArg.length > 0) {
          forEach(ArgOne.arrArg, function (elm) {
            SearchByid(model, elm.id)
            .exec(function (err, data) {
              if (err) {
                return observer.next(err);
              } else {
                data.deleteOne(function (err) {
                  if (err) {
                    observer.next(err);
                  }
                });
              }
            });
          });
        }
        observer.next((` ${JSON.stringify(odacount(ArgOne))} records Deleted`));

        setTimeout(() => {
          observer.complete();
        }, 100);

      } catch (err) {
        observer.error(err);
      }

    });
  };
  const odaApiupdateArray$ = function (model, ArgOne, reqparmid) {
    let _arr = [],
    result = {};
    return Observable.create(function (observer) {
      try {
        forEach(ArgOne, function (elm) {
          SearchByid(model, reqparmid)
          .exec(function (err, data) {
            if (err) {
              return observer.next(err);
            } else {
              result = merge(data, elm);
              result.save(function (err) {
                if (err) {
                  observer.next(err);
                }
              });
            }
          });
          _arr.push(elm);
        });

        observer.next((`Finished  in updating ${_arr.length} out of ${JSON.stringify(odacount(ArgOne))||_arr.length} records`));

        setTimeout(() => {
          observer.complete();
        }, 100);

      } catch (err) {
        observer.error(err);
      }

    });
  };

  const odaApisaveObject$ = function (ArgOne) {
    // const arr = ArgOne.arrArg); //console.log(ArgOne.arrArg);
    return Observable.create(function (observer) {
      try {
        ArgOne.save(function (err) {
          if (err) {
            observer.next(err);
          }
        });

        observer.next((`Finished  in Inserting ${ArgOne}`));
        setTimeout(() => {
          observer.complete();
        }, 100);

      } catch (err) {
        observer.error(err);
      }

    });
  };
  const odaApisaveObjectArray$ = function (ArgOne) {
    let _arr = [];
    // const arr = ArgOne.arrArg); //console.log(ArgOne.arrArg);
    return Observable.create(function (observer) {
      try {
        forEach(ArgOne, function (o) {
          o.save(function (err) {
            if (err) {
              observer.next(err);
            }
          });
          _arr.push(o);
        });

        observer.next((`Finished  in Inserting ${_arr.length} out of ${JSON.stringify(ArgOne.odasum?ArgOne.odasum:ArgOne.DetailCount)} records`));

        setTimeout(() => {
          observer.complete();
        }, 100);

      } catch (err) {
        observer.error(err);
      }

    });
  };
  const odaApiupdateObj$ = function (model, body, reqparmid) {
    let _arr = [],
    result = {};
    return Observable.create(function (observer) {
      try {
        if (isValid(body) === true) {
          SearchByid(model, reqparmid)
          .exec(function (err, data) {
            if (err) {
              return observer.next(err);
            } else {
              if (isValid(body) === true) {
                result = merge(data, body);
                result.save(function (err) {
                  if (err) {
                    observer.next(err);
                  }
                });
              }
            }
          });
          _arr.push(body);
        }
        observer.next((`Finished  in updating ${_arr.length} records`));
        setTimeout(() => {
          observer.complete();
        }, 100);

      } catch (err) {
        observer.error(err);
      }
    });
  };
  const odaApisave$ = function (arr) {
    if (inArray(arr) === false) {
      return odaApisaveObject$(arr);
    } else if (inArray(arr) === true) {
      return odaApisaveObjectArray$(arr);
    } else {
      return;
    }
  };
  const odaApiupdate$ = function (model, ArgOne, reqparmid) {
    if (inArray(ArgOne) === true) {
      return odaApiupdateArray$(model, ArgOne, reqparmid);
    } else if (inArray(ArgOne) === false) {
      return odaApiupdateObj$(model, ArgOne, reqparmid);
    } else {
      return;
    }

  };
  function toinit() {
    return {
      odapiupdate$: odaApiupdate$,
      odapisave$: odaApisave$,
      odapiDel$: odaApiDel$,
      odapiBulkDel$: odaApiBulkDel$,
    };
  }
  return {
    toinit: toinit
  };
})();
module.exports = {
  toinit: odaApirepository.toinit
};
