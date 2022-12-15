"use strict";
const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const oreportheaderClass=(function(){

const modelObject = {
	OtableauposteKey: {
		type: ObjectId,
		ref: 'oTableauPoste'
	},
	OreferenceKey: {
		type: ObjectId,
		ref: 'oReference'
	},
	SortOrderH: {
		type: Number,
	default:
		1
	},

};

class oreportHeaderClass {
	constructor(OtableauposteKey, OreferenceKey, SortOrderH) {
		this._SortOrderH = SortOrderH;
		this._OtableauposteKey = OtableauposteKey;
		this._OreferenceKey = OreferenceKey;
	}

	get sortorderH() {
		return this._sortOrderH;
	}
	set sortOrderH(SortOrderH) {
		this._sortOrderH = SortOrderH;
	//	return this;
	}
	get otableaupostekey() {
		return this._OtableauposteKey;
	}
	set otableaupostekey(OtableauposteKey) {
		this._OtableauposteKey = OtableauposteKey;
	//	return this;
	}
	get oreferencekey() {
		return this._OreferenceKey;
	}
	set oreferencekey(OreferenceKey) {
		this._OreferenceKey = OreferenceKey;
	//	return this;
	}

}

function toinit(){
  return {
    modelObject:modelObject,
    oreportHeaderClass:oreportHeaderClass,
  };
}

return {
toinit:toinit
};
})();
module.exports={
  toinit:oreportheaderClass.toinit
};
