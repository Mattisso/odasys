const  {getnstbalance,getnstbalances}=require('./nstbalance/nstbalanceQuery').toinit();
const  {getnstbalanceinput,getnstbalanceinputs}=require('./nstbalanceinput/nstbalanceinputQuery').toinit();
const  {getnttbalance,getnttbalances}=require('./nttbalance/nttbalanceQuery').toinit();
const  {getnttcomptebalance,getnttcomptebalances}=require('./nttcomptebalance/nttcomptebalanceQuery').toinit();
const  {getnttcomptebalancedetail,getnttcomptebalancedetails}=require('./nttcomptebalancedetail/nttcomptebalancedetailQuery').toinit();
const  {getocompte,getocomptes}=require('./ocompte/ocompteQuery').toinit();
const  {getocomptereference,getocomptereferences}=require('./ocomptereference/ocomptereferenceQuery').toinit();
const  {getoexerccompta,getoexerccomptas}=require('./oexerccompta/oexerccomptaQuery').toinit();

const  {getoexercice,getoexercices}=require('./oexercice/oexerciceQuery').toinit();

const  {getolevel,getolevels}=require('./olevel/olevelQuery').toinit();
const  {getoreference,getoreferences}=require('./oreference/oreferenceQuery').toinit();
const  {getoreportdetail,getoreportdetails}=require('./oreportdetail/oreportdetailQuery').toinit();
const  {getoreportheader,getoreportheaders}=require('./oreportheader/oreportheaderQuery').toinit();
const  {getostableauposte,getostableaupostes}=require('./ostableauposte/ostableauposteQuery').toinit();
const  {getostblarea,getostblareas}=require('./ostblarea/ostblareaQuery').toinit();
const  {getotableauposte,getotableaupostes}=require('./otableauposte/otableauposteQuery').toinit();
const  {getuser,getusers}=require('./user/userQuery').toinit();

// const {createOcompteMutation}=require('./ocompte/ocompteMutation').toinit();
// const { GraphQLObjectType} =require('graphql');

const queryTypes=(function(){
  const getrootqueries = {
    getnstbalance: getnstbalance,
    getnstbalances: getnstbalances,
    getnstbalanceinput: getnstbalanceinput,
    getnstbalanceinputs: getnstbalanceinputs,
    getnttbalance: getnttbalance,
    getnttbalances: getnttbalances,
    getnttcomptebalance: getnttcomptebalance,
    getnttcomptebalances: getnttcomptebalances,
    getnttcomptebalancedetail: getnttcomptebalancedetail,
    getnttcomptebalancedetails: getnttcomptebalancedetails,
    getocompte: getocompte,
    getocomptes: getocomptes,
    getocomptereference: getocomptereference,
    getocomptereferences: getocomptereferences,
    getoexerccompta: getoexerccompta,
    getoexerccomptas: getoexerccomptas,
    getoexercice: getoexercice,
    getoexercices: getoexercices,
    getolevel: getolevel,
    getolevels: getolevels,
    getoreference: getoreference,
    getoreferences: getoreferences,
    getoreportdetail: getoreportdetail,
    getoreportdetails: getoreportdetails,
    getoreportheader: getoreportheader,
    getoreportheaders: getoreportheaders,
    getostableauposte: getostableauposte,
    getostableaupostes: getostableaupostes,
    getostblarea: getostblarea,
    getostblareas: getostblareas,
    getotableauposte: getotableauposte,
    getotableaupostes: getotableaupostes,
    getuser: getuser,
    getusers: getusers,

  };



function toinit(){
  return {
    getrootqueries:getrootqueries
   // getmutation:getmutation

  };
}
return {
  toinit:toinit
};
})();
module.exports={
  toinit:queryTypes.toinit
};
