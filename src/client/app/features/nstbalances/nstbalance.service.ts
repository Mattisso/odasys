import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, of, combineLatest, BehaviorSubject, Subject, merge } from 'rxjs';
import { MessageService } from '../../messages/message.service';
import { catchError, tap, map, filter, shareReplay, mergeMap, reduce, concatMap, scan } from 'rxjs/operators';
import { INstbalance } from './nstbalance';
import { environment } from '../../../environments/environment';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { OexerccomptaService } from '../oexerccompta/oexerccompta.service';
import { Oreference } from '../oreferences/oreference';
import { OreferenceService } from '../oreferences/oreference.service';
import { IOtableauposte } from '../otableaupostes/otableauposte';
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
export class NstbalanceService {
  apiUrl = environment.apiUrl;
  nstbalanceUrl = `${this.apiUrl}/api/nstbalances`;
  private oexercComptaUrl = this.oexccomptaservice.oexercComptaUrl;
  private oreferenceUrl = this.oreferenceservice.oreferenceUrl;
  private otableauposteUrl = this.otableauposteservice.otableauposteUrl;
  // nstbalanceUrl = 'api/nstbalances';
  private handleError: HandleError;
  balances: INstbalance[];
  editbalance: INstbalance;
  private nstbalanceSelectedSubject = new BehaviorSubject<string | null>(null);
  nstbalanceSelectedAction$ = this.nstbalanceSelectedSubject.asObservable();

  constructor(private http: HttpClient,
    private messageService: MessageService,
    httpErrorHandler: HttpErrorHandler,
    private oexccomptaservice: OexerccomptaService,
    private oreferenceservice: OreferenceService,
    private otableauposteservice: OtableauposteService,
  ) {
    this.handleError = httpErrorHandler.createHandleError('NstbalanceService');
  }

  getnstbalances$ = this.http.get<INstbalance[]>(this.nstbalanceUrl)
    .pipe(
      tap(data => this.log(`getnstbalances:   ${JSON.stringify(data)}`)),
      catchError(this.handleError));

  private nstbalanceInsertedSubject = new Subject<INstbalance>();

  nstbalanceInsertedAction$ = this.nstbalanceInsertedSubject.asObservable();

  nstbalanceWithAdd$ = merge(
    this.getnstbalances$,
    // this.nstbalanceWithOthers$,
    this.nstbalanceInsertedAction$
      .pipe(
        concatMap(newNstbalance => {
          newNstbalance.id = null;
          return this.http.post<INstbalance>(this.nstbalanceUrl, newNstbalance, httpOptions)
            .pipe(
              tap(nstbalance => console.log('Created nstbalance', JSON.stringify(nstbalance))),
              catchError(this.handleError)
            );
        }),
      ))
    .pipe(
      scan((acc: INstbalance[], value: INstbalance) => [...acc, value]),
      shareReplay(1)
    );

  selectednstbalance$ = combineLatest([
    this.nstbalanceWithAdd$,
    //    this.nstbalanceWithOthers$,
    this.nstbalanceSelectedAction$
  ]).pipe(
    map(([nstbalances, selectednstbalanceKey]) =>
      nstbalances.find(nstbalance => nstbalance.id === selectednstbalanceKey)
    ),
    tap(nstbalance => this.log(`selectedComptebalance , ${JSON.stringify(nstbalance)}`)),
    shareReplay(1)
  );

  // Totals the prices for all items
  totalSoldDebit$ = this.getnstbalances$ // this.nstbalanceWithOthers$
    .pipe(
      mergeMap(item => item),
      reduce<INstbalance, number>((acc, item) => acc + item.SoldeDebit, 0),
      catchError(this.handleError)
    );

  // Totals the prices for all items
  totalSoldeCredit$ = this.getnstbalances$ // this.nstbalanceWithOthers$
    .pipe(
      mergeMap(item => item),
      reduce<INstbalance, number>((acc, item) => acc + item.SoldeCredit, 0),
      catchError(this.handleError)
    );

  selectedNstbalanceChanged(selectedNstbalanceId: string): void {
    this.nstbalanceSelectedSubject.next(selectedNstbalanceId);
  }


  getBalances(): Observable<INstbalance[]> {
    //  const url = `${this.balanceUrl}`;
    return this.http.get<INstbalance[]>(this.nstbalanceUrl)
      .pipe(
        tap(data => this.log(`getBalances:   ${JSON.stringify(data)}`)),
        catchError(this.handleError('getBalances', []))
      );

  }

  getBalanceNo404<Data>(id: string): Observable<INstbalance> {
    const url = `${this.nstbalanceUrl}/?id=${id}`;
    return this.http.get<INstbalance[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          //     this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<INstbalance>(`getHero id =${id}`))
      );
  }


  getBalance(id: string): Observable<INstbalance | undefined> {
    return this.getBalances()
      .pipe(
        map((balances: INstbalance[]) => balances.find(b => b.id === id))
      );
  }

  /* GET heroes whose name contains search term */
  searchBalances(term: string): Observable<INstbalance[]> {
    term = term.trim();
    const options = term ?
      { params: new HttpParams().set('IntitulCompte', term) } : {};

    return this.http.get<INstbalance[]>(this.nstbalanceUrl, options).pipe(

      tap(_ => this.log(`found nstbalance matching "${term}"`)),
      catchError(this.handleError<INstbalance[]>('searchBalances', []))
    );
  }

  deleteBalance(id: string): Observable<INstbalance> {
    const url = `${this.nstbalanceUrl}/${id}`;
    return this.http.delete<INstbalance>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Balance id:  ${id}`)),
      catchError(this.handleError<INstbalance>(`deleteBalance`))
    );
  }
  createBalance(balance: INstbalance): Observable<INstbalance> {
    balance.id = null;
    return this.http.post<INstbalance>(this.nstbalanceUrl, balance, httpOptions).pipe(
      //  map(this.extractData),
      tap(data => console.log('createBalance: ' + JSON.stringify(data))),
      catchError(this.handleError<INstbalance>('createbalance'))
    );

  }

  updateBalance(balance: INstbalance): Observable<INstbalance> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
    const url = `${this.nstbalanceUrl}/${balance.id}`;
    return this.http.put<INstbalance>(url, balance, httpOptions).pipe(
      tap(() => console.log('updateBalance: ' + JSON.stringify(balance.id))),
      // Return the balance on an update
      map(() => balance),
      catchError(this.handleError('updateBalance', balance))

    );

  }
  log(message: string) {
    this.messageService.addMessage(`NstbalanceService: ${message}`);
  }

  initializeINstbalance(): INstbalance {
    // Return an initialized object
    return {
      id: '0',
      OexercComptaKey: null,
      OtableauposteKey: null,
      OreferenceKey: null,
      NumCompte: null,
      IntitulCompte: null,
      SoldeDebit: null,
      SoldeCredit: null
    };
  }
}
