import { Component, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import {Router, ActivatedRoute, ParamMap,NavigationExtras} from '@angular/router';

import { INstbalance } from '../nstbalance';
import { NstbalanceService } from '../nstbalance.service';
import { switchMap, catchError, map, filter } from 'rxjs/operators';
import { Observable, Subject, of, combineLatest } from 'rxjs';
import {slideInAnimation} from '../../../animations';


@Component({
  selector: 'app-nstbalance-detail',
  templateUrl: './nstbalance-detail.component.html',
  styleUrls: ['./nstbalance-detail.component.css'],
  animations: [slideInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NstbalanceDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

    pageTitle = 'Balance Sheet Detail';
    balance: INstbalance | undefined;
    balance$: Observable<INstbalance>;
    errorMessage: string;
    error$ = new Subject<string>();
    _nstbalance$: any;


    constructor(private balanceService: NstbalanceService,
      private router: Router,
      private route: ActivatedRoute) { }

      private errorMessageSubject = new Subject<string>();
      errorMessage$ = this.errorMessageSubject.asObservable();

      nstbalance$ = this.balanceService.selectednstbalance$
      .pipe(
        catchError(error => {
          this.error$.next(error);
          return of(null);
        })
      );

      pageTitle$ = this.nstbalance$
      .pipe(
        map((b: INstbalance) =>
        b ? `Balance Detail for : ${b.IntitulCompte}` : null)
      );

     //  Selectednsbalance$ = this.balanceService.selectednstbalance$;

      vm$ = combineLatest([
        this.nstbalance$,
        this.pageTitle$
      ]).pipe(
        filter(([nstbalance]) => Boolean(nstbalance)),
        map(([nstbalance, pageTitle]) =>
        ({nstbalance, pageTitle}))
      );


  ngOnInit(): void {
     this.balance$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
    this.balanceService.getBalance(params.get('id')))
    );


this.getall();

/*   let id = this.route.snapshot.paramMap.get['id'];
this.balance$= this.getBalance(id); */

  }
  onSelected(id: string) {
    this.balanceService.selectedNstbalanceChanged(id);
  }

  getBalance(id: string) {
    this.balanceService.getBalance(id).subscribe(
      balance => this.balance = balance,
      error => this.errorMessage = <any>error);
  }
  getall(): void {
    // this._nstbalance$ : any
    this.vm$.subscribe(
      _stbalance$  => this._nstbalance$ = _stbalance$
    );


  }

  getBalances(balance: INstbalance) {
    // tslint:disable-next-line:prefer-const
    let  balanceId = balance ? balance.id : null;
    const redirectUrl = '/nstbalances';

    // Set our navigation extras object
    // that passes on our global query params and fragment
    let navigationExtras: NavigationExtras = {
      queryParamsHandling: 'preserve',
      preserveFragment: true
    };
    this.router.navigate([redirectUrl, {id: balanceId}], navigationExtras);
  }


}
