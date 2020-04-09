//  async = require('async')
var Models = require('../../../omodels');
var _ = require('lodash');

var oexerciceModel= (function () {


  var DetailCount = 0,
  _arrstbalances =[],
  balancevar;

function tostbalance (omodel,requestBody) {

  return new omodel(
    {
      "oExercComptaId": _.toNumber(requestBody.oExercComptaId),
      "DateDebut": requestBody.DateDebut,
      "Datefin": requestBody.Datefin,
      "Cloture": requestBody.Cloture
    });


}


function toUpdatestbalance (result, requestparamid, requestBody) {
  var d = new Date();

if (result) {
  {
    result._id = requestparamid,
    result.oExercComptaId = requestBody.oExercComptaId,
    result.DateDebut = requestBody.DateDebut,
    result.Datefin = requestBody.Datefin,
    result.Cloture = requestBody.Cloture,
    result.ModifiedOn = d;

  }
}
return result;
}



function BuildnstBalance(omodel,requestBody) {

  var stbalancedata = tostbalance(omodel,requestBody);

    _arrstbalances.push(stbalancedata);


DetailCount = _arrstbalances.length;

return {

  DetailCount: DetailCount,
 _arrstbalances:_arrstbalances.slice()

};

  }

  function  toInitializeInstance(omodel,body)  {
    var stbalancedata = BuildnstBalance(omodel,body);

    return {

      'DetailCount': stbalancedata.DetailCount,
      '_arrstbalances':   stbalancedata._arrstbalances.slice()
    };


  }



function hasitem (obj) {
return this._arrstbalances.indexOf(obj) !== -1;

}

function removeItem (obj) {
var itemIndex = _arrstbalances.indexOf(obj);
if (itemIndex !== -1) {
  _arrstbalances.splice(itemIndex, 1);
}
}


function  addNewstbalance() {
_arrstbalances.push({
  "oExercComptaId":"",
  "DateDebut":"",
  "Datefin":"",
  "Cloture":""
});
// this._arrstbalances.slice();
}



function getTotalCount () {

    if (_arrstbalances.length !== undefined && _arrstbalances.length>0) {

      return _arrstbalances.length;

    }

  }

function getData () {

return {
  'DetailCount': getTotalCount(),
  '_arrstbalances':   _arrstbalances.slice()
};
}

function popular(callback) {
  Models.oExercice.find({}, {}, {limit:5},
   function (err, oExercComptas) {
      if (err) throw err;
      callback(null, oExercComptas);
    });
}

function toinit() {

  return {
    toInitializeInstance:toInitializeInstance,
    tostbalance:tostbalance,
    BuildnstBalance:BuildnstBalance,
    getData:getData,
    hasitem:hasitem,
    removeItem:removeItem,
    addNewstbalance:addNewstbalance,
    toUpdatestbalance:toUpdatestbalance,
    popular:popular
  };

}

return {
  toinit: toinit
};




})();
module.exports= {
toinit:oexerciceModel.toinit
};
