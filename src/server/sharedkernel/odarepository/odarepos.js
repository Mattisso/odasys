
"use strict";
const { forEach, assign, isUndefined, isNull, map, merge, find, isArray} = require('lodash');
const async = require('async');
const { Observable} = require('rxjs');
const { inArray,  isValid} = require('../odaUtility').toinit();
const { odaByarg} = require('../odaFiltered').toinit();

const odarepos=(function(){
  function SearchByid(model, ObjParams) {
    const getquery = model.findById(ObjParams);
    return getquery;
  }
  const odasaveObject = function (ArgOne) {
    try {
      ArgOne.save(function (err) {
        if (err) {
          return new Error(err);
        }
      });
      setTimeout(() => {
        return ((`Finished  in Inserting ${ArgOne}`));
      }, 100);

    } catch (err) {
      return new Error(err);
    }
  };
  const odasaveObjectArray = function (ArgOne) {
    let _arr = [];
    try {
      forEach(ArgOne, function (o) {
        o.save(function (err) {
          if (err) {
            return new Error(err);
          }
        });
        _arr.push(o);
      });
      setTimeout(() => {
        return ((`Finished  in Inserting ${_arr.length} out of ${JSON.stringify(ArgOne.length)} records`));
      }, 100);

    } catch (err) {
      return new Error(err);
    }
  };
  const odasave = function (arr) {
    if (inArray(arr) === false) {
    return odasaveObject(arr);
    } else if (inArray(arr) === true) {
    return odasaveObjectArray(arr);
    } else {
    return;
    }
  };
  const odaDeleteOne = function (model, requestparamid) {
    /// const option=('_id',requestparamid);
      try {
        if (isValid(requestparamid) === true) {
          SearchByid(model, requestparamid)
          .exec(function (err, data) {
            if (err) {
              return new Error(err);
            } else {
              data.deleteOne(function (err) {
                if (err) {
               return new Error(err);
                }
              });
            }
          });
        }

        setTimeout(() => {
          return ((`item id ${JSON.stringify(requestparamid)} was  Deleted`));
        }, 100);

      } catch (err) {
     return new Error (err);
      }

  };
  const odaDeleteMany = function (model, ArgOne) {
      try {
        if (isValid(ArgOne) === true && inArray(ArgOne) === true && ArgOne.length > 0) {
          forEach(ArgOne, function (elm) {
            SearchByid(model, elm.id)
            .exec(function (err, data) {
              if (err) {
                return new Error(err);
              } else {
                data.deleteOne(function (err) {
                  if (err) {
                    new Error(err);
                  }
                });
              }
            });
          });
        }

        setTimeout(() => {
          return ((` ${JSON.stringify((ArgOne.length))} records Deleted`));
        }, 100);

      } catch (err) {
        return new Error(err);
      }


  };

  const odaDelete = function (model, item) {
    if (inArray(item) === false) {
    return odaDeleteOne(model, item);
    } else if (inArray(item) === true) {
    return odaDeleteMany(model, item);
    } else {
    return;
    }
  };

  const odaApiupdateObj = function (model, body) {
    let _arr = [],
    result = {};
      try {
        if (isValid(body) === true) {
          SearchByid(model, body.id)
          .exec(function (err, data) {
            if (err) {
              return new Error(err);
            } else {
              if (isValid(body) === true) {
                result = merge(data, body);
                result.save(function (err) {
                  if (err) {
                    return new Error(err);
                  }
                });
              }
            }
          });
          _arr.push(body);
        }
        setTimeout(() => {
          return ((`Finished  in updating ${_arr.length} records`));
        }, 100);

      } catch (err) {
       return new Error(err);
      }
  };
  const odaApiupdateArray = function (model, ArgOne) {
    let _arr = [],
    result = {};
      try {
        forEach(ArgOne, function (elm) {
          SearchByid(model, elm.id)
          .exec(function (err, data) {
            if (err) {
              return new Error(err);
            } else {
              result = merge(data, elm);
              result.save(function (err) {
                if (err) {
                  return new Error(err);
                }
              });
            }
          });
          _arr.push(elm);
        });

        setTimeout(() => {
          return ((`Finished  in updating ${_arr.length} out of ${JSON.stringify(ArgOne.length)||_arr.length} records`));
        }, 100);

      } catch (err) {
        return new Error(err);
      }

  };
  const odaApiupdate = function (model, ArgOne) {
    if (inArray(ArgOne) === true) {
      return odaApiupdateArray(model, ArgOne);
    } else if (inArray(ArgOne) === false) {
      return odaApiupdateObj(model, ArgOne);
    } else {
      return;
    }

  };

  function toinit(){
    return {
      odasave:odasave,
      odaDelete:odaDelete,
      odaApiupdate:odaApiupdate

    };
  }
  return {
    toinit:toinit
  };
})();
module.exports={
toinit:odarepos.toinit
};
