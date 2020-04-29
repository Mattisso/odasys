
export class IOtableauposte {

  id: string;
  TableauName: string;
  tableauLongName: string;
  OexercComptaKey?: string;
 // ocomptes?: string[];

}


export class Otableauposte implements IOtableauposte {

  constructor(id: string, TableauName: string, tableauLongName: string, OexercComptaKey?: string
    // ocomptes: string[]
    ) {
    this.id = id;
    this.TableauName = TableauName;
    this.tableauLongName = tableauLongName;
    this.OexercComptaKey = OexercComptaKey;
    // this.ocomptes = ocomptes;
  }


  private _id: string;
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  TableauName: string;
  tableauLongName: string;
  OexercComptaKey: string;
 // OstblareaKey: string;
  // ocomptes: string;
}

