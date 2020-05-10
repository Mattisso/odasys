import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { INstbalanceinput, nstbalanceinputQuery, getnstbalanceInputResponse} from '../nstbalanceinput';
import { NstbalanceinputService } from '../nstbalanceinput.service';
import { Subject, combineLatest, Observable,observable, Subscription} from 'rxjs';
import { debounceTime, merge, share, map, startWith, switchMap } from 'rxjs/operators';
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
//nstbalanceinputquery: nstbalanceinputQuery;
   first$: Observable<number>;
  skip$: Observable<number>;
  orderBy$: Observable<string | null>;
  constructor( private apollo:Apollo,
   private  nstbalanceinputquery: nstbalanceinputQuery,
    private balanceinputservice: NstbalanceinputService,
    private route: ActivatedRoute, private router: Router) {

     }


/*   ngOnInit(): void {
    this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';
    this.balanceinputservice.getBalances()
      .subscribe(balances => this.balances = balances,
        error => this.errorMessage = <any>error);
  } */
  nstbalanceinputQuery=    this.balanceinputservice.getBalances();

  ngOnInit() {
    this.config = {
      currentPage: 1,
      itemsPerPage: 10
  };

    this.route.queryParamMap.pipe(
      map(params => params.get('page'))
    )

    .subscribe(page => this.config.currentPage = page);

 this.getbalanceinputs=this.nstbalanceinputquery.watch().valueChanges.pipe(map(result=>result.data.getbalanceinputs));


   //  this.getBalances();
/* this.apollo.watchQuery({
  query: nstbalanceinputQuery
}).valueChanges.subscribe(result=>{
  this.getnstbalanceinputs=result.data && result.data[this.getnstbalanceinputs];
  this.loading=result.loading;
  this.error =result.errors;
  console.log(result);
}) */


/* this.apollo.watchQuery({query: nstbalanceinputQuery})
.valueChanges.subscribe(result=>{
  this.getnstbalanceinputs=result.data && result.data[this.getnstbalanceinputs];
  this.loading=result.loading;
  this.error =result.errors;
}); */


//pipe(map(({data})=>data[this.getnstbalanceinputs]));


     /*  const getQuery : Observable<ApolloQueryResult<getnstbalanceInputResponse>> =>{
      const query=  this.apollo.watchQuery<getnstbalanceInputResponse>({
        query: nstbalanceinputQuery
      });
      return query.valueChanges;
    }; */
  }

  /* const getQuery = (): Observable<ApolloQueryResult<getnstbalanceInputResponse>> => {
    const query = this.apollo.watchQuery<getnstbalanceInputResponse>({
      query: this.getnstbalanceinputs
    });
 return query.valueChanges;
  }; */
 /*  getQuery():   Observable<ApolloQueryResult<getnstbalanceInputResponse>>=>{
    const query= this.apollo.watchQuery<getnstbalanceInputResponse>({
      query:nstbalanceinputQuery
    })
return query.valueChanges;
  } */
getBalances(): void {
this.balances = [];
    this.balanceinputservice.getBalances()
    .subscribe(balances => this.balances = balances,
      error =>  this.errorMessage = <any>error,
      () => this.isLoading = false);
    }
    //  error => this.errorMessage = <any>error);


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
