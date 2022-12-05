import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, of, BehaviorSubject, combineLatest} from 'rxjs';
import { MessageService } from '../../messages/message.service';
import { catchError, tap, map, shareReplay, mergeAll, pluck, distinct, toArray} from 'rxjs/operators';

import { IOreference } from './oreference';
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
export class OreferenceService {

  apiUrl = environment.apiUrl;
  oreferenceUrl =  `${this.apiUrl}/api/oreferences`;
// oreferenceUrl = 'api/oreferences';
  private handleError: HandleError;
 //  Oreferences: IOexccompta[];
  editOreference: IOreference;
    // Action stream
   // oreferenceSelectedSubject = new BehaviorSubject<string>('0');
   // oreferenceSelectedAction$ = this.oreferenceSelectedSubject.asObservable();

  constructor(private http: HttpClient,
    private messageService: MessageService,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('OreferenceService');
  }

  getOreferences$: Observable<IOreference[]> = this.http.get<IOreference[]>(this.oreferenceUrl)
      .pipe(
        tap(data => this.log(`getOreferences:   ${JSON.stringify(data)}`)),
        shareReplay(1),
       catchError(this.handleError)
      );

      ddlOreferences$: Observable<IOreference[]> = this.http.get<IOreference[]>(`${this.oreferenceUrl}/v2/ddlreferencebyotableauposteVM`)
      .pipe(
        tap(data => this.log(`getOreferences:   ${JSON.stringify(data)}`)),
        shareReplay(1),
       catchError(this.handleError)
      );
      getOreferencesRefCode$ = this.getOreferences$
      .pipe(
        mergeAll(),
        pluck('RefCode'),
        distinct(),
        toArray(),
        tap(c => this.log(`oreference: ${JSON.stringify(c)}`)),
        shareReplay()
      );

       oreferenceSelectedSubject= new BehaviorSubject<string>('0');
      oreferenceSelectedAction$= this.oreferenceSelectedSubject.asObservable();

      selectedOreferenceChanged(selectedoreferenceID:string):void{
        this.oreferenceSelectedSubject.next(selectedoreferenceID);
      }

      selectedoreference$=combineLatest([
        this.getOreferences$,
        this.oreferenceSelectedAction$
      ]).pipe(map(([oreferences, selectedoreferenceKey])=>
      oreferences.find(oreference=>oreference.id===selectedoreferenceKey)),tap(
        oreference=>this.log(`selectedoreference,${JSON.stringify(oreference)}`)
      ),shareReplay(1));

  getOreferences(): Observable<IOreference[]> {
    //  const url = `${this.OreferenceUrl}`;
    return this.http.get<IOreference[]>(this.oreferenceUrl)
      .pipe(
        tap(data => this.log(`getOreferences:   ${JSON.stringify(data)}`)),
        catchError(this.handleError('getOreferences', []))
      );

  }

  getOreferenceNo404(id: string): Observable<IOreference> {
    const url = `${this.oreferenceUrl}/?id=${id}`;
    return this.http.get<IOreference[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          //     this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<IOreference>(`getHero id =${id}`))
      );
  }


  getOreference(id: string): Observable<IOreference> {
    if (id === '0') {
      return of(this.initializeIOreference());
    }
    const url = `${this.oreferenceUrl}/${id}`;
    return this.http.get<IOreference>(url).pipe(
      tap(data => this.log('getOreference: ' + JSON.stringify(data))),
    catchError(this.handleError<IOreference>(`getOreference id =${id}`))
    );

  }

  /* GET heroes whose name contains search term */
  searchoreferences(term: string): Observable<IOreference[]> {
    term = term.trim();
      const options = term ?
       { params: new HttpParams().set('oreferenceId', term) } : {};

    return this.http.get<IOreference[]>(this.oreferenceUrl, options).pipe(

      tap(_ => this.log(`found Oreference matching "${term}"`)),
      catchError(this.handleError<IOreference[]>('searchoreferences', []))
    );
  }

  deleteOreference(oreference: IOreference): Observable<IOreference> {
    //  headers.append('Authorization', `Bearer ${this.auth.
    // const options = new RequestOptions({ headers: headers });
   const id = oreference.id;
   const url = `${this.oreferenceUrl}/${id}`;
    return this.http.delete<IOreference>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted oreference id:  ${id}`)),
      catchError(this.handleError<IOreference>(`deleteoreference`))
    );
  }

  createOreference(oreference: IOreference): Observable<IOreference> {
    oreference.id = null;
    return this.http.post<IOreference>(this.oreferenceUrl, oreference, httpOptions).pipe(
      //  map(this.extractData),
      tap(data => console.log('createOreference: ' + JSON.stringify(data))),
      catchError(this.handleError<IOreference>('createOreference'))
    );

  }

   updateOreference(oreference: IOreference): Observable<IOreference> {
    httpOptions.headers =
    httpOptions.headers.set('Authorization', 'my-new-auth-token');
    const url = `${this.oreferenceUrl}/${oreference.id}`;
    return this.http.put<IOreference>(url, oreference, httpOptions).pipe(
        tap(() => console.log('updateOreference: ' + JSON.stringify(oreference.id))),
         // Return the Oreference on an update
        map(() => oreference),
      catchError(this.handleError('updateOreference', oreference))

    );

  }
  private log(message: string) {
    this.messageService.addMessage(`OreferenceService: ${message}`);
  }

  initializeIOreference(): IOreference {
    // Return an initialized object
    return {
      id: '0',
      RefCode: null,
      Description: null,
      fullDescription: null
    };
  }
}
