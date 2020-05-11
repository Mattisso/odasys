import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { INstbalanceinput,  getnstbalanceInputResponse, nstbalanceinputQuery} from '../nstbalanceinput';
import { NstbalanceinputService } from '../nstbalanceinput.service';
import { Subject, combineLatest, Observable,observable, Subscription, EMPTY} from 'rxjs';
import { debounceTime, merge, share, map, startWith, switchMap, catchError } from 'rxjs/operators';
import {ApolloQueryResult} from 'apollo-client';
//import {} from 'rxjs/Subscription';

// import 'rxjs/add/observable/combineLatest';
import { Apollo } from 'apollo-angular';
@Component({
  selector: 'app-nstbalanceinput-list',
  templateUrl: './nstbalanceinput-list.component.html',
  styleUrls: ['./nstbalanceinput-list.component.css']
})
export class NstbalanceinputListComponent implements OnInit {
  pageTitle = 'Balance Sheet List';
  listFilter: string;
  errorMessage: string;
  balanceinputs$: Observable<INstbalanceinput[]>;
  getbalanceinputs: Observable<INstbalanceinput[]>;
  getnstbalanceinputs='getnstbalanceinputs';
  loading:boolean=true ;
  selectedId: string;
  error: any;
  subscriptions: Subscription[] = [];
  count=0;
  p: 1;
  filterForm: FormGroup;
  pageUrl = new Subject<string>();
  isLoading = true;
  showSearch = true;
  config: any;
  // balances: any = [];
   balances: INstbalanceinput[];

  constructor( private apollo:Apollo,
  // private  nstbalanceinputquery: nstbalanceinputQuery,
    private balanceinputservice: NstbalanceinputService,
    private route: ActivatedRoute, private router: Router) {

     }
     private errorMessageSubject = new Subject<string>();
     errorMessage$ = this.errorMessageSubject.asObservable();

  nstbalanceinputQuery$=    this.balanceinputservice.getBalancesInput$.pipe(
    catchError(err=>{
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );
selectednstbalanceinput$=this.balanceinputservice.selectednstbalanceinput$;

vm$ = combineLatest([this.nstbalanceinputQuery$,
this.selectednstbalanceinput$]).pipe(
  map(([nstbalanceinputs, nstbalanceinput]:[INstbalanceinput[],INstbalanceinput])=>({
    nstbalanceinputs,nstbalanceinputId:nstbalanceinput?nstbalanceinput.id:'0'}))
);

  ngOnInit() {
    this.config = {
      currentPage: 1,
      itemsPerPage: 10
  };

    this.route.queryParamMap.pipe(
      map(params => params.get('page'))
    )

    .subscribe(page => this.config.currentPage = page);


  }

/* getBalances(): void {
this.balances = [];
    this.balanceinputservice.getBalances()
    .subscribe(balances => this.balances = balances,
      error =>  this.errorMessage = <any>error,
      () => this.isLoading = false);
    } */
    //  error => this.errorMessage = <any>error);


    onSelected(balanceId: string): void {
      this.balanceinputservice.selectedNstbalanceinputChanged(balanceId);
    }
    search(searchTerm: string) {
   //   this.editHero = undefined;
      if (searchTerm) {
        this.balanceinputservice.searchBalanceinputs(searchTerm)
          .subscribe(balances => this.balances = balances);
      }
    }

    toggleSearch() { this.showSearch = !this.showSearch; }

    pageChange(newPage: number) {
      this.router.navigate(['nstbalanceinputs'], { queryParams: { page: newPage } });
    }

}
