import { Component, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import { INttbalance } from '../nttbalance';
import { NttbalanceService } from '../nttbalance.service';
import { switchMap, catchError, map, filter } from 'rxjs/operators';
import { Observable, Subject, of, combineLatest, EMPTY } from 'rxjs';
import {slideInAnimation} from '../../../animations';


@Component({
  selector: 'app-nttbalance-detail',
  templateUrl: './nttbalance-detail.component.html',
  styleUrls: ['./nttbalance-detail.component.css'],
  animations: [slideInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NttbalanceDetailComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

    pageTitle = 'Balance Sheet Detail';
    balance: INttbalance | undefined;
    balance$: Observable<INttbalance>;
    errorMessage: string;
    error$ = new Subject<string>();
    _nttbalance$: any;


    constructor(private balanceService: NttbalanceService,
      private router: Router,
      private route: ActivatedRoute) { }

      private errorMessageSubject = new Subject<string>();
      errorMessage$ = this.errorMessageSubject.asObservable();

      nttbalance$ = this.balanceService.selectednttbalance$
      .pipe(
        catchError(err => {
          this.errorMessageSubject.next(err);
        return EMPTY;
        })
      );

      pageTitle$ = this.nttbalance$
      .pipe(
        map((b: INttbalance) =>
        b ? `Balance Detail for : ${b.IntitulCompte}` : null)
      );

     //  Selectednsbalance$ = this.balanceService.selectednttbalance$;

      vm$ = combineLatest([
        this.nttbalance$,
        this.pageTitle$
      ]).pipe(
        filter(([nttbalance]) => Boolean(nttbalance)),
        map(([nttbalance, pageTitle]) =>
        ({nttbalance, pageTitle}))
      );


  ngOnInit(): void {
  /*    this.balance$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
    this.balanceService.getBalance(params.get('id')))
    );
 */

this.getall();

/*   let id = this.route.snapshot.paramMap.get['id'];
this.balance$= this.getBalance(id); */

  }
  onSelected(id: string) {
    this.balanceService.selectedNttbalanceChanged(id);
  }

  getBalance(id: string) {
    this.balanceService.getBalance(id).subscribe(
      balance => this.balance = balance,
      error => this.errorMessage = <any>error);
  }
  getall(): void {
    // this._nttbalance$ : any
    this.vm$.subscribe(
      _stbalance$  => this._nttbalance$ = _stbalance$
    );


  }

  getBalances(balance: INttbalance) {
    // tslint:disable-next-line:prefer-const
    let  balanceId = balance ? balance.id : null;

    this.router.navigate(['/nttbalances', {id: balanceId}]);
  }

}
