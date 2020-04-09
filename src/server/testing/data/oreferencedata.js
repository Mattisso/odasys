
const oreferencedata = (function () {

  const arroreferencedata = [{
      "RefCode": "unk",
      "Description": "unknown",
      "ocomptes": [{
          "CompteNumber": "000"

        }
      ]

    },
    {
      "RefCode": "AC",
      "Description": "Primes de remboursement des obligations",
      "ocomptes": [{
          "CompteNumber": "206"

        }
      ]

    }, {
      "RefCode": "BC",
      "Description": "Marchandises",
      "ocomptes": [{
          "CompteNumber": "31",

        }, {
          "CompteNumber": "381",

        }, {
          "CompteNumber": "387",

        }, {
          "CompteNumber": "391",

        }, {
          "CompteNumber": "3981",

        }
      ]

    }
  ];

  const objoreferencedata = {
    "RefCode": "AE",
    "Description": "Frais de recherche et de développement",
    "ocomptes": [{
        "CompteNumber": "211"
      }, {
        "CompteNumber": "2191"

      },
      {
        "CompteNumber": "2811"

      }, {
        "CompteNumber": "2919"

      }
    ]
  }
  const updObject = {
    "_id": "5e8b7a210310040e3c00487e",
    "isActive": true,
    "RefCode": "bc",
    "Description": "marchandises",
    "ocomptes": [{
        "_id": "5e8b7a140310040e3c00478a"
      }, {
        "_id": "5e8b7a140310040e3c004791"
      }, {
        "_id": "5e8b7a140310040e3c004795"
      }, {
        "_id": "5e8b7a140310040e3c004797"
      }, {
        "_id": "5e8b7a140310040e3c00479f"
      }
    ],
    "CreatedOn": "2020-04-06T18:51:13.266Z",
    "ModifiedOn": "2020-04-06T18:51:13.266Z",
    "CreatedBy": "Admin",
    "ModifiedBy": "Admin",
    "__v": 0
  }
  function toinit() {
    return {
      arroreferencedata: arroreferencedata,
      objoreferencedata: objoreferencedata,
      updObject:updObject
    }
  }
  return {
    toinit: toinit
  }
})();
module.exports = {
  toinit: oreferencedata.toinit
}
