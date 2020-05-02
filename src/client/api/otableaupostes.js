/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
const express = require('express');
const otableaupostesRouter = express.Router();
const {odaByarg} = require('../../server/SharedKernel/odaFiltered').toinit();
const {index$,insert$,delete$,update$,getbyid$,odasearchby,ddlotableauposteWithcomptebalances$} = require('../../server/features/otableauposte/index').toinit();
const {getapistreamdata$,getapiObserver, getapiCreateObserver,getapinotification}=require('../../server/SharedKernel/odaSubscribe').toinit();

 otableaupostesRouter.get('/otableaupostes', function (req, res, next) {
  const getdata= index$;
  return  getapistreamdata$(getdata).subscribe(getapinotification(req,res)
  );
});

otableaupostesRouter.get('/otableaupostes/:id', function (req, res, next) {
  console.log(req.url + ' : querying for ' + req.params.id);
  if (req.params.id) {
    const getdata= getbyid$(req.params.id);
    getapistreamdata$(getdata).subscribe(getapinotification(req, res));
    }else {
    next();
  }
});
otableaupostesRouter.get('/otableaupostes/v1/ddlotableauposteWithcomptebalances', function (req, res, next) {
  const getdata= ddlotableauposteWithcomptebalances$;
  return  getapistreamdata$(getdata).subscribe(getapinotification(req,res)
  )
  ;});

otableaupostesRouter.post('/otableaupostes', function (req, res, next) {
  const requestBody = req.body;
  const _comptenumber = odaByarg('TableauName',requestBody.TableauName);
  odasearchby(_comptenumber)
    .exec(function (err, data) {
      console.log(data);
      if (err) {
        return next(err);
      }
      if (data) {
        res.status(403).send({
          success:false,
          message:` TableauName: ${requestBody.TableauName}  already exists`
        });
      }
      if(!data){
        const getdata= insert$(requestBody);
        getapistreamdata$(getdata).subscribe(getapiCreateObserver(req));
        next();
      }

    });
});

otableaupostesRouter.put('/otableaupostes/:id', function (req, res, next) {
  const requestBody = req.body;
  console.log(req.url + ' : querying for ' + req.params.id);
  var reqparamid = req.params.id;
  const getdata= update$(requestBody, reqparamid);
  getapistreamdata$(getdata).subscribe(getapiCreateObserver(req));
});

otableaupostesRouter.delete('/otableaupostes/:id', function (req, res, next) {
  console.log(req.url + ' : querying for ' + req.params.id);
  const getdata= delete$(req.params.id);
  getapistreamdata$(getdata).subscribe(getapiCreateObserver(req));
  next();
});

module.exports = otableaupostesRouter;
