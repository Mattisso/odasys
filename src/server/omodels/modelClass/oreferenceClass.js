"use strict";
const mongoose = require('mongoose'),
 ObjectId = mongoose.SchemaTypes.ObjectId;
 const { find, map, toLower, toUpper, assign, uniqBy } = require('lodash');

const oreferenceClass=(function(){
  function ocapitalize (val) {
    if (typeof val !== 'string') val = '';
    return val.charAt(0).toUpperCase() + val.substring(1);
    }
  function otolowercase(v) {
    return toLower(v);
  }

  function otoUppercase(v) {
    return toUpper(v);
  }

  const initObjOreference  = {
    RefCode: {
      type: String,
      required: true,
      unique: true,
      set: otolowercase,
      get: otoUppercase
    },
    Description:
		{
			type: String,
			set: otolowercase,
			get:ocapitalize
		},
    ocomptes: [{
			_ocompte: {
				type: ObjectId,
				ref: 'oCompte'
			}
		}]
  };
  class oreferenceClass {
    constructor(RefCode, Description) {
      this._refcode = RefCode;
      this._description = Description;
    }
    get refcode() {
      return this._refcode;
    }

    set refcode(RefCode) {
      this._refcode = RefCode;
      return this;
    }

    get description() {
      return this._description;
    }

    set description(Description) {
      this._description = Description;
      return this;
    }
  }
  const toOreference = function (o) {
    return (
      {
        "RefCode": o.RefCode,
        "Description": o.Description,
        "ocomptes": o.ocomptes
      });
  };


function toinit(){
  return {
    initObjOreference:initObjOreference
    ,oreferenceClass:oreferenceClass
  };
}

return {
toinit:toinit
};
})();
module.exports={
  toinit:oreferenceClass.toinit

};
