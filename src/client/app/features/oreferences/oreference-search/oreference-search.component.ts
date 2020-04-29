import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import {IOreference} from '../oreference';
import {OreferenceService} from '../oreference.service';


@Component({
  selector: 'app-oreference-search',
  templateUrl: './oreference-search.component.html',
  styleUrls: ['./oreference-search.component.css']
})
export class OreferenceSearchComponent implements OnInit {

  withRefresh = false;
  balances$: Observable<IOreference[]>;
  private searchTerms = new Subject<string>();

  constructor(private oreferenceService: OreferenceService) { }
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
      switchMap((term: string) => this.oreferenceService.searchoreferences(term)),
    );
  }

}
