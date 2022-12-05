"use strict";
const mongoose = require('mongoose'),
 ObjectId = mongoose.SchemaTypes.ObjectId;
const otableauposteClass=(function(){

  const modelObject = {
    TableauName: {
      type: String
    },
    tableauLongName: {
      type: String
    },
    ostableaupostes: [{
        OstableauposteKey: {
          type: ObjectId,
          ref: 'oStableauPoste'
        }
      }
    ]
  };

  class otableauposteClass {
    constructor(TableauName, tableauLongName) {
      this._TableauName = TableauName;
      this._tableauLongName = tableauLongName;
    }

    get tableauname() {
      return this._TableauName;
    }
    get tableaulongname() {
      return this._tableauLongName;
    }
    set tableauname(TableauName) {
      this._TableauName = TableauName;
    //  return this;
    }
    set tableaulongname(tableauLongName) {
      this._tableauLongName = tableauLongName;
     // return this;
    }
  }
  function tonit(){
    return {
      modelObject:modelObject,
      otableauposteClass:otableauposteClass
    };
  }

  return {
    tonit:tonit
  };
})();
module.exports={
  tonit:otableauposteClass.tonit
};
