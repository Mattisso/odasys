"use strict";
const { isValid, replaceNullToZero } = require('../../SharedKernel/odaUtility').toinit();

const objQryParams = (function () {
  const getAmortProvAmnt = function (_obj) {
    let _AmortProvAmnt = 0;
    if (isValid(_obj.StableauName) === true && _obj.StableauName === 'tblAmortImmo' && _obj.SoldeCredit > 0) {
      _AmortProvAmnt = _obj.SoldeCredit;
    } else if (isValid(_obj.StableauName) === true && _obj.StableauName === 'tblProvision' && _obj.SoldeCredit > 0) {
      _AmortProvAmnt = _obj.SoldeCredit;

    } else {
      _AmortProvAmnt = 0;
    }
    return replaceNullToZero(_AmortProvAmnt);

  };
  const getSoldeCredit = function (_obj) {
    let _SoldeCredit = 0;

    _SoldeCredit = _obj.SoldeCredit;

    return replaceNullToZero(_SoldeCredit);

  };

  const getProvAmnt = function (_obj) {
    let _ProvAmnt = 0;
    if (isValid(_obj.StableauName) === true && _obj.StableauName == 'tblProvision') {
      _ProvAmnt = _obj.SoldeCredit;
    }
    return replaceNullToZero(_ProvAmnt);

  };
  const getSoldeDebit = function (_obj) {
    let _SoldeDebit = 0;

    _SoldeDebit = _obj.SoldeDebit;

    return replaceNullToZero(_SoldeDebit);

  };
  const getAmountNet = function (_obj) {
    let _netamount = 0,
 //    _AmortProvAmnt = getAmortProvAmnt(_obj),
 //   _ProvAmnt = getProvAmnt(_obj),
    _SoldeDebit = getSoldeDebit(_obj),
    _SoldeCredit = getSoldeCredit(_obj);
    if (_SoldeDebit > _SoldeCredit) {
      _netamount = _SoldeDebit - _SoldeCredit;
    } else if (_SoldeCredit > _SoldeDebit) {
      _netamount = _SoldeCredit - _SoldeDebit;
    } else if (_SoldeDebit > 0 && _SoldeCredit > 0 && _SoldeDebit > _SoldeCredit) {
      _netamount = _SoldeCredit - _SoldeDebit;
    } else {
      _netamount = 0;
    }
    return replaceNullToZero(_netamount);


  };

  function queryselector(obj) {
    var selector = false;
    if ((isValid(obj.OexercComptaKey) === true) && (isValid(obj.OtableauposteKey) === true)
       && (isValid(obj.OreferenceKey) === true)) {

      selector = true;
    }  else {
      selector = false;

    }
    return selector;
  }

  function toinit() {
    return {
      getAmortProvAmnt: getAmortProvAmnt,
      getSoldeCredit: getSoldeCredit,
      getProvAmnt: getProvAmnt,
      getSoldeDebit: getSoldeDebit,
      getAmountNet: getAmountNet,
      queryselector:queryselector
    };
  }
  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: objQryParams.toinit
};

//console.log(objQryParams.toinit().toUpdateChgCredit(nstbalancedata, ocomptereferencesdata).ChgCreditObjectUpdate());
