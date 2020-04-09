var validationData =
{

  validationExercCompta: {
    oExercComptaId: {
      required: 'Year is  required.',
        minlength: 'Intitule Compte name must be at least three characters.',
          maxlength: 'Intitule Compte name cannot exceed 50 characters.'
    },
    DateDebut: {
      required: 'Date debut annee  is required.'
    },
    Datefin: {
      required: 'Date debut annee  is required.'
    }
  },

  validationNsbalanceinput: {
    IntitulCompte: {
      required: 'Intitule Compte name is required.',
        minlength: 'Intitule Compte name must be at least three characters.',
          maxlength: 'Intitule Compte name cannot exceed 50 characters.'
    },
    NumCompte: {
      required: 'Compte Number is required.'

    }

  }

};
module.exports = validationData;
