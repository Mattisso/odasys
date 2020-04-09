

"use strict"
const nstbalanceinputdata = (function () {
  const createData = {
    "NumCompte": "102010",
    "IntitulCompte": "Dotation BENIN",
    "SoldeCredit": 44829579,
    "SoldeDebit": 0
  }
  const arrcreateData = [{
      "NumCompte": "102010",
      "IntitulCompte": "Dotation BENIN",
      "SoldeCredit": 44829579
    }, {
      "NumCompte": "102020",
      "IntitulCompte": "Dotation BURKINA",
      "SoldeCredit": 65643312
    }/* , {
      "NumCompte": "102040",
      "IntitulCompte": "Dotation CENTRAFRIQUE",
      "SoldeCredit": 41326938
    }, {
      "NumCompte": "102050",
      "IntitulCompte": "Dotation COTE D'IVOIRE",
      "SoldeCredit": 64842784
    }, {
      "NumCompte": "102060",
      "IntitulCompte": "Dotation GABON",
      "SoldeCredit": 64042255
    }, {
      "NumCompte": "102070",
      "IntitulCompte": "Dotation NIGER",
      "SoldeCredit": 41279251
    }, {
      "NumCompte": "102080",
      "IntitulCompte": "Dotation TOGO",
      "SoldeCredit": 57203109
    } */
  ]

  const editData = {
    "id": "5cf172b4764e844eac931b80",
    "NumCompte": "102010",
    "IntitulCompte": "Dotation BENIN",
    "SoldeCredit": 44829579,
    "SoldeDebit": 0,
    "CompteNumber": "1020",
    "CreatedOn": "2019-05-31T18:30:12.955Z",
    "ModifiedOn": "2019-05-31T18:30:12.955Z",
    "CreatedBy": "Admin",
    "ModifiedBy": "Admin"
  }
  function toinit() {
    return {
      createData: createData,
      editData: editData,
      arrcreateData:arrcreateData

    };
  }

  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: nstbalanceinputdata.toinit
};
