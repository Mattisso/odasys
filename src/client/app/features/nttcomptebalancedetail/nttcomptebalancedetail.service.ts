import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from '../../messages/message.service';
import { catchError, tap, map, retry, shareReplay, concatMap, mergeMap, switchMap } from 'rxjs/operators';
import { INttcomptebalancedetail } from './nttcomptebalancedetail';
import { environment } from '../../../environments/environment';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { Oexccompta } from '../oexerccomptas/oexccompta';
import { OexccomptaService } from '../oexerccomptas/oexccompta.service';
import { Oreference } from '../oreferences/oreference';
import { OreferenceService } from '../oreferences/oreference.service';
import { Otableauposte } from '../otableaupostes/otableauposte';
import { OtableauposteService } from '../otableaupostes/otableauposte.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    //   'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class NttcomptebalancedetailService {
  apiUrl = environment.apiUrl;
  nttcomptebalancedetailUrl = `${this.apiUrl}/api/nttcomptebalancedetails`;
  private handleError: HandleError;
  balancedetails: INttcomptebalancedetail[];
  editbalance: INttcomptebalancedetail;
  balanceDetails$: Observable<INttcomptebalancedetail[]>;

  constructor(private http: HttpClient,
    private messageService: MessageService,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('NttcomptebalancedetailService');
  }

  getcompteDetails$: Observable<INttcomptebalancedetail[]> = this.http.get<INttcomptebalancedetail[]>(this.nttcomptebalancedetailUrl)
      .pipe(
        tap(data => this.log(`getcompteDetails:   ${JSON.stringify(data)}`)),
        shareReplay(1),
        catchError(this.handleError));
        getcompteDetailsWithMap$ = of(this.balanceDetails$)
        .pipe(
          map(id => this.http.get<INttcomptebalancedetail>(`${this.nttcomptebalancedetailUrl}/${id}`)
          )
        );
        getcompteDetailsWithConcatMap$ = of(this.balanceDetails$)
        .pipe(
          tap(id => console.log('concatMap source Observable', id)),
          concatMap(id => this.http.get<INttcomptebalancedetail>(`${this.nttcomptebalancedetailUrl}/${id}`))
        );

        getcompteDetailsWithMergeMap$ = of(this.balanceDetails$)
        .pipe(
          tap(id => console.log('mergeMap source Observable', id)),
          mergeMap(id => this.http.get<INttcomptebalancedetail>(`${this.nttcomptebalancedetailUrl}/${id}`))
        );

      getcompteDetailsWithSwitchMap$ = of(this.balanceDetails$)
        .pipe(
          tap(id => console.log('switchMap source Observable', id)),
          switchMap(id => this.http.get<INttcomptebalancedetail>(`${this.nttcomptebalancedetailUrl}/${id}`))
        );

  getcompteDetails(): Observable<INttcomptebalancedetail[]> {
    //  const url = `${this.balanceUrl}`;
    return this.http.get<INttcomptebalancedetail[]>(this.nttcomptebalancedetailUrl)
      .pipe(
        tap(data => this.log(`getcompteDetails:   ${JSON.stringify(data)}`)),
        catchError(this.handleError('getcompteDetails', [])));
  }

  getConfigResponse(): Observable<HttpResponse<INttcomptebalancedetail>> {
    return this.http.get<INttcomptebalancedetail>(
      this.nttcomptebalancedetailUrl, { observe: 'response' });
  }

  getcompteDetailNo404<Data>(id: string): Observable<INttcomptebalancedetail> {
    const url = `${this.nttcomptebalancedetailUrl}/?id=${id}`;
    return this.http.get<INttcomptebalancedetail[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          //     this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<INttcomptebalancedetail>(`getHero id =${id}`)));
  }

  getcompteDetail(id: string): Observable<INttcomptebalancedetail | undefined> {
    return this.getcompteDetails()
      .pipe(
        map((balancedetails: INttcomptebalancedetail[]) => balancedetails.find(b => b.id === id)));
  }

  /* GET heroes whose name contains search term */
  searchBalancedetails(term: string): Observable<INttcomptebalancedetail[]> {
    term = term.trim();
    const options = term ? {
      params: new HttpParams().set('IntitulCompte', term)
    }
      : {};

    return this.http.get<INttcomptebalancedetail[]>(this.nttcomptebalancedetailUrl, options).pipe(

      tap(_ => this.log(`found nstbalance matching "${term}"`)),
      catchError(this.handleError<INttcomptebalancedetail[]>('searchBalancedetails', [])));
  }

  deleteBalancedetail(id: string): Observable<INttcomptebalancedetail> {
  /*   const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    }); */
    //  headers.append('Authorization', `Bearer ${this.auth.
    // const options = new RequestOptions({ headers: headers });
    // const id = typeof Balancedetail === 'string' ? Balancedetail : Balancedetail.id;

    const url = `${this.nttcomptebalancedetailUrl}/${id}`;
    return this.http.delete<INttcomptebalancedetail>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Balancedetail id:  ${id}`)),
      catchError(this.handleError<INttcomptebalancedetail>(`deleteBalancedetails`)));

  }

  createBalancedetail(Balancedetail: INttcomptebalancedetail): Observable<INttcomptebalancedetail> {
    Balancedetail.id = null;
    return this.http.post<INttcomptebalancedetail>(this.nttcomptebalancedetailUrl, Balancedetail, httpOptions).pipe(
      //  map(this.extractData),
      tap(data => console.log('createBalancedetail: ' + JSON.stringify(data))),
      catchError(this.handleError<INttcomptebalancedetail>('createbalancedetail')));
  }

  updateBalancedetail(Balancedetail: INttcomptebalancedetail): Observable<INttcomptebalancedetail> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
    const url = `${this.nttcomptebalancedetailUrl}/${Balancedetail.id}`;
    return this.http.put<INttcomptebalancedetail>(url, Balancedetail, httpOptions).pipe(
      tap(() => console.log('updateBalancedetail: ' + JSON.stringify(Balancedetail.id))),
      // Return the Balancedetail on an update
      map(() => Balancedetail),
      catchError(this.handleError('updateBalancedetail', Balancedetail)));
  }

  getDetailBalanceUrl() {
    return this.http.get<INttcomptebalancedetail>(this.nttcomptebalancedetailUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError)
      );
  }

  getBalanceDetailResponse(): Observable<HttpResponse<INttcomptebalancedetail>> {
    return this.http.get<INttcomptebalancedetail>(
      this.nttcomptebalancedetailUrl, { observe: 'response' });
  }


  private log(message: string) {
    this.messageService.addMessage(`NttcomptebalancedetailService: ${message}`);
  }

  initializeINttcomptebalancedetail(): INttcomptebalancedetail {
    // Return an initialized object
    return {
      id: '0',
      nttcomptebalanceKey: null,
      NumCompte: null,
      IntitulCompte: null,
      SoldeDebit: null,
      SoldeCredit: null

    };
  }
}
