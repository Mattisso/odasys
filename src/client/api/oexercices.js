/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
const express = require('express');
const url = require('url');
const _=require('lodash');
const oexercicesRouter = express.Router({ mergeParams: true });
//const {odaByarg} = require('../../server/SharedKernel/odaFiltered').toinit();
const { index$, getbyid$} = require('../../server/features/oexercice/index').toinit();
const {getapistreamdata$,getapiObserver, getapiCreateObserver, getapinotification}=require('../../server/SharedKernel/odaSubscribe').toinit();

oexercicesRouter.get('/oexercices', function (req, res, next) {
  const getdata= index$;
  return  getapistreamdata$(getdata).subscribe(getapinotification(req,res)
  );
//  next();

});

oexercicesRouter.get('/oexercices/:id', function (req, res, next) {
  console.log(req.url + ' : querying for ' + req.params.id);
  if (req.params.id) {
    const getdata= getbyid$(req.params.id);
    getapistreamdata$(getdata).subscribe(getapinotification(req, res));

  } else {
    next();
  }
});
module.exports = oexercicesRouter;
