//var nttCompteBalanceViewEnhanced =
/* eslint-disable  no-console */
/* eslint-disable no-unused-vars */
"use strict";
const {inArray,oarray} = require('../../sharedkernel/odaUtility').toinit();
const {blank,line,newLine,wrap,box}= require('../../sharedkernel/utils/spacer').toinit();
// Get Programming with JavaScript
// Inported by listings 15.02 and 15.03
// fitnessApp.userView


const ocompteView = (function () {
 
 const getInfo = function (objdata) {
 let _newLine  =  newLine();
 const _arr= oarray(objdata.arrArg)
 
       let underline = _newLine + line(28, "-") + _newLine;

       let infoString = _newLine + underline;
   
       infoString += "\n" + _arr.length + " item(s) has been created";       
       infoString += underline;

       infoString += box("Well done!", 14, "*");

       return infoString;
 };

 const getObjInfo = function (objdata) {
    let _newLine = newLine();
        let underline = _newLine + line(28, "-") + _newLine;
 
        let infoString = _newLine + underline; 
      
          //  infoString += objdata.NumCompte + "\n"; //+ "  ";
     
    
 
        infoString += "\n" + `CompteNumber  ${objdata.CompteNumber  }  has been created`       
        infoString += underline;
 
        infoString += box("Well done!", 14, "*");
 
        return infoString;
  };

 const render = function (objdata) {
     if(inArray(objdata.arrArg)===true) {
     return   console.log(getInfo(objdata));
     }
     else  if(inArray(objdata)===false) {
        return   console.log(getObjInfo(objdata));
        }
        else {
            return new Error(
              ` missing some arguments`);
            }


     //enable for production
//  var nstBalanceInputDiv = document.getElementById("nstbalanceinput");
   //    nstBalanceInputDiv.innerHTML = getInfo(nstbalanceinput.getData());
 };

function toinit() {
    return {
        render: render
    }
}
return {
  toinit:toinit
 };

})();

 module.exports = {
  toinit:ocompteView.toinit
 };
