/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
const express = require('express');
const oexerccomptasRouter = express.Router();
const {odaByarg} = require('../../server/SharedKernel/odaFiltered').toinit();
const{getAlloexerccompta$,insert$$,update$,getbyid$, delete$, odasearchby, index$$,ddlexerComptable$}= require('../../server/features/oexerccompta/index').toinit();
const {getapistreamdata$,getapiObserver, getapiCreateObserver,subapiCreateObserver,getapinotification,getObshareddata}=require('../../server/SharedKernel/odaSubscribe').toinit();

oexerccomptasRouter.get('/oexerccomptas', function (req, res, next) {
  const getdata = index$$;
 return  getapistreamdata$(getdata).subscribe(getapinotification(req,res)
    );
  //  next();
});
oexerccomptasRouter.get('/oexerccomptas/:id', function (req, res, next) {
  console.log(req.url + ' : querying for ' + req.params.id);
  if (req.params.id) {
    const getdata = getbyid$(req.params.id);
    getapistreamdata$(getdata).subscribe(getapinotification(req, res));

  } else {
    next();
  }
});
oexerccomptasRouter.get('/oexerccomptas/v1/DropDownListexerComptable', function (req, res, next) {
    const getdata = ddlexerComptable$;
    return  getapistreamdata$(getdata).subscribe(getapinotification(req,res)

        );
      });

oexerccomptasRouter.get('/oexerccomptas/v2/:oExercComptaId', function (req, res, next) {
  if (req.params.oExercComptaId === undefined) {
    return next();
  } else if (req.params.oExercComptaId) {
    res.json(req.oyear);
  } else {
    next(new Error(`failed to load ${req.params.oExercComptaId}`));
  }
});
oexerccomptasRouter.post('/oexerccomptas', function (req, res, next) {
  var requestBody = req.body;
  const _oexerccomptaid = odaByarg('oExercComptaId', requestBody.oExercComptaId);
  odasearchby(_oexerccomptaid)
  .exec(function (err, data) {
    if (err) {
      return next(err);
    }
    if (data) {
      res.status(403).send({
        success: false,
        message: `oExercComptaId: ${requestBody.NumCompte}  already exists`
      });
    }
    if (!data) {
      const getdata = insert$$(requestBody);
      getapistreamdata$(getdata).subscribe(getapiCreateObserver(req));
      next();
    }
  });
});

oexerccomptasRouter.put('/oexerccomptas/:id', function (req, res, next) {
  var requestBody = req.body;
  console.log(req.url + ' : querying for ' + req.params.id);
  const reqparamid = req.params.id;
  const getdata = update$(requestBody, reqparamid);
  getapistreamdata$(getdata).subscribe(getapiCreateObserver(req));

});

oexerccomptasRouter.delete('/oexerccomptas/:id', function (req, res, next) {
  console.log(req.url + ' : querying for ' + req.params.id);
  const getdata = delete$(req.params.id);
  getapistreamdata$(getdata).subscribe(getapiCreateObserver(req));
  next();
});

module.exports = oexerccomptasRouter;
