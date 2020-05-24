import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import {IOexerccompta} from '../oexerccompta';
import {OexerccomptaService} from '../oexerccompta.service';

@Component({
  selector: 'app-oexerccompta-search',
  templateUrl: './oexerccompta-search.component.html',
  styleUrls: ['./oexerccompta-search.component.css']
})
export class OexerccomptaSearchComponent implements OnInit {
  withRefresh = false;
  oexerccompta$: Observable<IOexerccompta[]>;
  private searchTerms = new Subject<string>();
  constructor(private oexerccomptaService: OexerccomptaService) { }


  search(term: string) {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {



    this.oexerccompta$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(500),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.oexerccomptaService.searchoExercComptas(term)),
    );
  }

}
