

export interface IddlOtableauposteByYear {
 OtableauposteKey: string;
 OexercComptaKey: string;
 tableauLongName: string;
 TableauName: string;
}

export interface IddlOreferenceByear {
 OreferenceKey: string;
 OtableauposteKey: string;
 fullDescription: string;

}
export interface IddlOReferenceByoTableauPoste {
 OreferenceKey: string;
 OtableauposteKey: string;
 OexercComptaKey: string;
 fullDescription: string;

}
export interface IddlOExerComptable {
 OexercComptaKey: string;
 oExercComptaId: string;

}
