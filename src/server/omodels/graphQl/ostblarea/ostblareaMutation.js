const {oStblAreaType}=require('./ostblareaSchema').toinit();
const graphql = require('graphql');
const { GraphQLObjectType,  GraphQLString,   GraphQLNonNull} = graphql;
const {oStblArea} = require('../../modelsSchema/index').toinit();


const ostblareaMutation = (function () {
	const toCreateOStblArea = {
		type: oStblAreaType,
		args: {},
		resolve(parent, args, context, info) {
			let ostblarea = new oStblArea({});
			return ostblarea.save();
		}
	};
	const toUpdateOStblArea = {
		type: oStblAreaType,
		args: {},
		resolve(parent, args, context, info) {
			let ostblarea = new oStblArea({});
			return ostblarea.save();
		}
	};
	const toDeleteOStblArea = {
		type: oStblAreaType,
		args: {},
		resolve(parent, args, context, info) {
			let ostblarea = new oStblArea({});
			return ostblarea.save();
		}
	};
	function toinit() {
		return {
			toCreateOStblArea: toCreateOStblArea,
			toUpdateOStblArea: toUpdateOStblArea,
			toDeleteOStblArea: toDeleteOStblArea,
		};
	}
	return {
		toinit: toinit
	};
})();
module.exports = {
	toinit: ostblareaMutation.toinit
};
