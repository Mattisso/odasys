import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, combineLatest, Observable,observable, Subscription, EMPTY, empty} from 'rxjs';
import { debounceTime, merge, share, map, startWith, switchMap, catchError } from 'rxjs/operators';

import {OexerccomptaService} from '../oexerccompta.service'
import { Oexerccompta } from '../oexerccompta';
import { IOexccompta } from 'src/client/app/exchange-rates/rates';
@Component({
  selector: 'app-oexerccompta-list',
  templateUrl: './oexerccompta-list.component.html',
  styleUrls: ['./oexerccompta-list.component.css']
})
export class OexerccomptaListComponent implements OnInit {

  config: any;
  count=0;
  p: 1;
  showSearch = true;
  pageTitle = 'Exercice Comptable  List de clotures';
  errorMessage: string;



  constructor(private oexerccomptaService: OexerccomptaService,
    private route: ActivatedRoute, private router: Router) { }


    private errorMessageSubject = new Subject<string>();
     errorMessage$ = this.errorMessageSubject.asObservable();

     oexerccomptaQuery$=this.oexerccomptaService.getoexerccompta$.pipe(
       catchError(err=>{
         this.errorMessageSubject.next(err);
         return EMPTY;
       })
     )

    selectedoexerccompta$=this.oexerccomptaService.selectedoexerccompta$;
    vm$=combineLatest([this.oexerccomptaQuery$,
    this.selectedoexerccompta$]).pipe(
      map(([oexerccomptas, oexerccompta]:[IOexccompta[],IOexccompta])=>({
        oexerccomptas, oexercomptaId:oexerccompta? oexerccompta.id:'0'})
    )
    );

    onSelected(oexerccomptaId: string): void {
      this.oexerccomptaService.selectedOexcerccomptaChanged(oexerccomptaId);
    }
    pageChange(newPage: number) {
      this.router.navigate(['oexerccomptas'], { queryParams: { page: newPage } });
    }
    toggleSearch() { this.showSearch = !this.showSearch; }

  ngOnInit(): void {
    this.config = {
      currentPage: 1,
      itemsPerPage: 20
  }
  this.route.queryParamMap.pipe(
    map(params => params.get('page'))
  )
  .subscribe(page => this.config.currentPage = page);
}
}
