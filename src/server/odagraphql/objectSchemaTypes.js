/* 
const {GraphQLObjectType, GraphQLString, GraphQLID,  GraphQLList, GraphQLNonNull,  GraphQLInt, GraphQLBoolean} = require('graphql');
//const {User} = require('../../omodels/modelsSchema/index').toinit();

const objectSchemaTypes = (function () {
	const UserType = new GraphQLObjectType({
			name: 'User',
			fields: () => ({
				id: {
					type: GraphQLID
				},
				username: {
					type: new GraphQLNonNull(GraphQLString)
				},
				role: {
					type: new GraphQLNonNull(GraphQLString)
				},
				password: {
					type: new GraphQLNonNull(GraphQLString)
				},
				loginAttempts: {
					type: GraphQLInt
				}
			})
		});

	const OcompteType = new GraphQLObjectType({
			name: 'Ocompte',
			fields: () => ({
				id: {
					type: GraphQLID
				},
				CompteNumber: {
					type: GraphQLString
				},
				oreference: {
					type: OreferenceType,
					resolve(parent, args) {
						return oReference.findById(parent.oreferenceID);
					}
				}

			})
		});

	const OreferenceType = new GraphQLObjectType({
			name: 'oReference',
			fields: () => ({
				id: {
					type: GraphQLID
				},
				RefCode: {
					type: GraphQLString
				},
				Description: {
					type: GraphQLString
				},
				fullDescription: {
					type: GraphQLString
				},
				ocomptes: {
					type: new GraphQLList(OcompteType),
					resolve(parent, args) {
						return Ocompte.find({
							id: parent.id
						});
					}
				}
			})
		});
	const oReportDetailType = new GraphQLObjectType({
			name: 'oReportDetail',
			fields: () => ({
        id: {
					type: GraphQLID
				},
				OreferenceKey: {
					type: GraphQLString
				},
				SortOrder: {
					type: GraphQLInt
				},
				olevelKey: {
					type: GraphQLString
				},
				OtableauposteKey: {
					type: GraphQLString
				},
			})
		});
	const nstBalanceType = new GraphQLObjectType({
			name: 'nstBalance',
			fields: () => ({
        id: {
					type: GraphQLID
				},
				SoldeCredit: {
					type: GraphQLInt
				},
				SoldeDebit: {
					type: GraphQLInt
				},
				NumCompte: {
					type: GraphQLString
				},
				IntitulCompte: {
					type: GraphQLString
				},
				OcompteKey: {
					type: GraphQLString
				},
				OreferenceKey: {
					type: GraphQLString
				},
				OtableauposteKey: {
					type: GraphQLString
				},
				OexercComptaKey: {
					type: GraphQLString
				}

			})
		});

	const nstBalanceInputType = new GraphQLObjectType({
			name: 'nstBalanceInput',
			fields: () => ({
        id: {
					type: GraphQLID
				},
				SoldeDebit: {
					type: GraphQLInt
				},
				CompteNumber: {
					type: GraphQLInt
				},
				SoldeCredit: {
					type: GraphQLInt
				},
				IntitulCompte: {
					type: GraphQLString
				},
				NumCompte: {
					type: GraphQLString
				},
			})
		});
	const nttBalanceType = new GraphQLObjectType({
			name: 'nttBalance',
			fields: () => ({
        id: {
					type: GraphQLID
				},
				SoldeCredit: {
					type: GraphQLInt
				},
				SoldeDebit: {
					type: GraphQLInt
				},
				IntitulCompte: {
					type: GraphQLString
				},
				NumCompte: {
					type: GraphQLString
				},
				OreferenceKey: {
					type: GraphQLString
				},
				OcompteKey: {
					type: GraphQLString
				},
				OexercComptaKey: {
					type: GraphQLString
				},
				OtableauposteKey: {
					type: GraphQLString
				},
			})
		});

	const nttCompteBalanceType = new GraphQLObjectType({
			name: 'nttCompteBalance',
			fields: () => ({
        id: {
					type: GraphQLID
				},
				nttcomptebalancedetails: {
					type: GraphQLString
				},
				amntNet: {
					type: GraphQLInt
				},
				TotalProvision: {
					type: GraphQLInt
				},
				TotalAmortissment: {
					type: GraphQLInt
				},
				totalSoldeCredit: {
					type: GraphQLInt
				},
				totalSoldeDebit: {
					type: GraphQLInt
				},
				OreferenceKey: {
					type: GraphQLString
				},
				OtableauposteKey: {
					type: GraphQLString
				},
				OexercComptaKey: {
					type: GraphQLString
				},
			})
		});
	const nttCompteBalanceDetailType = new GraphQLObjectType({
			name: 'nttCompteBalanceDetail',
			fields: () => ({
        id: {
					type: GraphQLID
				},
				Net_Amnt: {
					type: GraphQLInt
				},
				Provis_Amnt: {
					type: GraphQLInt
				},
				Amort_Amnt: {
					type: GraphQLInt
				},
				SoldeCredit: {
					type: GraphQLInt
				},
				SoldeDebit: {
					type: GraphQLInt
				},
				IntitulCompte: {
					type: GraphQLString
				},
				NumCompte: {
					type: GraphQLString
				},
				nttcomptebalanceKey: {
					type: GraphQLString
				}
			})
		});

	const OcompteReferenceType = new GraphQLObjectType({
			name: 'OcompteReference',
			fields: () => ({
        id: {
					type: GraphQLID
				},
				Taux: {
					type: GraphQLInt
				},
				Exception: {
					type: GraphQLBoolean
				},
				OstableauposteKey: {
					type: GraphQLString
				},
				OtableauposteKey: {
					type: GraphQLString
				},
				OreferenceKey: {
					type: GraphQLString
				},
				OstblareaKey: {
					type: GraphQLString
				},
				OcompteKey: {
					type: GraphQLString
				}
			})
		});

	const oExercComptaType = new GraphQLObjectType({
			name: 'oExercCompta',
			fields: () => ({
        id: {
					type: GraphQLID
				},
				Cloture: {
					type: GraphQLBoolean
				},
				Datefin: {
					type: GraphQLString
				},
				DateDebut: {
					type: GraphQLString
				},
				oExercComptaId: {
					type: GraphQLString
				},
			})
		});

	const oExerciceType = new GraphQLObjectType({
			name: 'oExercice',
			fields: () => ({
        id: {
					type: GraphQLID
				},
				OexercComptaEncourKey: {
					type: GraphQLString
				},
				OexercComptaPrevKey: {
					type: GraphQLString
				},
				ExercicePrev: {
					type: GraphQLString
				},
				oExerciceEncour: {
					type: GraphQLString
				},
			})
		});

	const OlevelType = new GraphQLObjectType({
			name: 'Olevel',
			fields: () => ({
        id: {
					type: GraphQLID
				},
				olevelDescption: {
					type: GraphQLString
				},
				olevelNum: {
					type: GraphQLString
				},
			})
		});
	const oReportHeaderType = new GraphQLObjectType({
			name: 'oReportHeader',
			fields: () => ({
        id: {
					type: GraphQLID
				},
				SortOrderH: {
					type: GraphQLInt
				},
				OreferenceKey: {
					type: GraphQLString
				},
				OtableauposteKey: {
					type: GraphQLString
				},
			})
		});
	const oStableauPosteType = new GraphQLObjectType({
			name: 'oStableauPoste',
			fields: () => ({
        id: {
					type: GraphQLID
				},
				StbleauLongName: {
					type: GraphQLString
				},
				StableauName: {
					type: GraphQLString
				},
				OtableauposteKey: {
					type: GraphQLString
				},
				ostblareas: {
          type: new GraphQLList(oStblAreaType),
					resolve(parent, args) {
						return oStblArea.find({
							id: parent.id
						});
					}
				}
			})
		});

	const oStblAreaType = new GraphQLObjectType({
			name: 'oStblArea',
			fields: () => ({
        id: {
					type: GraphQLID
				},
				AreaShortName: {
					type: GraphQLString
				},
				AreaLongName: {
					type: GraphQLString
				},
				ocomptes: {
          type: new GraphQLList(OcompteType),
					resolve(parent, args) {
						return Ocompte.find({
							id: parent.id
						});
					}
				},
			})
		});
	const oTableauPosteType = new GraphQLObjectType({
			name: 'oTableauPoste',
			fields: () => ({
        id: {
					type: GraphQLID
				},
				ostableaupostes: {
          type: new GraphQLList(oStableauPosteType),
					resolve(parent, args) {
						return oStableauPoste.find({
							id: parent.id
						});
					}				},
				tableauLongName: {
					type: GraphQLString
				},
				TableauName: {
					type: GraphQLString
				},
			})
		});
	function toinit() {
		return {
			nstBalanceInputType: nstBalanceInputType,
			nstBalanceType: nstBalanceType,
			nttBalanceType: nttBalanceType,
			nttCompteBalanceDetailType: nttCompteBalanceDetailType,
			nttCompteBalanceType: nttCompteBalanceType,
			OcompteReferenceType: OcompteReferenceType,
			OcompteType: OcompteType,
			oExercComptaType: oExercComptaType,
			oExerciceType: oExerciceType,
			OlevelType: OlevelType,
			oReferenceType: oReferenceType,
			oReportDetailType: oReportDetailType,
			oReportHeaderType: oReportHeaderType,
			oStableauPosteType: oStableauPosteType,
			oStblAreaType: oStblAreaType,
			oTableauPosteType: oTableauPosteType,
			UserType: UserType
		}
	}
	return {
		toinit: toinit
	}
})()
module.exports = {
	toinit: objectSchemaTypes.toinit
}
 */