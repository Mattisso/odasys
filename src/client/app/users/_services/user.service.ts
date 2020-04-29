import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpEvent} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap} from 'rxjs/operators';

// import { ApiService } from '../../shared/api.service';
import { IUser } from '../user';
import { MessageService } from '../../messages/message.service';

import { environment } from '../../../environments/environment';

import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
   // 'Authorization': 'my-auth-token'
    // 'Authorization', `Bearer ${this.auth.getToken()}`
  }),
  response: 'json'
};

@Injectable()
export class UserService {

  private handleError: HandleError;
  apiUrl = environment.apiUrl;
  userUrl = `${this.apiUrl}/api`;
 // userUrl = 'api/users';

  constructor(  // private messageService: MessageService,
     private http: HttpClient,
     private messageService: MessageService,
     httpErrorHandler: HttpErrorHandler) {
      this.handleError = httpErrorHandler.createHandleError('UserService');

     }

  getUsers(): Observable<IUser[]> {
const url = `${this.userUrl}/users`;
    return this.http.get<IUser[]>(url).pipe(
      // .map(this.extractData)
    tap(data => console.log('getUsers: ' + JSON.stringify(data))),
      catchError(this.handleError('getUsers', [])));
     // .catch(this.handleError);
  }

  getUserNo404<Data>(id: string): Observable<IUser> {
    const url = `${this.userUrl}/users/?id=${id}`;
    return this.http.get<IUser[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          //     this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<IUser>(`getHero id =${id}`))
      );
  }

  login(credentials: any): Observable<any> {
   // const headers = new Headers({ 'Content-Type': 'application/json' });
   // const options = new RequestOptions({ headers: headers });

   const url = `${this. userUrl}/login`;
    return this.http.post(url, credentials, httpOptions).pipe(
        //   .map(this.extractData)
     tap(data => console.log('getUser: ' + JSON.stringify(data))),
        catchError(this.handleError<IUser>(`getUser`))
        //   .catch(this.handleError);

    );

  }

  countUsers():  Observable<number> {

    const url = `${this. userUrl}/users/count`;
    return this.http.get<number>(url).pipe(
  // .map(this.extractData)
 tap(data => this.log('getUser: ' + JSON.stringify(data))),
 catchError(this.handleError<number>(`count`)));

  }

  getUserByName(user: IUser): Observable<IUser> {
    /* if (user.username === '0') {
      return of(this.initializeIUser());
    } */
    const url = `${this.userUrl}/v2/users/${user.username}`;
    return this.http.get<IUser>(url).pipe(
       // .map(this.extractData)
    tap(data => this.log('getUser: ' + JSON.stringify(data)),
       catchError(this.handleError<IUser>(`getUser username =${user.username}`)))
    );

  }


  getUser(id: string): Observable<IUser> {
    if (id === '0') {
      return of(this.initializeIUser());
    }
    const url = `${this.userUrl}/users/${id}`;
    return this.http.get<IUser>(url).pipe(
       // .map(this.extractData)
    tap(data => this.log('getUser: ' + JSON.stringify(data)),
       catchError(this.handleError<IUser>(`getUser id =${id}`)))
    );

  }
  deleteUser( user: IUser): Observable<{}> {
    //  const headers = new Headers({ 'Content-Type': 'application/json' });
   //   const options = new RequestOptions({ headers: headers });

      const url = `${this.userUrl}/users/${user.id}`;
      return this.http.delete<IUser>(url, httpOptions).pipe(
      tap(() => this.log(`deleteUser: ${user.id}`)),
        catchError(this.handleError<IUser>(`deleteUser`))
      );

    }
/*
   saveUser(user: IUser): Observable<IUser> {
  //  const headers = new Headers({ 'Content-Type': 'application/json' });
  //  const options = new RequestOptions({ headers: headers });

    if (user.id === '0') {
      return this.createUser(user);
    }
    return this.updateUser(user);
  }
*/
   createUser(user: IUser): Observable<IUser> {
    user.id = null;
    const url = `${this.userUrl}/register`;
    return this.http.post<IUser>(url, user, httpOptions).pipe(
       //     .map(this.extractData)
    tap(data => this.log('createUser: ' + JSON.stringify(data))),
    map(data => data),
       catchError(this.handleError<IUser>('createUser'))
      );

  }

   updateUser(user: IUser): Observable<IUser> {
    httpOptions.headers =
    httpOptions.headers.set('Authorization', 'my-new-auth-token');
    const url = `${this.userUrl}/users/${user.id}`;
    return this.http.put<IUser>(url, user, httpOptions).pipe(
      tap(() => this.log('updateUser: ' + JSON.stringify(user.id))),
      map(() => user),
      catchError(this.handleError('updateBalanceInput', user))

    );

  }
/*
  private handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json() || 'Server error');
  }*/

  private log(message: string) {
    this.messageService.addMessage(`HeroService: ${message}`);
  }

  initializeIUser(): IUser {
    // Return an initialized object
    return {
      id: '0',
      username: null,
      role: null,
      password: null,
   confirmPassword: null,
      token: null
    };
  }

  private getEventMessage(event: HttpEvent<any> , credentials: IUser) {
    switch (event.type) {

      case HttpEventType.ResponseHeader:
        // Compute and show the % done:
        return `User "${credentials.username}" is % uploaded.`;

      case HttpEventType.Response:
        return `User "${credentials.username}" was completely uploaded!`;

      default:
        return `User "${credentials.username}" surprising upload event: ${event.type}.`;
    }
  }
  /*
  private extractData(response: Response) {
    const body = response.json();
    return body.data || {};
  }*/
}
