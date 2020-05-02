const path = require('path');
const  routes = require('express').Router();

const  nstbalanceinputsRoutes= require('./nstbalanceinputs');
const  nstbalancesRoutes= require('./nstbalances');
const  fileUploadsRoutes= require('./file-uploads');
const  exerccomptasRouter= require('./oexerccomptas');
const  oreferencesRouter= require('./oreferences');
const otableaupostesRouter= require('./otableaupostes');
const  nttcomptebalancesRouter= require('./nttcomptebalances');
const  nttcomptebalancedetailsRouter= require('./nttcomptebalancedetails');
const  nttbalancesRouter= require('./nttbalances');
const  nsbalancesRouter= require('./nstbalances');

const  ocomptereferencesRouter= require('./ocomptereferences');
const  ocomptesRouter= require('./ocomptes');
const  oexercicesRouter= require('./oexercices');
const  olevelsRouter= require('./olevels');
const  oreportdetailsRouter= require('./oreportdetails');
const  oreportheadersRouter= require('./oreportheaders');
const  ostableaupostesRouter= require('./ostableaupostes');
const  ostblareasRouter= require('./ostblareas');

const userRouter =require('./users');
/* const  nttcomptebalancedetailRouter= require('./nttcomptebalancedetail'); */

routes.get('/', (req, res) => {
 return  res.status(200).json({ message: 'Connected!' });
});

/*routes.use('/api', function(req, res, next) {
  return   nstbalanceinputsRoutes();
    //process each request nstbalanceinputsRoutes
    });*/
routes.use('/api',userRouter);
routes.use('/api',nstbalanceinputsRoutes);
routes.use('/api',fileUploadsRoutes);
routes.use('/api',nstbalancesRoutes);
routes.use('/api',exerccomptasRouter);
routes.use('/api',oreferencesRouter);
routes.use('/api',otableaupostesRouter);
routes.use('/api',nttcomptebalancesRouter);
routes.use('/api',nttcomptebalancedetailsRouter);
routes.use('/api',nttbalancesRouter);
routes.use('/api',ocomptereferencesRouter);
routes.use('/api',ocomptesRouter);
routes.use('/api',olevelsRouter);
routes.use('/api',oreportdetailsRouter);
routes.use('/api',oreportheadersRouter);
routes.use('/api',ostableaupostesRouter);
routes.use('/api',ostblareasRouter);
routes.use('/api',oexercicesRouter);
/* routes.use('/api',nsbalanceRouter);

routes.use('/api',nttcomptebalancedetailRouter); */

//routes.use(nstbalanceinputsRoutes);

module.exports = routes;
