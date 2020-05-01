import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { INttbalance } from '../nttbalance';
import { NttbalanceService } from '../nttbalance.service';
import { Observable, Subject, EMPTY, combineLatest } from 'rxjs';
import { debounceTime, merge, share, map, startWith, switchMap, catchError } from 'rxjs/operators';
import { OexerccomptaService } from '../../oexerccompta/oexerccompta.service';
import { OtableauposteService } from '../../otableaupostes/otableauposte.service';
import { OreferenceService } from '../../oreferences/oreference.service';
import { IOexerccompta } from '../../oexerccompta/oexerccompta';

@Component({
  selector: 'app-nttbalance-list',
  templateUrl: './nttbalance-list.component.html',
  styleUrls: ['./nttbalance-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NttbalanceListComponent implements OnInit {
  pageTitle = 'Balance List';
  listFilter: string;
  errorMessage: string;
  selectedId: string;
  totalDebit: number;
  totalCredit: number;
  p: 1;
  filterForm: FormGroup;
  pageUrl = new Subject<string>();
  isLoading = true;
  showSearch = true;
  config: any;


   nttbalances: INttbalance[];
   balance$: any;
  constructor(private balanceservice: NttbalanceService,
    private route: ActivatedRoute, private router: Router) {

     }

     private errorMessageSubject = new Subject<string>();
     errorMessage$ = this.errorMessageSubject.asObservable();

  nttbalance$ = this.balanceservice.nttbalanceWithAdd$
  .pipe(catchError(err => {
    this.errorMessageSubject.next(err);
    return EMPTY;
  }));

  Selectednttbalance$ = this.balanceservice.selectednttbalance$;

// Merge Data stream with Action stream
// To filter to the selected category
vm$ = combineLatest([
  this.nttbalance$,
 this.Selectednttbalance$
])
  .pipe(
    map(([balances, balance]: [INttbalance[], INttbalance ]) =>
      ({ balances, balanceId: balance ? balance.id : '0'}))
  );


  ngOnInit() {
    this.config = {
      currentPage: 1,
      itemsPerPage: 10
  };

    this.route.queryParamMap.pipe(
      map(params => params.get('page'))    )
    .subscribe(page => this.config.currentPage = page);

    this.gettotaldebit();
  this.getBalances();
 // this.getall();

  }
/*
getall(): void {
  this._nttbalance$ = [];
  this._vm$.subscribe(
    __nttbalance$ => this._nttbalance$ = __nttbalance$
  );
}
 */

onSelected(balanceId: string): void {
  this.balanceservice.selectedNttbalanceChanged(balanceId);
}
gettotaldebit(): void {
this.totalDebit = 0;
this.balanceservice.totalSoldDebit$.subscribe(
  totalDebit => this.totalDebit += totalDebit
);
// console.log(this.totalDebit);
}

gettotalcrebit(): void {
  this.totalCredit = 0;
  this.balanceservice.totalSoldDebit$.subscribe(
    totalCredit => this.totalCredit += totalCredit
  );
  // console.log(this.totalDebit);
  }

  getBalances(): void {
    this.vm$.subscribe(vnttbalance => this.balance$ = vnttbalance);
  }

/* getBalances(): void {
this.balances = [];
    this.balanceservice.getBalances()
    .subscribe(balances => this.balances = balances,
      error =>  this.errorMessage = <any>error,
      () => this.isLoading = false);
    } */
    //  error => this.errorMessage = <any>error);


    search(searchTerm: string) {
   //   this.editHero = undefined;
      if (searchTerm) {
        this.balanceservice.searchBalances(searchTerm)
          .subscribe(nttbalances => this.nttbalances = nttbalances);
      }
    }

    toggleSearch() { this.showSearch = !this.showSearch; }

    pageChange(newPage: number) {
      this.router.navigate(['nttbalances'], { queryParams: { page: newPage } });
    }
}
