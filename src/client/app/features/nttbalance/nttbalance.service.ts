import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, of, combineLatest, BehaviorSubject, Subject, merge } from 'rxjs';
import { MessageService } from '../../messages/message.service';
import { catchError, tap, map , filter, shareReplay, mergeMap, reduce, concatMap, scan} from 'rxjs/operators';
import { INttbalance } from './nttbalance';
import { environment } from '../../../environments/environment';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { OexccomptaService } from '../oexerccomptas/oexccompta.service';
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
export class NttbalanceService {

  apiUrl = environment.apiUrl;
  nttbalanceUrl = `${this.apiUrl}/api/nttbalances`;
  private handleError: HandleError;
  balances: INttbalance[];


  constructor(private http: HttpClient,
    private messageService: MessageService,
    httpErrorHandler: HttpErrorHandler,
    private oexccomptaservice: OexccomptaService,
    private oreferenceservice: OreferenceService,
    private otableauposteservice: OtableauposteService,
    ) {
    this.handleError = httpErrorHandler.createHandleError('NttbalanceService');
  }

  getnttbalances$ = this.http.get<INttbalance[]>(this.nttbalanceUrl)
    .pipe(
      tap(data => this.log(`getnttbalances: ${JSON.stringify(data)}`)),
      catchError(this.handleError));

      nttbalanceCombined$ = combineLatest(
        this.getnttbalances$,
        this.oexccomptaservice.getoexerccompta$,
        this.otableauposteservice.getOtableaupostes$,
        this.oreferenceservice.getOreferences$
      ).pipe(map(([nttbalances, oexcercices, otableaupostes, oreferences]) =>
        nttbalances.map(
          nttbalance => ({
            ...nttbalance,
            oexercCompta: oexcercices.find(c => nttbalance.OexercComptaKey === c.id).oExercComptaId,
            otableauposte: otableaupostes.find(c => nttbalance.OtableauposteKey === c.id).tableauLongName,
            oreference: oreferences.find(c => nttbalance.OreferenceKey === c.id).fullDescription
          } as INttbalance)
        )
      ), shareReplay(1));

      private nttbalanceInsertedSubject = new Subject<INttbalance>();
      nttbalanceInsertedAction$ = this.nttbalanceInsertedSubject.asObservable();

      nttbalanceWithAdd$ = merge(
        this.nttbalanceCombined$,
        this.nttbalanceInsertedAction$
          .pipe(
            concatMap(newNttbalance => {
              newNttbalance.id = null;
              return this.http.post<INttbalance>(this.nttbalanceUrl, newNttbalance, httpOptions)
                .pipe(
                  tap(nttbalance => console.log('Created nttbalance', JSON.stringify(nttbalance))),
                  catchError(this.handleError)
                );
            }),
          ))
        .pipe(
          scan((acc: INttbalance[], value: INttbalance) => [...acc, value]),
          shareReplay(1)
        );

        private nttbalanceSelectedSubject = new BehaviorSubject<string>('0');
        nttbalanceSelectedAction$ = this.nttbalanceSelectedSubject.asObservable();

      selectednttbalance$ = combineLatest([
        this.nttbalanceWithAdd$,
        this.nttbalanceSelectedAction$
      ]).pipe(
        map(([nttbalances, selectednttbalanceKey]) =>
          nttbalances.find(nttbalance => nttbalance.id === selectednttbalanceKey)
        ),
        tap(nttbalance => this.log(`selectedComptebalance , ${JSON.stringify(nttbalance)}`)),
        shareReplay(1)
      );


       // Totals the prices for all items
  totalSoldDebit$ = this.nttbalanceCombined$
  .pipe(
    mergeMap(item => item),
    reduce<INttbalance, number>((acc, item) => acc + item.SoldeDebit, 0),
    catchError(this.handleError)
  );

       // Totals the prices for all items
       totalSoldeCredit$ = this.nttbalanceCombined$
       .pipe(
         mergeMap(item => item),
         reduce<INttbalance, number>((acc, item) => acc + item.SoldeCredit, 0),
         catchError(this.handleError)
       );

       selectedNttbalanceChanged(selectedNttbalanceId: string): void {
        this.nttbalanceSelectedSubject.next(selectedNttbalanceId);
      }


       getBalances(): Observable<INttbalance[]> {
    //  const url = `${this.balanceUrl}`;
    return this.http.get<INttbalance[]>(this.nttbalanceUrl)
      .pipe(
        tap(data => this.log(`getBalances:   ${JSON.stringify(data)}`)),
        catchError(this.handleError('getBalances', []))
      );

  }

  getBalanceNo404<Data>(id: string): Observable<INttbalance> {
    const url = `${this.nttbalanceUrl}/?id=${id}`;
    return this.http.get<INttbalance[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          //     this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<INttbalance>(`getHero id =${id}`))
      );
  }


  getBalance(id: string): Observable<INttbalance| undefined> {
    return this.getBalances()
    .pipe(
      map((balances: INttbalance[]) => balances.find(b => b.id === id))
    );
    }

  /* GET heroes whose name contains search term */
  searchBalances(term: string): Observable<INttbalance[]> {
    term = term.trim();
      const options = term ?
       { params: new HttpParams().set('IntitulCompte', term) } : {};

    return this.http.get<INttbalance[]>(this.nttbalanceUrl, options).pipe(

      tap(_ => this.log(`found nttbalance matching "${term}"`)),
      catchError(this.handleError<INttbalance[]>('searchBalances', []))
    );
  }

  deleteBalance(balance: INttbalance): Observable<INttbalance> {
      const url = `${this.nttbalanceUrl}/${balance.id}`;
    return this.http.delete<INttbalance>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Balance id:  ${balance}`)),
      map(() => balance),
      catchError(this.handleError<INttbalance>(`deleteBalance`))

    );

  }

  createBalance(balance: INttbalance): Observable<INttbalance> {
    balance.id = null;
    return this.http.post<INttbalance>(this.nttbalanceUrl, balance, httpOptions).pipe(
      //  map(this.extractData),
      tap(data => console.log('createBalance: ' + JSON.stringify(data))),
      catchError(this.handleError<INttbalance>('createbalance'))
    );

  }

   updateBalance(balance: INttbalance): Observable<INttbalance> {
    httpOptions.headers =
    httpOptions.headers.set('Authorization', 'my-new-auth-token');
    const url = `${this.nttbalanceUrl}/${balance.id}`;
    return this.http.put<INttbalance>(url, balance, httpOptions).pipe(
        tap(() => console.log('updateBalance: ' + JSON.stringify(balance.id))),
         // Return the balance on an update
        map(() => balance),
      catchError(this.handleError('updateBalance', balance))

    );

  }
  private log(message: string) {
    this.messageService.addMessage(`NttbalanceService: ${message}`);
  }


  initializeINttbalance(): INttbalance {
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
