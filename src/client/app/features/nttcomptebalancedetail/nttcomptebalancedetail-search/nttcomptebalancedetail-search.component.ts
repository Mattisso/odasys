import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import {INttcomptebalancedetail} from '../nttcomptebalancedetail';
import {NttcomptebalancedetailService} from '../nttcomptebalancedetail.service';

@Component({
  selector: 'app-nttcomptebalancedetail-search',
  templateUrl: './nttcomptebalancedetail-search.component.html',
  styleUrls: ['./nttcomptebalancedetail-search.component.css']
})
export class NttcomptebalancedetailSearchComponent implements OnInit {
  withRefresh = false;
  balancedetail$: Observable<INttcomptebalancedetail[]>;
  private searchTerms = new Subject<string>();

  constructor(private nttcomptebalancedetailService: NttcomptebalancedetailService) { }

  search(term: string) {
    this.searchTerms.next(term);
  }

  ngOnInit() {

    this.balancedetail$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(500),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.nttcomptebalancedetailService.searchBalancedetails(term)),
    );
  }


}
