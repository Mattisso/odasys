import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import {INttbalance} from '../nttbalance';
import {NttbalanceService} from '../nttbalance.service';

@Component({
  selector: 'app-nttbalance-search',
  templateUrl: './nttbalance-search.component.html',
  styleUrls: ['./nttbalance-search.component.css']
})
export class NttbalanceSearchComponent implements OnInit {
  withRefresh = false;
  balances$: Observable<INttbalance[]>;
  private searchTerms = new Subject<string>();

  constructor(private nttbalanceService: NttbalanceService) { }

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
      switchMap((term: string) => this.nttbalanceService.searchBalances(term)),
    );
  }
}
