export interface Irate {
  rates: string;
  currency: number;
}

export class IOexccompta {

  id: string;
  oExercComptaId: string;
  DateDebut: Date;
  Datefin: Date;
  Cloture: Boolean;
}
