import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { IUser } from '../user';
import { MessageService } from '../../messages/message.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, delay, map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { JwtHelperService } from '@auth0/angular-jwt';

import {   HttpClient, HttpEvent, HttpEventType, HttpProgressEvent,
  HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
   // 'Authorization': 'my-auth-token'
    // 'Authorization', `Bearer ${this.auth.getToken()}`
  })
};
const API_URL = environment.apiUrl;
@Injectable()
export class AuthService {
  redirectUrl: string;
  private currentUserSubject: BehaviorSubject<IUser>;
 public  currentUser:  Observable<IUser>;
 isLoggedIn = false;
  isAdmin = false;
  // currentuser: IUser = this.initializeIUser();

  private handleError: HandleError;
   userUrl = `${API_URL}/api`;  // 'api/users';
  constructor(private messageService: MessageService,
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
    httpErrorHandler: HttpErrorHandler) {
 this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
       this.handleError = httpErrorHandler.createHandleError('UserService');
  }


/*   isLoggedIn(): boolean {
    return !!this.currentUser;
} */

getAuthorizationToken() {
  return 'token';
}

  public get currentUserValue(): IUser {
    return this.currentUserSubject.value;
}

  login(username: string, password: string) {
    const url = `${this.userUrl}/login`;
 /*      if (!username || !password) {
          this.messageService.addMessage('Please enter your username and password');
          return;
      } */
      return this.http.post<any>(url, { username: username, password: password })
      .pipe(
      map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;

         }),
         catchError(this.handleError<any>(`currentUser`))
         );
  }


  private getEventMessage(event: HttpEvent<any>, user: IUser) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `login user "${user.username}.`;

      case HttpEventType.Response:
        return `File "${user.username}" was logged in  successfully!`;

      default:
        return `File "${user.username}" surprising loging event: ${event.type}.`;
    }
  }

  logout(): void {
  // remove user from local storage to log user out
     localStorage.removeItem('currentUser');
     this.currentUserSubject.next(null);
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

}
