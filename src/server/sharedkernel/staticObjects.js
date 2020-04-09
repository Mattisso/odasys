"use strict";
const { find, forEach } = require('lodash');
const { isValid, hasitem, getStringValue, odareduceArray } = require('./odaUtility').toinit();
const staticObjects = (function () {
  const getobjBalanceinput = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
        return o.NumCompte === getStringValue(value)
          || o.IntitulCompte === getStringValue(value)
          || o.id === getStringValue(value);
      });
      return {
        odaObject: function () {
          return validate;
        }
      };
    }else {
      return new Error(
        `Invalid  ${value}`);
    }

  };
  const getobjnstBalance = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
        return o.NumCompte === getStringValue(value)
          || o.IntitulCompte === getStringValue(value)
          || o.OreferenceKey === getStringValue(value)
          || o.OtableauposteKey === getStringValue(value)
          || o.OexercComptaKey === getStringValue(value)
          || o.id === getStringValue(value);
      });
      return {
        odaObject: function () {
          return validate;
        }
      };
    } else {
      return new Error(
        `Invalid  ${value}`);
    }
  };
  const getobjolevel = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
        return o.olevelNum === getStringValue(value)
          || o.olevelKey === getStringValue(value)
          || o.id === getStringValue(value);
      });
      return {
        odaObject: function () {
          return validate;
        },filteredObject: function () {
          return {
            "olevelKey": validate.id,
            "olevelNum": validate.olevelNum,
            "olevelDescption": validate.olevelDescption
          };
        }
      };
    } else {
      return new Error(
        `Invalid  ${value}`);
    }
  };
  const getobjOcompte = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
        return o.CompteNumber === getStringValue(value)
          || o.OcompteKey === getStringValue(value)
          || o.id === getStringValue(value);
      });
      return {
        odaObject: function () {
          return validate;
        },
        filteredObject: function () {
          return {
            "OcompteKey": validate.id,
            "CompteNumber": validate.CompteNumber
          };
        }
      };
    } else {
      return new Error(
        `Invalid  ${value}`);
    }
  };
  const getobjOexercCompta = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
        return o.oExercComptaId === getStringValue(value)
          || o.OexercComptaKey === getStringValue(value)
          || o.id === getStringValue(value);
      });
      return {
        odaObject: function () {
          return validate;
        },
        filteredObject: function () {
          return {
         //   "OexercComptaKey":validate.id,
            "oexercCompta": validate.oExercComptaId
          };
        }
      };
    } else {
      return new Error(
        `Invalid  ${value}`);
    }
  };
  const getobjOexercice = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
        return o.OexercComptaKey === getStringValue(value)
          || o.oExerciceEncour === getStringValue(value)
          || o.OexercComptaPrevKey === getStringValue(value)
          || o.ExercicePrev === getStringValue(value)
          || o.id === getStringValue(value);
      });
      return {
        odaObject: function () {
          return validate;
        },
        filteredObject: function () {
          return {
            "OexerciceKey": validate.id,
            "OexercComptaKey": validate.OexercComptaKey,
            "oExerciceEncour": validate.oExerciceEncour,
            "ExercicePrev": validate.ExercicePrev
          };
        }
      };
    } else {
      return new Error(
        `Invalid  ${value}`);
    }
  };
  const getobjOstblarea = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
        return o.AreaShortName === getStringValue(value)
          || o.OstblareaKey === getStringValue(value)
          || o.id === getStringValue(value)
          || o.OcompteKey === getStringValue(value);
      });
      return {
        odaObject: function () {
          return validate;
        },
        filteredObject: function () {
          return {
            "OstblareaKey": validate.id,
            "AreaShortName": validate.AreaShortName,
            "AreaLongName": validate.AreaLongName
          };
        }
      };
    } else {
      return new Error(
        `Invalid  ${value}`);
    }
  };
  const getobjOtableauposte = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
        return o.TableauName === getStringValue(value)
          || o.OtableauposteKey === getStringValue(value)
          || o.id === getStringValue(value)
        //  || o.OstableauposteKey === getStringValue(value);
      });
      return {
        odaObject: function () {
          return validate;
        },
        filteredObject: function () {
          return {
         //   "OtableauposteKey": validate.id,
         //   "TableauName": validate.TableauName,
            "otableauposte": validate.tableauLongName,
          };
        }
      };
    } else {
      return new Error(
        `Invalid  ${value}`);
    }
  };
  const getobjOstableauposte = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
        return o.StableauName === getStringValue(value)
          || o.OstableauposteKey === getStringValue(value)
          || o.id === getStringValue(value)
          || o.OstblareaKey === getStringValue(value);
      });
      return {
        odaObject: function () {
          return validate;
        },
        filteredObject: function () {
          return {
       //     "OstableauposteKey":validate.id,
        //    "StableauName": validate.StableauName,
            "StbleauLongName": validate.StbleauLongName
          };
        }
      };
    } else {
      return new Error(
        `Invalid  ${value}`);
    }
  };
  const getobjOreference = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
        return o.RefCode === getStringValue(value) || o.OreferenceKey === getStringValue(value) || o.id === getStringValue(value);
      });
      return {
        odaObject: function () {
          return validate;
        },
        filteredObject: function () {
          return {
        //    "OreferenceKey":validate.id,
          //  "RefCode": validate.RefCode,
          //  "Description": validate.Description,
            "oreference": validate.fullDescription
          };
        }
      };
    } else {
      return new Error(
        `Invalid  ${value}`);
    }
  };
  const getobjnttcomptebalanceDetail = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
        return o.NumCompte === getStringValue(value)
          || o.id === getStringValue(value)
          || o.nttcomptebalanceKey === getStringValue(value);
      });
      return {
        odaObject: function () {
          return validate;
        }
      };
    } else {
      return new Error(
        `Invalid  ${value}`);
    }
  };
  const getObjcomptereference = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
        return (o.CompteNumber === getStringValue(value) || o.OcompteKey === getStringValue(value)
          || o.OreferenceKey === getStringValue(value)
          || o.OtableauposteKey === getStringValue(value)
          || o.OstableauposteKey === getStringValue(value)
          || o.OstblareaKey === getStringValue(value)
          || o.id === getStringValue(value));
      });
      return {
        odaObject: function () {
          return validate;
        },
        filteredObject: function () {
          return {
            "OcomptereferenceKey": validate.id,
            "compteKey": validate.OcompteKey,
            "OstblareaKey": validate.OstblareaKey,
            "OreferenceKey": validate.OreferenceKey,
            "OstableauposteKey": validate.OstableauposteKey,
            "OtableauposteKey": validate.OtableauposteKey
          };
        }
      };
    } else {
      return new Error(
        `Invalid  ${value}`);
          }
  };
  const getObjOcomptereferenceCombined = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
        return (o.OcompteKey === value.OcompteKey && o.OreferenceKey === value.OreferenceKey
          && o.OtableauposteKey === value.OtableauposteKey)
          || (o.OreferenceKey === value.OreferenceKey && o.OtableauposteKey === value.OtableauposteKey);
      });
      return {
        odaObject: function () {
          return validate;
        },
        filteredObject: function () {
          return {
            "OcomptereferenceKey": validate.id,
            "compteKey": validate.OcompteKey,
            "OstblareaKey": validate.OstblareaKey,
            "OreferenceKey": validate.OreferenceKey,
            "OstableauposteKey": validate.OstableauposteKey,
            "OtableauposteKey": validate.OtableauposteKey
          };
        }

      };
    } else {
      return new Error(
        `Invalid  ${value}`);
    }
  };
  const getObjcomptebalance = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
        return o.OreferenceKey === getStringValue(value)
          || o.OtableauposteKey === getStringValue(value)
          || o.OexercComptaKey === getStringValue(value)
          || o.id === getStringValue(value);
      });
      return {
        odaObject: function () {
          return validate;
        }
      };
    } else {
      return new Error(
        `Invalid  ${value}`);
    }
  };
  const getobjnttBalance = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
        return o.NumCompte === getStringValue(value)
          || o.IntitulCompte === getStringValue(value)
          || o.OcompteKey === getStringValue(value)
          || o.OreferenceKey === getStringValue(value)
          || o.OtableauposteKey === getStringValue(value)
          || o.OexercComptaKey === getStringValue(value)
          || o.id === getStringValue(value);
      });
      return {
        odaObject: function () {
          return validate;
        }
      };
    } else {
      return new Error(
        `Invalid  ${value}`);
    }
  };
  const getObjoreportdetail = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
        return o.OreferenceKey === getStringValue(value)
          || o.OtableauposteKey === getStringValue(value)
          || o.olevelKey === getStringValue(value)
          || o.id === getStringValue(value);
      });
      return {
        odaObject: function () {
          return validate;
        },
        filteredObject: function () {
          return {
            "OreportdetailKey":validate.id,
            "olevelKey": validate.olevelKey,
            "OreferenceKey": validate.OreferenceKey,
            "OtableauposteKey": validate.OtableauposteKey
          };
        }
      };
    } else {
      return new Error(
        `Invalid  ${value}`);
    }
  };
  const getObjoreportheader = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
        return o.OreferenceKey === getStringValue(value)
          || o.OtableauposteKey === getStringValue(value)
          || o.id === getStringValue(value);
      });
      return {
        odaObject: function () {
          return validate;
        },
        filteredObject: function () {
          return {
            "OreportheaderKey":validate.id,
            "OreferenceKey": validate.OreferenceKey,
            "OtableauposteKey": validate.OtableauposteKey
          };
        }
      };
    } else {
      return new Error(
        `Invalid  ${value}`);
    }
  };
  const getobjuser = function (arr, value) {
    if (isValid(value) === true) {
      const validate = find(arr, function (o) {
        return o.username === getStringValue(value)
          || o.userKey === getStringValue(value)
          || o.role === getStringValue(value)
          || o.id === getStringValue(value);
      });
      return {
        odaObject: function () {
          return validate;
        }
      };
    } else {
      return new Error(
        `Invalid  ${value}`);
    }
  };
  function toinit() {
    return {
      getobjolevel: getobjolevel,
      getobjnstBalance: getobjnstBalance,
      getobjOcompte: getobjOcompte,
      getobjOexercCompta: getobjOexercCompta,
      getobjOstblarea: getobjOstblarea,
      getobjOtableauposte: getobjOtableauposte,
      getobjOstableauposte: getobjOstableauposte,
      getobjnttcomptebalanceDetail: getobjnttcomptebalanceDetail,
      getobjOreference: getobjOreference,
      getObjcomptereference: getObjcomptereference,
      getObjcomptebalance: getObjcomptebalance,
      getobjBalanceinput: getobjBalanceinput,
      getobjOexercice: getobjOexercice,
      getobjnttBalance: getobjnttBalance,
      getObjOcomptereferenceCombined: getObjOcomptereferenceCombined,
      getObjoreportdetail: getObjoreportdetail,
      getObjoreportheader: getObjoreportheader,
      getobjuser: getobjuser
    };
  }
  return {
    toinit: toinit
  };
})();
module.exports = {
  toinit: staticObjects.toinit
};
