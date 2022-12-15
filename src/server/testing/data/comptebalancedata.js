
"use strict";
const comptebalancedata = (function () {
  const createData = {
    "OexercComptaKey": "5aee0f0023b8a2227003e7b0",
    "OtableauposteKey": "5aee0eff23b8a2227003e7aa",
    "OreferenceKey": "5aee0efe23b8a2227003e6ef",
    "nttcomptebalancedetails": [
      {
       
        "IntitulCompte": "Ninivie",
        "NumCompte": "767676",
        "SoldeDebit": 44829579

      }, {

        "IntitulCompte": "akolivi",
        "NumCompte": "969696",
        "SoldeDebit": 65643312
      },{

        "IntitulCompte": "akolivi",
        "NumCompte": "969696",
        "SoldeDebit": 65643312
      }, {

        "IntitulCompte": "mensahvi",
        "NumCompte": "828282",
        "SoldeDebit": 44829579,

      }, {

        "IntitulCompte": "efoevi",
        "NumCompte": "545454",
        "SoldeDebit": 65643312
      }
    ]

  };
  const editData = 
    {"id":"5e0550a0136de77cec5295fe","OreferenceKey":"5dbac518aa1fc24648be9879","OtableauposteKey":"5dbac521aa1fc24648be9ae2","OexercComptaKey":"5dbac506aa1fc24648be97d1","totalSoldeCredit":397975679,"totalSoldeDebit":0,"CreatedOn":"2019-12-27T00:30:24.829Z","ModifiedOn":"2019-12-27T00:30:24.829Z","CreatedBy":"Admin","ModifiedBy":"Admin","nttcomptebalancedetails":[{"nttcomptebalanceDetailKey":"5e0550a3136de77cec529622"},{"nttcomptebalanceDetailKey":"5e0550a3136de77cec529623"},{"nttcomptebalanceDetailKey":"5e0550a3136de77cec529624"},{"nttcomptebalanceDetailKey":"5e0550a3136de77cec529625"},{"nttcomptebalanceDetailKey":"5e0550a3136de77cec529626"},{"nttcomptebalanceDetailKey":"5e0550a3136de77cec529627"},{"nttcomptebalanceDetailKey":"5e0550a3136de77cec529628"},{"nttcomptebalanceDetailKey":"5e0550a3136de77cec529629"},
  
   {

    "IntitulCompte": "mensahvi",
    "NumCompte": "828282",
    "SoldeDebit": 44829579,
    "SoldeCredit": 0,

  }, {

    "IntitulCompte": "efoevi",
    "NumCompte": "545454",
    "SoldeDebit": 65643312,
    "SoldeCredit": 0,
  } ],"fullDescription":"CA - Capital","tableauLongName":"Bilan Passif","oExercComptaId":"2006"
};

  const arrcomptebalanceData= [
    {
      "_id" : "5dfa424cb78f6f289c0d9d34",
      "OreferenceKey" : "5df910a1f6cf342244ed1b9e",
      "OtableauposteKey" : "5df910aaf6cf342244ed1e6c",
      "OexercComptaKey" : "5df9108ef6cf342244ed1b63",
      "totalSoldeDebit" : 98017282,
      "totalSoldeCredit" : 269778544,
      "CreatedOn" : "2019-12-18T15:14:20.314Z",
      "ModifiedOn" : "2019-12-18T15:14:20.314Z",
      "CreatedBy" : "Admin",
      "ModifiedBy" : "Admin",
      "id" : "5dfa424cb78f6f289c0d9d34"

},
{
  "_id" : "5dfa424cb78f6f289c0d9d3d",
  "OreferenceKey" : "5df910a1f6cf342244ed1c39",
  "OtableauposteKey" : "5df910aaf6cf342244ed1e74",
  "OexercComptaKey" : "5df9108ef6cf342244ed1b63",
  "totalSoldeDebit" : 0,
  "totalSoldeCredit" : 10226524,
  "CreatedOn" : "2019-12-18T15:14:20.317Z",
  "ModifiedOn" : "2019-12-18T15:14:20.317Z",
  "CreatedBy" : "Admin",
  "ModifiedBy" : "Admin",
  "id" : "5dfa424cb78f6f289c0d9d3d"

}/* ,
{
  "_id" : "5dfa424cb78f6f289c0d9d2d",
  "OreferenceKey" : ("5df910a1f6cf342244ed1c0b"),
  "OtableauposteKey" : ("5df910aaf6cf342244ed1e74"),
  "OexercComptaKey" : ("5df9108ef6cf342244ed1b63"),
  "totalSoldeDebit" : 0,
  "totalSoldeCredit" : 397975679,
  "CreatedOn" : ("2019-12-18T15:14:20.312Z"),
  "ModifiedOn" : ("2019-12-18T15:14:20.312Z"),
  "CreatedBy" : "Admin",
  "ModifiedBy" : "Admin",
  "__v" : 0,
  "id" : "5dfa424cb78f6f289c0d9d2d",
} */
  ];
  function toinit() {
    return {
      createData: createData,
      editData: editData,
      arrcomptebalanceData:arrcomptebalanceData
    };
  }

  return {
    toinit: toinit
  };

})();
module.exports = {
  toinit: comptebalancedata.toinit
};
