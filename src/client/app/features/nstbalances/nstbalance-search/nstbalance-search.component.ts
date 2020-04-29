import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import {INstbalance} from '../nstbalance';
import {NstbalanceService} from '../nstbalance.service';


@Component({
  selector: 'app-nstbalance-search',
  templateUrl: './nstbalance-search.component.html',
  styleUrls: ['./nstbalance-search.component.css']
})
export class NstbalanceSearchComponent implements OnInit {

  withRefresh = false;
  balances$: Observable<INstbalance[]>;
  private searchTerms = new Subject<string>();

  constructor(private nstbalanceService: NstbalanceService) { }

  search(term: string) {
    this.searchTerms.next(term);
  }

  ngOnInit() {

    this.balances$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(500),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.nstbalanceService.searchBalances(term)),
    );
  }

}
