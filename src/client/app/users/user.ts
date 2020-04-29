/* Defines the user entity */
// import { IUser } from './interfaces';

// import { IUser} from './interfaces/index';
// import {User} from '../../../server/omodels/index';

export interface IUser  {
  id: string;
  username: string;
  role: string;
  password: string;
  confirmPassword?: string;
  token?: string;
/*   CreatedOn?: string;
  CreatedBy?: string;
  ModifiedOn?: string;
  ModifiedBy?: string;
  adduser: () => void;
  hasitem: (objdata: any) => boolean;
  removeItem: (objdata: any) => void;
  getData: () => {
    'username': any;
    'role': any; 'password': any;
    'DetailCount': any; '_arrusers': any;
  };*/
}



export class USer implements IUser {

  // private _user: IUser;
   id: string;
   username: string;
   password: string;
   confirmPassword: string;
   role: string;
   token?: string;
  constructor(id: string,
    username: string,
    password: string,
 confirmPassword: string,
    role: string) {
    this.id = id;
    this.username = username;
    this.role = role;
    this.password = password;
   this.confirmPassword = confirmPassword;


   /*  this.adduser = function () {
      this._arrusers.push({
        'id': this.id,
        'username': this.username,
        'role': this.role,
        'password': this.password

      });
      let DetailCount = 0;
      DetailCount = this._arrusers.length;
      return {
        DetailCount: DetailCount
      };


    };
    this.hasitem = function (objdata: any) {
      return this._arrusers.indexOf(objdata) !== -1;

    };
    this.removeItem = function (objdata: any) {
      const itemIndex = this._arrusers.indexOf(objdata);
      if (itemIndex !== -1) {
        this._arrusers.splice(itemIndex, 1);
      }

    };

    // var getData;
    this.getData = function () {
      return {
        'username': this.username,
        'role': this.role,
        'password': this.password,
        'DetailCount': this.DetailCount,
        '_arrusers': this._arrusers.slice()
      };
    }; */


  }

    get Id(): string {
      return this.id;
    }
    get userName(): string {
      return this.username;
    }

    get Role(): string {
      return this.role;
    }

    get Password(): string {
      return this.password;
    }

}



export interface UserResolved {
  iuser: IUser;
  error?: any;
}
