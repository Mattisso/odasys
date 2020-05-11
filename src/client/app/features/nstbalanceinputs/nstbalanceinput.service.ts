import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, of, combineLatest, BehaviorSubject, Subject, merge } from 'rxjs';import { MessageService } from '../../messages/message.service';
import { catchError, tap, map, retry, shareReplay } from 'rxjs/operators';

import { INstbalanceinput } from './nstbalanceinput';
import { environment } from '../../../environments/environment';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
 //   'Authorization': 'my-auth-token'
  })
};


@Injectable()
export class NstbalanceinputService {
  apiUrl = environment.apiUrl;
  nstbalanceinputUrl =  `${this.apiUrl}/api/nstbalanceinputs`;
// nstbalanceinputUrl = 'api/nstbalanceinputs';
  private handleError: HandleError;
  balances: INstbalanceinput[];
  editbalanceinput: INstbalanceinput;

  constructor(private http: HttpClient,
    private messageService: MessageService,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('NstbalanceinputService');
  }

  getBalancesInput$= this.http.get<INstbalanceinput[]>(this.nstbalanceinputUrl)
      .pipe(
        tap(data => this.log(`getBalances:   ${JSON.stringify(data)}`)),
        catchError(this.handleError));

     private nstbalanceinputSelectedSubject = new BehaviorSubject<string>('0');
     nttbalanceinputSelectedAction$ = this.nstbalanceinputSelectedSubject.asObservable();

  getBalanceCompte (balance: INstbalanceinput): Observable<INstbalanceinput> {
    if (balance.NumCompte === undefined) {
      return of(this.initializeINstbalanceinput());
    }
    const url = `${this.nstbalanceinputUrl}/v2/${balance.NumCompte}`;
    return this.http.get<INstbalanceinput>(url).pipe(
      tap(data => this.log('getBalance: ' + JSON.stringify(data))),
    catchError(this.handleError<INstbalanceinput>(`getBalance id =${balance.NumCompte}`))
    );

  }
  selectedNstbalanceinputChanged(selectedNstbalanceinputId: string): void {
    this.nstbalanceinputSelectedSubject.next(selectedNstbalanceinputId);
  }

  selectednstbalanceinput$= combineLatest([
    this.getBalancesInput$,
    this.nttbalanceinputSelectedAction$
  ]).pipe(map(([nstbalanceinputs,selectednstbalanceinputkey])=>
  nstbalanceinputs.find(nstbalanceinput=>nstbalanceinput.id===selectednstbalanceinputkey)),tap(
    nstbalanceinput=>this.log(`selectednstbalanceinput,${JSON.stringify(nstbalanceinput)}`)
  ),shareReplay(1));

  getBalanceNo404<Data>(id: string): Observable<INstbalanceinput> {
    const url = `${this.nstbalanceinputUrl}/?id=${id}`;
    return this.http.get<INstbalanceinput[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          //     this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<INstbalanceinput>(`getHero id =${id}`))
      );
  }


  getBalance(id: string): Observable<INstbalanceinput> {
    if (id === '0') {
      return of(this.initializeINstbalanceinput());
    }
    const url = `${this.nstbalanceinputUrl}/${id}`;
    return this.http.get<INstbalanceinput>(url).pipe(
      tap(data => this.log('getBalance: ' + JSON.stringify(data))),
    catchError(this.handleError<INstbalanceinput>(`getBalance id =${id}`))
    );

  }

  /* GET heroes whose name contains search term */
  searchBalanceinputs(term: string): Observable<INstbalanceinput[]> {
    term = term.trim();
      const options = term ?
       { params: new HttpParams().set('IntitulCompte', term) } : {};

    return this.http.get<INstbalanceinput[]>(this.nstbalanceinputUrl, options).pipe(

      tap(_ => this.log(`found nstbalanceinput matching "${term}"`)),
      catchError(this.handleError<INstbalanceinput[]>('searchBalanceinputs', []))
    );
  }

  deleteBalance(id: string): Observable<INstbalanceinput> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //  headers.append('Authorization', `Bearer ${this.auth.
    // const options = new RequestOptions({ headers: headers });
   // const id = typeof balance === 'string' ? balance : balance.id;

    const url = `${this.nstbalanceinputUrl}/${id}`;
    return this.http.delete<INstbalanceinput>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted BalanceInput id:  ${id}`)),
      catchError(this.handleError<INstbalanceinput>(`deleteBalance`))

    );

  }


  getBalanceUrl() {
    return this.http.get<INstbalanceinput>(this.nstbalanceinputUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError)
      );
  }

  getBalanceResponse(): Observable<HttpResponse<INstbalanceinput>> {
    return this.http.get<INstbalanceinput>(
      this.nstbalanceinputUrl, { observe: 'response' });
  }


  private getEventMessage(event: HttpEvent<any>, balance: INstbalanceinput) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Compte Intitule "${balance.IntitulCompte}.`;

      case HttpEventType.Response:
        return `Compte Description "${balance.IntitulCompte}" was logged in  successfully!`;

      default:
        return `Compte Description "${balance.IntitulCompte}" surprising loging event: ${event.type}.`;
    }
  }


/*
  saveBalance(balance: INstbalanceinput): Observable<INstbalanceinput> {
    const headers = new Headers({ 'Content-Type': 'application/json' });

    if (balance.id === undefined) {
      return this.createBalance(balance);
    } else {
      return this.updateBalance(balance);
    }

  } */

   createBalance(balance: INstbalanceinput): Observable<INstbalanceinput> {
    balance.id = null;
    return this.http.post<INstbalanceinput>(this.nstbalanceinputUrl, balance, httpOptions).pipe(
      //  map(this.extractData),
      tap(data => console.log('createBalance: ' + JSON.stringify(data))),
      catchError(this.handleError<INstbalanceinput>('createbalance'))
    );

  }

   updateBalance(balance: INstbalanceinput): Observable<INstbalanceinput> {
    httpOptions.headers =
    httpOptions.headers.set('Authorization', 'my-new-auth-token');
    const url = `${this.nstbalanceinputUrl}/${balance.id}`;
    return this.http.put<INstbalanceinput>(url, balance, httpOptions).pipe(
        tap(() => console.log('updateBalance: ' + JSON.stringify(balance.id))),
         // Return the balance on an update
        map(() => balance),
      catchError(this.handleError('updateBalanceInput', balance))

    );

  }
  private log(message: string) {
    this.messageService.addMessage(`NstbalanceinputService: ${message}`);
  }

  initializeINstbalanceinput(): INstbalanceinput {
    // Return an initialized object
    return {
      id: '0',
      NumCompte: null,
      IntitulCompte: null,
      SoldeDebit: null,
      SoldeCredit: null,
      addbalanceinput: null,
      hasitem: null,
      removeItem: null,
      getData:  null,
      CreatedOn: null,
      CreatedBy: null,
      ModifiedOn: null,
      ModifiedBy: null
    };
  }

}
