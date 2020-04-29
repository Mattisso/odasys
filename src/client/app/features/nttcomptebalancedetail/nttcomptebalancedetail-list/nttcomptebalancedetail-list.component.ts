import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { INttcomptebalancedetail } from '../nttcomptebalancedetail';
import { NttcomptebalancedetailService } from '../nttcomptebalancedetail.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, merge, share, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-nttcomptebalancedetail-list',
  templateUrl: './nttcomptebalancedetail-list.component.html',
  styleUrls: ['./nttcomptebalancedetail-list.component.css']
})
export class NttcomptebalancedetailListComponent implements OnInit {

  pageTitle = 'Detail List';
  listFilter: string;
  errorMessage: string;
  selectedId: string;
  p: 1;
  filterForm: FormGroup;
  pageUrl = new Subject<string>();
  isLoading = true;
  showSearch = true;
  config: any;
  // balancedetails: any = [];
  balancedetail: INttcomptebalancedetail | undefined;
   balancedetails: INttcomptebalancedetail[];
  constructor(private nttcomptebalancedetailService: NttcomptebalancedetailService,
    private route: ActivatedRoute, private router: Router) {

     }


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
this.balancedetails = [];
    this.nttcomptebalancedetailService.getcompteDetails()
    .subscribe(balancedetails => this.balancedetails = balancedetails,
      error =>  this.errorMessage = <any>error,
      () => this.isLoading = false);
    }
    //  error => this.errorMessage = <any>error);


    search(searchTerm: string) {
   //   this.editHero = undefined;
      if (searchTerm) {
        this.nttcomptebalancedetailService.searchBalancedetails(searchTerm)
          .subscribe(balancedetails => this.balancedetails = balancedetails);
      }
    }

    toggleSearch() { this.showSearch = !this.showSearch; }

    pageChange(newPage: number) {
      this.router.navigate(['nttcomptebalancedetails'], { queryParams: { page: newPage } });
    }
}
