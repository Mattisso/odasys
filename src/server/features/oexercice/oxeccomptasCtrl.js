/* eslint-disable  no-console */
/* eslint-disable no-unused-vars */

var express = require('express');
var router = express.Router();
var url = require('url');
var objqueriesparams = require('../../objQueriesParams');
var baserepos = require('../base');
var _ = require('lodash');
var oexerccomptaModel = require('./oxeccomptas');
var oexercicemodel = require('./oexercice');
var Models = require('../../../omodels');
var oda = require('../../oda');

var async = require('async');
//var oexerccomptadata = require('../helper/models/nstoexerccompta.v1')

function SearchBy(omodel, _comptenumber) {
  var getquery = omodel.findOne(({ _id: _comptenumber }), {});
  return getquery;
}

function SearchByID(omodel, id) {
  var getquery = omodel.findOne(({ _id: id }), {});
  return getquery;
}

function SearchByYear(omodel, _comptenumber) {
  var getquery = omodel.findOne(({ oExercComptaId: _.toString(_comptenumber) }), {});
  return getquery;
}


module.exports = {

  index: function (omodel, callback) {
    omodel.find({}, {}, { sort: { oExercComptaId: 'desc' } },
      function (err, oexerccomptas) {
        if (err) throw err;
        callback(null, oexerccomptas);
      });
  },



  query_by_arg: function (omodel, key, value, callback) {
    //build a JSON string with the attribute and the value
    var filterArg = '{"' + key + '":' + '"' + value + '"}';
    var filter = JSON.parse(filterArg);

    omodel.find(filter, {},
      function (err, result) {

        if (err)
          return callback(err);

        return callback(null, result);
      });
  },
  findByYearID: function (omodel, id, callback) {
    var users = {};
    SearchByID(omodel, id).exec(function (err, users) {
      if (err) throw err;
      if (!users)
        return callback(new Error(
          'No user matching  '
          + id
        ));

      return callback(null, users);
    });
  },

  findByYear: function (omodel, _param, callback) {
    var users = {};
    SearchByYear(omodel, _param).exec(function (err, users) {
      if (err) throw err;
      if (!users)
        return callback(new Error(
          'No user matching  '
          + _param
        ));

      return callback(null, users);
    });
  },


  getById: function (omodel, requestparamid, callback) {
    if (requestparamid) {
      omodel.findOne({ _id: requestparamid },
        function (err, result) {
          if (err) throw err;
          callback(null, result);
        });

    }
  },
  /*
    createsExerccompta: function (omodel,requestBody, callback) {
      var arr = [];

      var data = oexerccomptaModel.toinit().toInitializeInstance(requestBody);

      for (var i = 0; i < data._arrstbalances.length; i++) {
        var obj = new omodel(data._arrstbalances[i]);
        if (arr.indexOf(data._arrstbalances[i].oExercComptaId == -1)) {
          arr.push(obj);

        }

      }

      arr.push(obj);

      async.eachSeries(arr, function (obj, SavedCallBack) {
        obj.save(function (err) {
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

            SavedCallBack();
            //  return SavedCallBack(err)
          }
        });
      }, function (err, obj) {
        if (err)
          return (err);
        setTimeout(function () {

          return callback(null, obj);
        }, 200);
      });
    },
   */
  createsExerccompta: function (omodel, vmodel, requestBody, callback) {
    async.series({
      insertoExerccompta: function (callback) {

        var arr = [];

        var data = oexerccomptaModel.toinit().toInitializeInstance(omodel, requestBody);

        for (var i = 0; i < data._arrstbalances.length; i++) {
          var obj = new omodel(data._arrstbalances[i]);
          if (arr.indexOf(data._arrstbalances[i].oExercComptaId == -1)) {
            arr.push(obj);

          }

        }

        arr.push(obj);

        async.eachSeries(arr, function (obj, SavedCallBack) {
          obj.save(function (err) {
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

              SavedCallBack();
              //  return SavedCallBack(err)
            }
          });
        }, function (err, obj) {
          if (err)
            return (err);
          setTimeout(function () {

            return callback(null, obj);
          }, 200);
        });


      },
      insertoExercice: function (callback) {
        oexercicemodel.popularoexercice(omodel, vmodel, function (err, data) {

          if (err) {
            console.log(err);
          } else {
            callback(data);
          }
          // callback();
        });
      }
    },

      function (err, results) {

        if (err) {
          //  console.log("Errors = ");
          throw (err);
        } else {
          //  console.log("Results = ");
          callback(results);
        }
        //  process.exit(0);
      });
  },



  editsExerccompta: function (omodel, vmodel, requestBody, requestparamid, callback) {
    async.series({

      editExerccompta: function (callback) {


        // requestBody = req.requestBody;
        var d = new Date();
        var obj = requestBody;

        SearchBy(omodel, requestparamid)
          .exec(function (err, data) {
            if (err) {
              throw (err);
            } else {

              if (data) {
                data._id = requestparamid,
                  data.oExercComptaId = obj.oExercComptaId,
                  data.DateDebut = obj.DateDebut,
                  data.Datefin = obj.Datefin,
                  data.Cloture = obj.Cloture,
                  data.ModifiedOn = d;

                data.save(function (err) {
                  if (!err) {
                    console.log('Successfully updated obj with primary number: ' + obj.oExercComptaId);
                    data.save();
                  } else {
                    console.log('err on save');
                  }
                });

              }
              //poulate the document with the updated values

              return callback(null, data);


            }
          });



      },
      insertoExercice: function (callback) {
        oexercicemodel.popularoexercice(omodel, vmodel, function (err, data) {

          if (err) {
            console.log(err);
          } else {
            callback(data);
          }
        });
      }
    },

      function (err, results) {

        if (err) {
          //  console.log("Errors = ");
          throw (err);
        } else {
          //  console.log("Results = ");
          callback(results);
        }
        //  process.exit(0);
      });
  },

  deleteoexerccompta: function (omodel, vmodel, requestparamid, callback) {
    async.series({

      deleteoexerccompta: function (callback) {
        SearchBy(omodel, requestparamid)
          .exec(function (err, result) {
            if (err) {
              throw (err);
            }
            else {
              if (!result) {
                return callback(null,

                  {
                    success: false,
                    message: ` item(s) with id : ${requestparamid}  not found.`
                  }
                );
              }
              else {

                result.remove();


              }
              callback(null, {

                Success: true,
                message: `item(s) was deleted successfully.`
              });
            }
          });

      },
      /*    popularoexercice: function (omodel, vmodel, callback) {
           async.series({
             removeoExercice: function (callback) {
               vmodel.remove({}, function (err) {
                 if (err) {
                   callback(err);
                 }

                 setTimeout(function () {
                   callback(null, 'oExercCompta Removed!');
                 }, 200);

               });
             },
             insertoExercice: function (callback) {

               omodel.find({}, {},
                 function (err, oexerccomptas) {
                   if (err)
                     throw err;

                   var qyrparm = _.max(_.map(_.map(oexerccomptas, 'oExercComptaId'), _.ary(parseInt, 1)));
                   console.log(qyrparm);

                   omodel.find({
                     oExercComptaId: _.toString(qyrparm)
                   }, {},
                     function (err, oexerccompta) {
                       // console.log(oexerccompta);
                       if (err)
                         throw err;
                       vmodel.find({}).exec(function (err, oexercices) {
                         var arr = [];
                         if (oexercices.length > 0) {
                           // console.log(oexercices.length)
                           // omodel.remove({});
                           var oexercice = new vmodel({
                             oExerciceEncour: _.map(_.map(oexerccompta, 'oExercComptaId'), _.ary(parseInt, 1)) - 0,
                             ExercicePrev: _.map(_.map(oexerccompta, 'oExercComptaId'), _.ary(parseInt, 1)) - 1,
                             OexerccomptaKey: _.map(_.map(oexerccompta, '_id'))

                           });

                           arr.push(oexercice);

                           //     console.log(_.map(_.map(oexerccompta,'oExercComptaId')));

                         } else {

                           oexercice = new vmodel({
                             oExerciceEncour: _.map(_.map(oexerccompta, 'oExercComptaId'), _.ary(parseInt, 1)) - 0,
                             ExercicePrev: _.map(_.map(oexerccompta, 'oExercComptaId'), _.ary(parseInt, 1)) - 1,
                             OexerccomptaKey: _.map(_.map(oexerccompta, '_id'))
                           });
                           arr.push(oexercice);
                         }

                         //  console.log(arr)

                         async.eachSeries(

                           arr,

                           function (oexercice, oexerciceSavedCallBack) {
                             oexercice.save(function (err) {

                               if (err) {
                                 // Send JSON response to console for errors
                                 throw (err);
                               }

                               oexerciceSavedCallBack();

                             });
                           },

                           function (err) {

                             if (err)
                               throw (err);

                             setTimeout(function () {
                               callback(null, `Finished  oExercice in seeding ${arr.length} records inserted`);
                             }, 200);
                           });
                       });
                     });
                 });
             }
           },

             function (err, results) {

               if (err) {
                 // console.log("Errors = ");
                 throw (err);
               } else {
                 // console.log("Results = ");
                 callback(results);
               }
               //  process.exit(0);
             });

         }, */
      insertoExercice: function (callback) {
        oexercicemodel.popularoexercice(omodel, vmodel, function (err, data) {

          if (err) {
            console.log(err);
          } else {
            callback(data);
          }
        });
      }

    },

      function (err, results) {

        if (err) {
          //  console.log("Errors = ");
          throw (err);
        } else {
          //  console.log("Results = ");
          callback(results);
        }
        //  process.exit(0);
      });

  },
  deleteAlloexerccomptas: function (omodel, callback) {
    var _arroexerccomptas = [];

    this.index(omodel, function (err, results) {
      if (err) {
        throw (err);
      }
      else {
        if (!results) {
          return callback(null,

            {
              success: false,
              message: ` item(s) not found.`
            }
          );
        }
        else {
          for (var i = 0; i < results.length; i++) {
            var resultoexerccomptas = results[i];

            _arroexerccomptas.push(resultoexerccomptas);
          }

          async.each(_arroexerccomptas, function (resultoexerccomptas, callback_s1) {
            resultoexerccomptas.deleteOne(function (err) {
              if (!err) {
                resultoexerccomptas.deleteOne();

                callback_s1();
              }
            });

          }, function (err) {

            if (err) {
              throw (err);

            }
            else {
              if (_arroexerccomptas.length > 0) {
                callback(null, {

                  Success: true,
                  message: _arroexerccomptas.length + ' item(s) was deleted.'

                });


              }
              else if (_arroexerccomptas.length == 0) {
                callback(null, `no item(s) was found`);
              }

            }
          });

        }

      }
    });

  },
  SearchBy: function (omodel, _comptenumber) {
    var getquery = omodel.findOne(({ oExercComptaId: _comptenumber }), {});
    return getquery;
  },

};

