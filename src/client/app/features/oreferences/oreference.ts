
export class IOreference {

  id: string;
  RefCode: string;
  Description: string;
  fullDescription: string;
  OtableauposteKey?: string;
 // ocomptes?: string[];

}



export class Oreference  implements IOreference {

  constructor(id: string, RefCode: string, Description: string, fullDescription: string
    // ocomptes: string[]
    ) {
    this.id = id;
    this.RefCode = RefCode;
    this.Description = Description;
    this.fullDescription = fullDescription;
    // this.ocomptes = ocomptes;
  }


  private _id: string;
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  RefCode: string;
  Description: string;
  fullDescription: string;
 // OstblareaKey: string;
  // ocomptes: string;

}
