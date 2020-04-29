import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { INstbalanceinput } from '../nstbalanceinput';
import { NstbalanceinputService } from '../nstbalanceinput.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, merge, share, map, startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-nstbalanceinput-list',
  templateUrl: './nstbalanceinput-list.component.html',
  styleUrls: ['./nstbalanceinput-list.component.css']
})
export class NstbalanceinputListComponent implements OnInit {
  pageTitle = 'Balance Sheet List';
  listFilter: string;
  errorMessage: string;
  selectedId: string;
  p: 1;
  filterForm: FormGroup;
  pageUrl = new Subject<string>();
  isLoading = true;
  showSearch = true;
  config: any;
  // balances: any = [];
   balances: INstbalanceinput[];
  constructor(private balanceinputservice: NstbalanceinputService,
    private route: ActivatedRoute, private router: Router) {

     }

/*   ngOnInit(): void {
    this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';
    this.balanceinputservice.getBalances()
      .subscribe(balances => this.balances = balances,
        error => this.errorMessage = <any>error);
  } */

  ngOnInit() {
    this.config = {
      currentPage: 1,
      itemsPerPage: 10
  };

    this.route.queryParamMap.pipe(
      map(params => params.get('page'))
    )
    .subscribe(page => this.config.currentPage = page);
    this.getBalances();

  }




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
