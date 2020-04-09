/* eslint-disable semi */
"use strict";
/* eslint-disable  no-console */
/* eslint-disable no-unused-vars */
//var Models = require('../../omodels');
const {getcomptebalances$,getByid$,insertcomptebalance$,deletecomptebalance$,odasearchBy,toUpdatecomptebalancedata$, editcomptebalance$,toCreateBalancedata$,getcombinedByid$,toapiCreateBalancedata$, togetcomptebalancesWithDetails$} = require('./nttcomptebalanceRepository').toinit();
const {insertWithDetails$}=require('../nttcomptebalancedetail/index').toinit();
const {concat } = require('rxjs');
const { concatMap } = require('rxjs/operators');
var nttcomptebalanceCtrl = (function () {
  const index = function (callback) {
    return index(callback);
  };
  const index$ = function () {
    return getcomptebalances$;
  };
  const index$$ = function () {
    return togetcomptebalancesWithDetails$;
  };
  const getbyid$ = function (id) {
    return getByid$(id);
  };
  const getcombinedbyid$ = function(id) {
    return togetcomptebalancesWithDetails$.pipe(concatMap(function (x) {
      return getcombinedByid$(x,id);
    }));
  };
  const odasearchby = function (body) {
    return odasearchBy(body);
  };
  const insert$ = function (body) {
    return toCreateBalancedata$(body).pipe(concatMap(function (x) {
        return insertcomptebalance$(x.comptebalance);
      }));
  };
   const insertcomptebalancewithDetail$ = function (body) {
 let _comptebalance=null, _details=null;
return toapiCreateBalancedata$(body).pipe(concatMap(function (x) {
    _comptebalance= x.getData,
    _details= _comptebalance.nttcomptebalancedetails;
    return concat(insertcomptebalance$(_comptebalance),insertWithDetails$(_details));
  }))
 
    };
  const update$ = function (body, requestparamid) {
    return toUpdatecomptebalancedata$(body).pipe(concatMap(function (x) {
        return editcomptebalance$(x, requestparamid);
      }));
  };

  const delete$ = function (requestparamid) {
    return deletecomptebalance$(requestparamid);
  };

  function toinit() {
    return {
      getall:index,
      index$:index$(),
      index$$:index$$(),
      getbyid$:getbyid$,
      deletecomptebalance$:delete$,
      odasearchby:odasearchby,
      insertcomptebalance$:insert$,
      updatecomptebalance$:update$,
      getcombinedbyid$:getcombinedbyid$,
      insertcomptebalancewithDetail$:insertcomptebalancewithDetail$
   //   insertwithdetails$:insertwithdetails$
    };
  }

return {
  toinit: toinit
};

}
)();
module.exports= {
toinit:nttcomptebalanceCtrl.toinit
};


/* module.exports = {

  getById: function (paramId) {
    var getquery = Models.nttCompteBalance.findOne(paramId, {})
      .populate('nttcomptebalancedetails');
    return getquery;
  },



  searchBy: function (requestBody, callback) {
    var qy = comptebalanceModel.init().selector(requestBody);
    Models.nttCompteBalance.findOne(qy, {},
      function (err, nttcomptebalance) {
        if (err) {
          throw err;
        }
        else {
          var qyrparm = nttcomptebalance._id;
          Models.nttCompteBalanceDetail.find({ nttcomptebalanceKey: qyrparm }, {},
            function (err, nttcomptebalancedetails) {
              if (err) {
                throw err;
              }
              else {
                nttcomptebalance.nttcomptebalancedetails = nttcomptebalancedetails;

                callback(null, nttcomptebalance);

              }
            });

        }
      });

  },

  delete: function (requestparamid, callback) {

    async.series({

      comptebalancedelete: function (callback) {
        comptebalanceModel.init().compteBalanceExists(requestparamid)
          .exec(function (err, data) {
            if (err) {
              throw (err);

            } else {
              if (!data) {
                return callback( null,
                  {
                    success: false,
                    message: ` itemid : ${requestparamid}  not found.`
                  });

              } else {
                data.remove(function (err) {
                  if (!err) {
                    data.remove();

                    callback(null,

                      {
                        success: true,
                        message: ` item(s) with id : ${requestparamid}  was deleted.`
                      }

                    );


                  }

                });

              }

            }
          });

      },
      comptebalancedetailsdelete: function (callback) {

        detailservice.detelecomptebalancedetail(requestparamid, callback);

      }

    },

      function (err, results) {

        if (err) {
          throw (err);
        } else {
          callback(null, results);
        }
    //    process.exit(0);
      });
  },



  create: function (requestBody, callback) {
    var obj = comptebalanceModel.Nttcomptebalance.toinit().toInitializeInstance(requestBody),
    _comptebalance =  obj.getData, //obj.balance,
  //  requestparamid=_comptebalance._id,
     _getdata = obj.getData,
          requestparamid=_getdata._id,

     _comptedetails = [],
      isValid = false;

    _comptedetails = _getdata.nttcomptebalancedetails;
    async.series({
      createcomptebalance: function (callback) {

        isValid = comptebalanceModel.Nttcomptebalance.toinit().queryselector(_comptebalance);

        if (isValid === false) {
          return (new Error({
            error: ' error There was an error!'
          }));

        } else {

          _comptebalance.save(function (err) {

            if (err) {
              if (err.code === 11000) {
                //  return SavedCallBack(err)
                return (new Error({
                  error: 'Error  inserting duplicate key.'
                }));
              }
              else {
                //  return SavedCallBack(err)
                return (new Error({
                  error: 'Error inserting new record.'
                }));
              }
            }
            else {
              callback(null, _getdata);
            }

          });


        }
      },
      createComptebalanceDetail: function (callback) {
        detailservice.NttComptebalancedetailCtrl.createComptebalanceDetail(_comptedetails,requestparamid, callback);
      }

    },

      function (err, results) {

        if (err) {
          throw (err);
        } else {
          callback(null, results);
        }
    //    process.exit(0);
      });
  }

};
 */
