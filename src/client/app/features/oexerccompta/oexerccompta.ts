
export class IOexerccompta {

  id: string;
  oExercComptaId: string;
  DateDebut: Date;
  Datefin: Date;
  Cloture: Boolean;

}

export class Oexerccompta implements IOexerccompta{
  id: string;
  oExercComptaId: string;
  DateDebut: Date;
  Datefin: Date;
  Cloture: Boolean;

  constructor( id: string, oExercComptaId: string,   DateDebut: Date, Datefin: Date, Cloture?: Boolean) {
    this.id = id;
    this.oExercComptaId = oExercComptaId;
    this.DateDebut = DateDebut;
    this.Datefin = Datefin;
    this.Cloture = Cloture;
    }

}



export interface Response {
  oxerccomptas: IOexerccompta[];
}
