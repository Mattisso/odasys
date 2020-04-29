import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams, HttpEvent, HttpEventType } from '@angular/common/http';
import { MessageService } from '../../messages/message.service';
import { Observable, of, throwError, Subject, merge, from, combineLatest, ReplaySubject, BehaviorSubject, EMPTY } from 'rxjs';
import {
  catchError, tap, map, mergeMap, delay, concatMap, filter,
  reduce, max, startWith, toArray, mergeAll, scan, shareReplay, switchMap, retry
} from 'rxjs/operators';
import { INttcomptebalance } from './nttcomptebalance';
import { environment } from '../../../environments/environment';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { Oexccompta } from '../oexerccomptas/oexccompta';
import { OexccomptaService } from '../oexerccomptas/oexccompta.service';
import { Oreference } from '../oreferences/oreference';
import { OreferenceService } from '../oreferences/oreference.service';
import { IOtableauposte } from '../otableaupostes/otableauposte';
import { OtableauposteService } from '../otableaupostes/otableauposte.service';
import { NttcomptebalancedetailService } from '../nttcomptebalancedetail/nttcomptebalancedetail.service';
import { INttcomptebalancedetail } from '../nttcomptebalancedetail/nttcomptebalancedetail';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    //   'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class NttcomptebalanceService {
  apiUrl = environment.apiUrl;
  nttcomptebalanceUrl = `${this.apiUrl}/api/nttcomptebalances`;
  nttcomptebalanceDetailUrl = this.nttcomptebalancedetailService.nttcomptebalancedetailUrl;
  private handleError: HandleError;
  comptebalances: INttcomptebalance[];
  editbalance: INttcomptebalance;

  getcomptebalances$: Observable<INttcomptebalance[]> = this.http.get<INttcomptebalance[]>(this.nttcomptebalanceUrl)
    .pipe(
      tap(data => this.log(`getcomptebalances:   ${JSON.stringify(data)}`)),
      catchError(this.handleError));


   // Action Stream
   private comptebalanceInsertedSubject = new Subject<INttcomptebalance>();
   comptebalanceInsertedAction$ = this.comptebalanceInsertedSubject.asObservable();
   // Merge the streams
   comptebalancesWithAdd$ = merge(
     this.getcomptebalances$,
     this.comptebalanceInsertedAction$
   ).pipe(
     scan((acc: INttcomptebalance[], value: INttcomptebalance) => [...acc, value]),
     catchError(err => {
       console.error(err);
       return throwError(err);
     })
   );

  private comptebalanceSelectedSubject = new BehaviorSubject<string>('0');
  comptebalanceSelectedAction$ = this.comptebalanceSelectedSubject.asObservable();

  selectedcomptebalance$ = combineLatest([
    this.comptebalancesWithAdd$,
    this.comptebalanceSelectedAction$
  ]).pipe(
    map(([comptebalances, selectedcomptebalanceKey]) =>
      comptebalances.find(comptebalance => comptebalance.id === selectedcomptebalanceKey)
    ),
    tap(comptebalance => console.log('selectedComptebalance', comptebalance)),
    shareReplay(1)
  );


  selectedcomptebalanceWithDetails$ = this.selectedcomptebalance$
    .pipe(
      filter(selectedcomptebalance => Boolean(selectedcomptebalance)),
      switchMap(selectedcompbalance =>
        from(selectedcompbalance.nttcomptebalancedetails)
          .pipe(
            mergeMap(details => this.http.get<INttcomptebalancedetail>
              (`${this.nttcomptebalanceDetailUrl}/${details}`)),
            toArray(),
            tap(data => this.log(`getcompteDetails:   ${JSON.stringify(data)}`))
          )
      )
    );


  getcomptebalances(): Observable<INttcomptebalance[]> {
    //  const url = `${this.balanceUrl}`;
    return this.http.get<INttcomptebalance[]>(this.nttcomptebalanceUrl)
      .pipe(
        tap(data => this.log(`getcomptebalances:   ${JSON.stringify(data)}`)),
        catchError(this.handleError('getcomptebalances', [])));
  }

  getcomptebalanceNo404<Data>(id: string): Observable<INttcomptebalance> {
    const url = `${this.nttcomptebalanceUrl}/?id=${id}`;
    return this.http.get<INttcomptebalance[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          //     this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<INttcomptebalance>(`getHero id =${id}`)));
  }
  getcomptebalance(id: string): Observable<INttcomptebalance | undefined> {
    return this.getcomptebalances()
      .pipe(
        map((comptebalances: INttcomptebalance[]) => comptebalances.find(b => b.id === id)));
  }


  deleteBalance(id: string): Observable<INttcomptebalance> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    //  headers.append('Authorization', `Bearer ${this.auth.
    // const options = new RequestOptions({ headers: headers });
    // const id = typeof balance === 'string' ? balance : balance.id;

    const url = `${this.nttcomptebalanceUrl}/${id}`;
    return this.http.delete<INttcomptebalance>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Balance id:  ${id}`)),
      catchError(this.handleError<INttcomptebalance>(`deleteBalance`)));

  }
  addNew(newComptebalance?: INttcomptebalance) {
    newComptebalance = newComptebalance || this.initializeINttcomptebalance();
    this.comptebalanceInsertedSubject.next(newComptebalance);
  }

  // Change the selected comptebalance
  selectedcomptebalanceChanged(selectedcomptebalanceId: string): void {
    this.comptebalanceSelectedSubject.next(selectedcomptebalanceId);
  }

  createBalance(balance: INttcomptebalance): Observable<INttcomptebalance> {
    balance.id = null;
    return this.http.post<INttcomptebalance>(this.nttcomptebalanceUrl, balance, httpOptions).pipe(
      //  map(this.extractData),
      tap(data => console.log('createBalance: ' + JSON.stringify(data))),
      catchError(this.handleError<INttcomptebalance>('createbalance')));

  }

  updateBalance(balance: INttcomptebalance): Observable<INttcomptebalance> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
    const url = `${this.nttcomptebalanceUrl}/${balance.id}`;
    return this.http.put<INttcomptebalance>(url, balance, httpOptions).pipe(
      tap(() => console.log('updateBalance: ' + JSON.stringify(balance.id))),
      // Return the balance on an update
      map(() => balance),
      catchError(this.handleError('updateBalance', balance)));

  }

  getDetailBalanceUrl(id: string): Observable<INttcomptebalance | undefined> {
    const url = `${this.nttcomptebalanceUrl}/${id}`;
    return this.http.get<INttcomptebalance>(url)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError)
      );
  }

  getCompteBalanceResponse(): Observable<HttpResponse<INttcomptebalance>> {
    return this.http.get<INttcomptebalance>(
      this.nttcomptebalanceUrl, { observe: 'response' });
  }

  private log(message: string) {
    this.messageService.addMessage(`nttcomptebalanceservice: ${message}`);
  }

  constructor(private http: HttpClient,
    private messageService: MessageService,
    private oexccomptaservice: OexccomptaService,
    private oreferenceservice: OreferenceService,
    private otableauposteservice: OtableauposteService,
    private nttcomptebalancedetailService: NttcomptebalancedetailService,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('NttcomptebalanceService');
  }

  initializeINttcomptebalance(): INttcomptebalance {
    // Return an initialized object
    return {
      id: '0',
      OexercComptaKey: null,
      OtableauposteKey: null,
      OreferenceKey: null,
      totalSoldeDebit: null,
      totalSoldeCredit: null,
      oexercCompta: null,
      otableauposte: null,
      oreference: null,
      nttcomptebalancedetails: []

    };
  }

}
