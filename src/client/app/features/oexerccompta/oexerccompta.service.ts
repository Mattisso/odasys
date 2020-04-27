import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { MessageService } from '../../messages/message.service';
import { catchError, tap, map, shareReplay, mergeAll, pluck, distinct, toArray } from 'rxjs/operators';

import { IOexerccompta,Response} from './oexerccompta';
import { environment } from '../../../environments/environment';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
 //   'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class OexerccomptaService {

  apiUrl = environment.apiUrl;
  oexercComptaUrl =  `${this.apiUrl}/api/oexerccomptas`;
// oexercComptaUrl = 'api/oexerccomptas';
  private handleError: HandleError;
  ExercComptas: IOexerccompta[];
  editExercCompta: IOexerccompta;
  oexcercompteSelectedSubject = new BehaviorSubject<string>('0');
  oexcercompteSelectedAction$ = this.oexcercompteSelectedSubject.asObservable();

  constructor(private http: HttpClient,
        private messageService: MessageService,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('OexccomptaService');
  }

/*
   Query<Response>= (
    document=gql`
query getoexerccomptas {
  oExercComptaId
  Cloture
}
    `
  ) */
  // All getOexccomptas
  getoexerccompta$: Observable<IOexerccompta[]> =  this.http.get<IOexerccompta[]>(this.oexercComptaUrl)
    .pipe(
      tap(data => console.log('exercComptas', JSON.stringify(data))),
      shareReplay(1),
      catchError(this.handleError)
      );

        // Categories for drop down list
  // Example of using pluck and distinct
  getoexerccomptaYear$ = this.getoexerccompta$
  .pipe(
    mergeAll(),
    pluck('oExercComptaId'),
    distinct(),
    toArray(),
    tap(c => this.log(`exercComptas: ${JSON.stringify(c)}`)),
    shareReplay(1)
  );

  getOexccomptas(): Observable<IOexerccompta[]> {
    //  const url = `${this.ExercComptaUrl}`;
    return this.http.get<IOexerccompta[]>(this.oexercComptaUrl)
      .pipe(
        tap(data => this.log(`getOexccomptas:   ${JSON.stringify(data)}`)),
        catchError(this.handleError<any>('getOexccomptas', []))
      );
  }

  getExercComptaNo404(id: string): Observable<IOexerccompta> {
    const url = `${this.oexercComptaUrl}/?id=${id}`;
    return this.http.get<IOexerccompta[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          //     this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<IOexerccompta>(`getHero id =${id}`))
      );
  }


  getOexccompta(id: string): Observable<IOexerccompta> {
    if (id === '0') {
      return of(this.initializeINstExercCompta());
    }
    const url = `${this.oexercComptaUrl}/${id}`;
    return this.http.get<IOexerccompta>(url).pipe(
      tap(data => this.log('getOexccompta: ' + JSON.stringify(data))),
    catchError(this.handleError<IOexerccompta>(`getOexccompta id =${id}`))
    );

  }


  getOexccomptaByYear(oexccompta: IOexerccompta): Observable<IOexerccompta> {
    const url = `${this.oexercComptaUrl}/v2/${oexccompta.oExercComptaId}`;
    return this.http.get<IOexerccompta>(url).pipe(
      tap(data => this.log('getOexccompta: ' + JSON.stringify(data))),
    catchError(this.handleError<IOexerccompta>(`getOexccompta id =${oexccompta.oExercComptaId}`))
    );

  }


  /* GET heroes whose name contains search term */
  searchoExercComptas(term: string): Observable<IOexerccompta[]> {
    term = term.trim();
      const options = term ?
       { params: new HttpParams().set('oExercComptaId', term) } : {};

    return this.http.get<IOexerccompta[]>(this.oexercComptaUrl, options).pipe(

      tap(_ => this.log(`found oexccompta matching "${term}"`)),
      catchError(this.handleError<IOexerccompta[]>('searchoExercComptas', []))
    );
  }

  deleteExercCompta(exerccompta: IOexerccompta): Observable<IOexerccompta> {
    //  headers.append('Authorization', `Bearer ${this.auth.
    // const options = new RequestOptions({ headers: headers });
   const id = exerccompta.id;
   const url = `${this.oexercComptaUrl}/${id}`;
    return this.http.delete<IOexerccompta>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted exerccompta id:  ${id}`)),
      catchError(this.handleError<IOexerccompta>(`deleteExercCompta`))
    );
  }

  createExercCompta(exerccompta: IOexerccompta): Observable<IOexerccompta> {
    exerccompta.id = null;
    return this.http.post<IOexerccompta>(this.oexercComptaUrl, exerccompta, httpOptions).pipe(
      //  map(this.extractData),
      tap(data => console.log('createExercCompta: ' + JSON.stringify(data))),
      catchError(this.handleError<IOexerccompta>('createExercCompta'))
    );

  }

   updateExercCompta(exerccompta: IOexerccompta): Observable<IOexerccompta> {
    httpOptions.headers =
    httpOptions.headers.set('Authorization', 'my-new-auth-token');
    const url = `${this.oexercComptaUrl}/${exerccompta.id}`;
    return this.http.put<IOexerccompta>(url, exerccompta, httpOptions).pipe(
        tap(() => console.log('updateExercCompta: ' + JSON.stringify(exerccompta.id))),
         // Return the ExercCompta on an update
        map(() => exerccompta),
      catchError(this.handleError('updateExercCompta', exerccompta))

    );

  }
  private log(message: string) {
    this.messageService.addMessage(`OexccomptaService: ${message}`);
  }

  initializeINstExercCompta(): IOexerccompta {
    // Return an initialized object
    return {
      id: '0',
      oExercComptaId: null,
      DateDebut: null,
      Datefin: null,
      Cloture: true
    };
  }
}
