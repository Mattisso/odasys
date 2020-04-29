import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { MessageService } from '../../messages/message.service';
import { catchError, tap, map, shareReplay } from 'rxjs/operators';

import { IOtableauposte } from './otableauposte';
import { environment } from '../../../environments/environment';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
 //   'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OtableauposteService {

  apiUrl = environment.apiUrl;
  otableauposteUrl =  `${this.apiUrl}/api/otableaupostes`;
// otableauposteUrl = 'api/otableaupostes';
  private handleError: HandleError;
 //  Otableauposts: IOtableauposte[];
  editOtableauposte: IOtableauposte;
  otableauposteSelectedSubject = new BehaviorSubject<string>('0');
  otableauposteSelectedAction$ = this.otableauposteSelectedSubject.asObservable();

  constructor(private http: HttpClient,
    private messageService: MessageService,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('OtableauposteService');
  }
  getOtableaupostes$: Observable<IOtableauposte[]> = this.http.get<IOtableauposte[]>(this.otableauposteUrl)
      .pipe(
        tap(data => this.log(`getOtableauposts:   ${JSON.stringify(data)}`)),
        shareReplay(1),
        catchError(this.handleError)
      );

      ddlOtableaupostes$: Observable<IOtableauposte[]> = this.http.get<IOtableauposte[]>(`${this.otableauposteUrl}/v1/ddlotableauposteWithcomptebalances`)
      .pipe(
        tap(data => this.log(`getOtableauposts:   ${JSON.stringify(data)}`)),
        shareReplay(1),
        catchError(this.handleError)
      );

  getOtableaupostes(): Observable<IOtableauposte[]> {
    //  const url = `${this.OtableaupostUrl}`;
    return this.http.get<IOtableauposte[]>(this.otableauposteUrl)
      .pipe(
        tap(data => this.log(`getOtableauposts:   ${JSON.stringify(data)}`)),
        catchError(this.handleError('getOtableauposts', []))
      );
  }

  getOtableauposteNo404(id: string): Observable<IOtableauposte> {
    const url = `${this.otableauposteUrl}/?id=${id}`;
    return this.http.get<IOtableauposte[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          // this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<IOtableauposte>(`getHero id =${id}`))
      );
  }

  getOtableauposte(id: string): Observable<IOtableauposte> {
    if (id === '0') {
      return of(this.initializeIOtableauposte());
    }
    const url = `${this.otableauposteUrl}/${id}`;
    return this.http.get<IOtableauposte>(url).pipe(
      tap(data => this.log('getOtableaupost: ' + JSON.stringify(data))),
    catchError(this.handleError<IOtableauposte>(`getOtableaupost id =${id}`))
    );

  }

  /* GET heroes whose name contains search term */
  searchotableaupostes(term: string): Observable<IOtableauposte[]> {
    term = term.trim();
      const options = term ?
       { params: new HttpParams().set('otableauposteId', term) } : {};

    return this.http.get<IOtableauposte[]>(this.otableauposteUrl, options).pipe(

      tap(_ => this.log(`found Otableaupost matching "${term}"`)),
      catchError(this.handleError<IOtableauposte[]>('searchotableaupostes', []))
    );
  }

  deleteOtableauposte(otableauposte: IOtableauposte): Observable<IOtableauposte> {
    //  headers.append('Authorization', `Bearer ${this.auth.
    // const options = new RequestOptions({ headers: headers });
   const id = otableauposte.id;
   const url = `${this.otableauposteUrl}/${id}`;
    return this.http.delete<IOtableauposte>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted otableauposte id:  ${id}`)),
      catchError(this.handleError<IOtableauposte>(`deleteotableauposte`))
    );
  }

  createOtableauposte(otableauposte: IOtableauposte): Observable<IOtableauposte> {
    otableauposte.id = null;
    return this.http.post<IOtableauposte>(this.otableauposteUrl, otableauposte, httpOptions).pipe(
      //  map(this.extractData),
      tap(data => console.log('createOtableaupost: ' + JSON.stringify(data))),
      catchError(this.handleError<IOtableauposte>('createOtableaupost'))
    );

  }

   updateOtableauposte(otableauposte: IOtableauposte): Observable<IOtableauposte> {
    httpOptions.headers =
    httpOptions.headers.set('Authorization', 'my-new-auth-token');
    const url = `${this.otableauposteUrl}/${otableauposte.id}`;
    return this.http.put<IOtableauposte>(url, otableauposte, httpOptions).pipe(
        tap(() => console.log('updateOtableauposte: ' + JSON.stringify(otableauposte.id))),
         // Return the Otableaupost on an update
        map(() => otableauposte),
      catchError(this.handleError('updateOtableaupost', otableauposte))
    );
  }
  private log(message: string) {
    this.messageService.addMessage(`OtableaupostService: ${message}`);
  }

  initializeIOtableauposte(): IOtableauposte {
    // Return an initialized object
    return {
      id: '0',
      TableauName: null,
      tableauLongName: null
    };
  }
}
