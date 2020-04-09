"use strict";
const { forEach, assign, isUndefined, isNull, map, merge, find, isArray} = require('lodash');
const async = require('async');
const { Observable} = require('rxjs');
const { inArray,  isValid} = require('../odaUtility').toinit();
const { odaByarg} = require('../odaFiltered').toinit();

function SearchByid(model, ObjParams) {
  const getquery = model.findOne({
      "_id": ObjParams
    }, {});
  return getquery;
}
const odarepository = (function () {
  function odacount(option) {
    let _arr = [];
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

  const odaSeedDel$ = function (model, item) {
    return Observable.create(function (observer) {
      try {
        model.deleteMany({}, function (err) {
          if (err) {
            observer.next(err);
          } else {
            observer.next(`${item} items Removed!`);
            setTimeout(() => {
              observer.complete();
            }, 2000);
          }
        });
      } catch (err) {
        observer.error(err);
      }

    });
  };
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
     //   observer.next((`item id ${JSON.stringify(requestparamid)} was  Deleted`));

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
        if (isValid(ArgOne) === true && inArray(ArgOne.arrArg) === true && ArgOne.arrArg.length > 0) {
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
  const odaupdate$ = function (model, ArgOne) {
    let _arr = [],
    result = {};
    return Observable.create(function (observer) {
      try {
        if (isValid(ArgOne) === true && inArray(ArgOne) === true && ArgOne.length > 0 && isValid(ArgOne.odaObjupd) === false) {
          forEach(ArgOne, function (elm) {
            SearchByid(model, elm.id)
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
        }
        observer.next((`Finished  in updating ${_arr.length} out of ${ArgOne.length} records`));

        setTimeout(() => {
          observer.complete();
        }, 100);

      } catch (err) {
        observer.error(err);
      }

    });
  };

  const odaDel$ = function (model,item) {
    return Observable.create(function (observer) {
      try {
        model.deleteMany({}, function (err) {
          if (err) {
            observer.next(err);
          } else {
           // observer.next(`${item} items Removed!`);
            setTimeout(() => {
              observer.complete(`${item} items Removed!`);
            }, 2000);
          }
        });
      } catch (err) {
        observer.error(err);
      }

    });
  };
  const odaLoadupdate$ = function (model, ArgOne) {
    let _arr = [],
    result = {};
    return Observable.create(function (observer) {
      try {
        if (isValid(ArgOne) === true && inArray(ArgOne) === true && ArgOne.length > 0 && isValid(ArgOne.odaObjupd) === true) {
          forEach(ArgOne, function (elm) {
            SearchByid(model, elm.id)
            .exec(function (err, data) {
              if (err) {
                return observer.next(err);
              } else {
                result = merge(data, ArgOne.odaObjupd);
                result.save(function (err) {
                  if (err) {
                    observer.next(err);
                  }
                });
              }
            });
            _arr.push(result);
          });
        }
        observer.next((`Finished  in updating ${_arr.length} out of ${JSON.stringify(odacount(ArgOne))||_arr.length} records`));
        setTimeout(() => {
          observer.complete();
        }, 100);

      } catch (err) {
        observer.error(err);
      }

    });
  };

  const odaSearchBy = function (model, option) {
    //const _option=odaByarg(option);
    // console.log(_option);
    let getquery = model.findOne(option, {});
    return getquery;
  };
  const odaseedUsersave$ = function (omodel, ArgOne) {
    const _arr = [];
    return Observable.create(function (observer) {
      try {
        forEach(ArgOne, function (o) {
          o.save(function (err) {
            if (err) {
              observer.next(err);
            } else {
              omodel.getAuthenticated('admin', 'Password123', function (err, user, reason) {
                if (err)
                  throw err;

                if (user) {
                  console.log('login success');
                  return;
                }
                // otherwise we can determine why we failed
                var reasons = omodel.failedLogin;
                switch (reason) {
                case reasons.NOT_FOUND:
                case reasons.PASSWORD_INCORRECT:
                  // note: these cases are usually treated the same - don't tell
                  // the user *why* the login failed, only that it did
                  break;
                case reasons.MAX_ATTEMPTS:
                  // send email or otherwise notify user that account is
                  // temporarily locked
                  break;
                }
              });
            }
          });
              _arr.push(o);
            });
              //    observer.next();
              //      console.log(`Finished  in seeding ${arr.length} records inserted`);
              observer.next((`Finished  in Inserting ${_arr.length} out of ${JSON.stringify(ArgOne.length)} records`));

              //  console.log(result);
              setTimeout(() => {
                observer.complete();
              }, 100);
          

      

      } catch (err) {
        observer.error(err);
      }

    });
  };
  
  const odasaveObject$ = function (ArgOne) {
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
  const odasaveObjectArray$ = function (ArgOne) {
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

        observer.next((`Finished  in Inserting ${_arr.length} out of ${JSON.stringify(ArgOne.length)} records`));

        setTimeout(() => {
          observer.complete();
        }, 100);

      } catch (err) {
        observer.error(err);
      }

    });
  };
  const odapiupdate$ = function (model, body, reqparmid) {
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
  const odasave$ = function (arr) {
    if (inArray(arr) === false) {
    return odasaveObject$(arr);
    } else if (inArray(arr) === true) {
    return odasaveObjectArray$(arr);
    } else {
    return;
    }  
  };
  function toinit() {
    return {
      odapiupdate$: odapiupdate$,
      odaseedUsersave$: odaseedUsersave$,
      odasave$: odasave$,
      odaupdate$: odaupdate$,
      odaLoadupdate$: odaLoadupdate$,
      odaSearchBy: odaSearchBy,
      odaDel$: odaDel$,
      odaApiDel$: odaApiDel$,
      odaApiBulkDel$: odaApiBulkDel$,
      odaSeedDel$: odaSeedDel$,
      SearchByid:SearchByid
    };
  }
  return {
    toinit: toinit
  };
})();
module.exports = {
  toinit: odarepository.toinit
};
