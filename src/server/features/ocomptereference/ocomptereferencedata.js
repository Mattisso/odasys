"use strict";
/* eslint-disable  no-console */
/* eslint-disable no-unused-vars */
var path = require('path');
// var Models = require('../../omodels/index.js');

var adaload = require('../../odaLoad');
var oda = require('../../oda');
const base=require('../../../SharedKernel/base');
var filtered=require('../../../SharedKernel/filtered');
var _ = require('lodash');
var odahelper = require('../../odahelper');
var oreferencedata = require('../../../seed/data-seed/ocompterefencedata');

var async = require('async');
module.exports = {
  popular: function (callback) {
    async.waterfall([
      //#region
     function (callback) {
      var seeddatas = odahelper.oarray(oreferencedata);
       var arr = [],
       _arr=[];
       adaload.popular(function (data) {
       async.eachSeries(seeddatas, function (ocomptereference, secondcallback) {
      //   var refcode = ocomptereference.RefCode;
       //  var qyrparm = ocomptereference.CompteNumber;
       const  refcode = filtered.toinit().getRefCode(ocomptereference.RefCode);
         const  _comptenumber = filtered.toinit().getCompteNumber(ocomptereference.CompteNumber); // _refcode.RefCode; // filtered.toinit()._refcodeBS;

const _filtered = Object.assign({},refcode,_comptenumber);
    var oreferences = data.Oreferences;
    var filteroreferences = base.toinit().filterArray(oreferences,_filtered);
       //  var filteroreferences = oda.toinit().findobjBy(oreferences, {'CompteNumber':qyrparm,'RefCode': refcode });
               var obj;
               async.eachSeries(filteroreferences, function (oreference, ocomptecallback) {
                obj = _.merge(ocomptereference,oreference);// Object.assign(ocomptereference, _obj);

                 _arr.push(obj);
                 ocomptecallback();
               },
                 function (err) {
                   // console.log(ocompte)
                   if (err) {
                     throw err;
                   }
                   else {

                     secondcallback();
                   }
                 });

               //    secondcallback()

       }, function (err) {
         if (err) {
           throw err;
         } else {

           callback(null, _arr);
         }
       });
      });
     },



       //#region

       function (ocomptereferences, callback) {
        var arr = [],
        _arr=[];
        adaload.popular(function (data) {
        async.eachSeries(ocomptereferences, function (ocomptereference, secondcallback) {
         var ostblareaids = ocomptereference.AreaShortName; //_.map(nstbalanceinput.ostblarea, '_id');
         var option = oda.toinit().queryByarg('AreaShortName', ostblareaids);
         var ostableaupostes = data.Ostableaupostes;
   // console.log(ostableaupostes);

            var filterostableaupostes = oda.toinit().findobjBy(ostableaupostes, option);


             //   var obj;

                async.eachSeries(filterostableaupostes, function (ostableauposte, ocomptecallback) {

                  var obj = _.merge(ocomptereference, ostableauposte);
                  _arr.push(obj);
                   ocomptecallback();
                },
                  function (err) {
                    // console.log(ocompte)
                    if (err) {
                      throw err;
                    } else {

                      secondcallback();
                    }
                  });

        }, function (err) {
          if (err) {
            throw err;
        //    console.log('A file failed to process');
          } else {
        //   console.log(arr[100]);
            // callback(null, 'data loaded successfully')
            callback(null, _arr);
          }
        });
       });
      },

 //#endregion


      //#region

      function (ocomptereferences, callback) {
        var arr = [],
        _arr = [];

        adaload.popular(function (data) {
        async.eachSeries(ocomptereferences, function (ocomptereference, secondcallback) {
          var ostableauposteids = ocomptereference.StableauName;
          var option = oda.toinit().queryByarg('StableauName', ostableauposteids);

          var otableaupostes = data.otableaupostes;

          var filterotableaupostes = oda.toinit().findobjBy(otableaupostes, option);

                      var obj;
                async.eachSeries(filterotableaupostes, function (otableauposte, ocomptecallback) {

               //   var _obj = myObjects.toinit().createotableauposte(otableauposte);
                  obj =  _.merge(ocomptereference,otableauposte); //Object.assign(ocomptereference, _obj);
                  arr.push(obj);
             _arr= oda.toinit().arrayUnique(arr);

                  ocomptecallback();
                },
                  function (err) {
                    // console.log(ocompte)
                    if (err) {
                      throw err;
                    } else {

                      secondcallback();
                    }
                  });

        }, function (err) {
          if (err) {
            throw err;
           // console.log('A file failed to process');
          } else {
            // callback(null, 'data loaded successfully')
            callback(null, _arr[100]);
          }
        });
       });
      }
 ,

    //#endregion

      //#endregion

    ], function (err, results) {
      if (err) {

        throw err;
      } else {

        callback(null, results);

      }

    });
  }
};
