import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { INstbalance } from '../nstbalance';
import { NstbalanceService } from '../nstbalance.service';
import { Observable, Subject, EMPTY, combineLatest } from 'rxjs';
import { debounceTime, merge, share, map, startWith, switchMap, catchError, tap, toArray , concatMap} from 'rxjs/operators';
import { OexerccomptaService } from '../../oexerccompta/oexerccompta.service';
import { OtableauposteService } from '../../otableaupostes/otableauposte.service';
import { OreferenceService } from '../../oreferences/oreference.service';
import { IOexerccompta } from '../../oexerccompta/oexerccompta';
import { IOreference } from '../../oreferences/oreference';
import { IOtableauposte } from '../../otableaupostes/otableauposte';
import {OdaDropDownListService} from '../../../core/oda-drop-down-list/oda-drop-down-list.service';

@Component({
  selector: 'app-nstbalance-list',
  templateUrl: './nstbalance-list.component.html',
  styleUrls: ['./nstbalance-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NstbalanceListComponent implements OnInit {
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
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  _nstbalance$: Observable<INstbalance>;
   balances$: any ;
  balances: INstbalance[];
  constructor(private balanceservice: NstbalanceService,
    private route: ActivatedRoute, private router: Router,
    private odaDropDownListService: OdaDropDownListService,
    private oexccomptaService: OexerccomptaService,
    private otableauposteService: OtableauposteService ,
     private oreferenceService: OreferenceService) {

     }


     nstbalancewithotableauposte$$ = combineLatest([
      this.balanceservice.nstbalanceWithAdd$,
      this.odaDropDownListService.oexcercompteSelectedAction$,
      this.odaDropDownListService.otableauposteSelectedAction$,
      this.odaDropDownListService.oreferenceSelectedAction$,
    ])
      .pipe(
        tap(data => this.balanceservice.log(`getnstbalances:   ${JSON.stringify(data)}`)),
        map(([balances, selectedotableauposteId]) =>
          balances.filter(comptebalance =>
            selectedotableauposteId ? comptebalance.OtableauposteKey === selectedotableauposteId : true)
        ),
        catchError(err => {
          this.errorMessageSubject.next(err);
          return EMPTY;
        })
      );

      nstbalance$$ = combineLatest([
      this.balanceservice.nstbalanceWithAdd$,
      this.odaDropDownListService.oexcercompteSelectedAction$,
      this.odaDropDownListService.otableauposteSelectedAction$,
      this.odaDropDownListService.oreferenceSelectedAction$,
      ])
        .pipe(
          tap(data => this.balanceservice.log(`getnstbalances:   ${JSON.stringify(data)}`)),
          map(([balances, selectedoexcercompteId,  selectedotableauposteId, selectedoreferenceId]) =>
            balances
            .filter(comptebalance =>
              selectedoexcercompteId ? comptebalance.OexercComptaKey === selectedoexcercompteId : true)
            .filter(comptebalance =>
              selectedoreferenceId ? comptebalance.OreferenceKey === selectedoreferenceId : true)
              .filter(comptebalance =>
                selectedotableauposteId ? comptebalance.OtableauposteKey === selectedotableauposteId : true)
          ),
          catchError(err => {
            this.errorMessageSubject.next(err);
            return EMPTY;
          })
        );
  nstbalance$ = this.balanceservice.getnstbalances$
  .pipe(catchError(err => {
    this.errorMessageSubject.next(err);
    return EMPTY;
  }));

  pageTitle$ = this.balanceservice.selectednstbalance$
    .pipe(
      map((p: INstbalance) =>
        p ? `Product Detail for: ${p.IntitulCompte}` : null)
    );


vm$ = combineLatest([
  this.nstbalance$$ // ,
 // this.pageTitle
// this.nstbalance$$
])
  .pipe(
    map(([balances]: [INstbalance[]]) =>
      ({ balances })
      )
  );

  ngOnInit() {
    this.config = {
      currentPage: 1,
      itemsPerPage: 10

  };
    this.route.queryParamMap.pipe(
      map(params => params.get('page'))
    ).subscribe(page => this.config.currentPage = page);
    this.getBalances();
/*
this.vm$.subscribe(_nstbalance=>this._nstbalance$=_nstbalance,
  error =>  this.errorMessage = <any>error,
  () => this.isLoading = false) ;*/

  }


getBalances(): void {
 // this.balances = [];
   //  this.balanceservice.getBalances()
    this.vm$.subscribe(balances => this.balances$ = balances,
      error =>  this.errorMessage = <any>error,
      () => this.isLoading = false);
    }
    //  error => this.errorMessage = <any>error);

    search(searchTerm: string) {
   //   this.editHero = undefined;
      if (searchTerm) {
        this.balanceservice.searchBalances(searchTerm)
          .subscribe(balances => this.balances = balances);
      }
    }

    toggleSearch() { this.showSearch = !this.showSearch; }

    pageChange(newPage: number) {
      this.router.navigate(['nstbalances'], { queryParams: { page: newPage } });
    }
}
