
"use strict";
const _ = require('lodash');
const { combineLatest, Observable, of, pipe, from } = require('rxjs');
const { filter, map, tap, pluck, take, find, distinct, shareReplay } = require('rxjs/operators');
const {odaremove,odareduceArray}=require('./odaUtility').toinit();

const odaSubscribe = (function () {
  const getObserverdata = pipe(
      map(n => n)
      //,tap(ev => console.log(ev))
      //,take(2)
    );

  const _getObserverWithShareReplaydata = pipe(
      map(n => n),
      shareReplay(1)
      );
  const getObserverWithShareReplaydata$= function(data){
return _getObserverWithShareReplaydata(data);
  };

  const _getObshareddata = pipe(
      map(function (n) {
        const odacleanObj = odaremove(n);
        const odareducearray = odareduceArray(odacleanObj);
        return odareducearray;
      }));
  const getObshareddata$ = function (getdata) {
    return _getObshareddata(getdata);
  };

  const odagetObserver = function () {
    return {
      next: x => console.log(x),
      error: err => console.error('Observer got an error: ' + err),
      complete: () => {
        console.log('Observer got a complete notification');
      }
    };
  };
  const getstreamdata$ = function (getdata) {
    return getObserverdata(getdata);
  };

  const getapiCreateObserver = function (req,next) {
    return {
      next(result) {
        req.result = result;
      },
      error(err) {
        next(new Error('something wrong occurred: ' + err));
      },
    };
  };
  const getapiupdateObserver = function (req, res) {
    return {
      next(result) {
        req.results = result;
      },
      error(err) {
        res.status(500).json({ error:`Internal server' ${err}`});
      },
      //  error: err => console.error('Observer got an error: ' + err),\
      complete() {
return;
   //   res.json(`item ${JSON.stringify(req.body)}  created successfully!`);
      }
    };
  };
  const getapinotification = function (req, res) {
    return {
      next(result) {
        res.json(req.result = result);
      }
    };
  };

   const getapideleteObserver = function (req, res) {
    return {
      next:()=> {
          return;
     },
      error(err) {
        res.status(500).json({ error:`Internal server' ${err}`});
      },
      //  error: err => console.error('Observer got an error: ' + err),\
      complete: ()=> {
      return   ({ message: `item deleted successfully!` });
      }
    };
  };

  const subapiCreateObserver=function(req, res, next) {
    return  getapiCreateObserver(req,res,next);
  };

  const getapiObserver = function (req, res, next) {
    return {
      next: result => res.result = result,
      error(err) {
        next(new Error('something wrong occurred: ' + err));
      },
      //  error: err => console.error('Observer got an error: ' + err),
      complete: () => {
        console.log('Observer got a complete notification');
      }
    };
  };

  const getapistreamdata$ = function (getdata) {
    return getObserverdata(getdata);
  };

  function toinit() {
    return {
      getstreamdata$: getstreamdata$,
      odagetObserver: odagetObserver,
      getapistreamdata$: getapistreamdata$,
      getapiObserver: getapiObserver,
      getapiCreateObserver: getapiCreateObserver,
      subapiCreateObserver:subapiCreateObserver,
      getObshareddata$: getObshareddata$,
      getObserverWithShareReplaydata$:getObserverWithShareReplaydata$,
      getapiupdateObserver:getapiupdateObserver,
      getapideleteObserver:getapideleteObserver,
      getapinotification:getapinotification
    };
  }

  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: odaSubscribe.toinit
};
