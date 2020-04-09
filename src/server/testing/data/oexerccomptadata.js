const oexerccomptadata = (function () {

  const arroexerccomptadata = function () {
    return [{
        "oExercComptaId": "1900"
      }, {
        "oExercComptaId": 2006
      }
    ];
  }

  const oexcomptadata = [{
      " isActive": true,
      "Cloture": true,
      "_id": "5e8b7a140310040e3c00481c",
      "oExercComptaId": '1900',
      "DateDebut": "2020-04-06T18:51:00.115Z",
      "Datefin": "2020-04-06T18:51:00.115Z",
      " CreatedOn": "2020-04-06T18:51:00.115Z",
      "ModifiedOn": "2020-04-06T18:51:00.115Z",
      "CreatedBy": 'Admin',
      "ModifiedBy": 'Admin',
      "__v": 0,
      "id": '5e8b7a140310040e3c00481c'
    }, {
      " isActive": true,
      "Cloture": true,
      " _id": "5e8b7a140310040e3c00481d",
      "   oExercComptaId": '2006',
      "   DateDebut": "2020-04-06T18:51:00.115Z",
      "    Datefin": " 2020-04-06T18:51:00.115Z",
      "    CreatedOn": " 2020-04-06T18:51:00.115Z",
      "   ModifiedOn": " 2020-04-06T18:51:00.115Z",
      "  CreatedBy": 'Admin',
      "   ModifiedBy": 'Admin',
      "   __v": 0,
      "  id": '5e8b7a140310040e3c00481d'
    }

  ]
  const objoexerccomptadata = function () {
    return {
      "id" : "5e8b7a140310040e3c00481d",
      "Cloture" : false,
      "oExercComptaId" : "2006",
      "DateDebut" : "2007-01-01T19:34:49.659Z",
      "Datefin" : "2007-12-31T19:34:49.659Z"
    };
  }

  function toinit() {
    return {
      arroexerccomptadata: arroexerccomptadata(),
      objoexerccomptadata: objoexerccomptadata(),
      oexcomptadata: oexcomptadata
    }
  }
  return {
    toinit: toinit
  }
})();
module.exports = {
  toinit: oexerccomptadata.toinit
}
