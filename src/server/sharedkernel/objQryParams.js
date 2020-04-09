
/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
const _ = require('lodash');

const objQryParams = (function () {
  function isValid(val) {
    return !_.isUndefined(val) && !_.isNull(val);
  }

  const odacriterias = function (data) {
    if (isValid(data.TotalSoldeDebit) === true
       && isValid(data.TotalSoldeDebit) === true
       && data.TotalSoldeDebit > 0 && data.TotalSoldeCredit > 0) {
      return {
        odasum: {
          totalSoldeDebit: data.TotalSoldeDebit,
          totalSoldeCredit: data.TotalSoldeCredit,
          DetailCount: data.DetailCount,
        },
        arrArg: data.arrArg.slice()
      };
    }

    if (isValid(data.TotalSoldeDebit) === true
       && isValid(data.TotalSoldeDebit) === true
       && data.TotalSoldeDebit > 0 && data.TotalSoldeCredit === 0) {
      return {
        odasum: {
          totalSoldeDebit: data.TotalSoldeDebit,
          DetailCount: data.DetailCount,
        },
        arrArg: data.arrArg.slice()
      };
    }

    if (isValid(data.TotalSoldeDebit) === true
       && isValid(data.TotalSoldeDebit) === true &&
      data.TotalSoldeCredit > 0 && data.TotalSoldeDebit === 0) {
      return {
        odasum: {
          totalSoldeCredit: data.TotalSoldeCredit,
          DetailCount: data.DetailCount,
        },
        arrArg: data.arrArg.slice()
      };
    }

    if (isValid(data.TotalSoldeDebit) === true
       && isValid(data.TotalSoldeDebit) === true
       && data.TotalSoldeCredit > 0 && data.TotalSoldeDebit === 0) {
      return {
        odasum: {
          totalSoldeCredit: data.TotalSoldeCredit,
          DetailCount: data.DetailCount,
        },
        arrArg: data.arrArg.slice()
      };
    }
    if (isValid(data.TotalSoldeDebit) === false
       && isValid(data.TotalSoldeDebit) === false
       || data.TotalSoldeCredit === 0 && data.TotalSoldeDebit === 0) {
      return {
        odasum: {
          DetailCount: data.DetailCount,
        },
        arrArg: data.arrArg.slice()
      };
    }
  };

  function toinit() {
    return {
      odacriterias: odacriterias
    };
  }
  return {
    toinit: toinit
  };

})();

module.exports = {
  toinit: objQryParams.toinit
};
