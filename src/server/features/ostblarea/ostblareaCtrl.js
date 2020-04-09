
"use strict";
const _ = require('lodash');
const { concatMap } = require('rxjs/operators');
const {getostblareas$,
  index,
  getByid$,
  Insertostblarea$,
  toCreateostblareadata$,
  toUpdateostblareadata$,
  odasearchBy,
  editostblarea$,
  Deleteostblarea$,
}=require('./ostblareaRepository').toinit();

const {result$}=require('./ostblareaSeed').toinit();
const ostblareaCtrl = (function () {
  const index$=function(){
    return getostblareas$;
    };

    const seedOstblarea$=function(){
      return result$;
      };

    const getall=function(callback){
      return index(callback);
      };
    const getbyid$=function(id){
      return getByid$(id);
      };

      const odasearchby=function(body){
        return odasearchBy(body);
        };
      const insertostblarea$ = function(body) {
     return toCreateostblareadata$(body).pipe(concatMap(function (x) {
          return Insertostblarea$(x);
        }));
      };

      const updateostblarea$ = function(body,requestparamid) {
        return toUpdateostblareadata$(body).pipe(concatMap(function (x) {
          return editostblarea$(x,requestparamid);
        }));
         };

        const deleteostblarea$ = function(requestparamid) {
    return Deleteostblarea$(requestparamid);

             };

  function toinit() {
    return {
getall:getall,
index$:index$(),
getbyid$:getbyid$,
odasearchby:odasearchby,
insert$:insertostblarea$,
update$:updateostblarea$,
delete$:deleteostblarea$,
seedOstblarea$:seedOstblarea$()

    };
  }

return {
  toinit: toinit
};



}
)();
module.exports= {
toinit:ostblareaCtrl.toinit
};
