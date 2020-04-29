 // tslint:disable-next-line:max-line-length
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {OdaDropDownListService} from './oda-drop-down-list.service';
import {IddlOExerComptable, IddlOtableauposteByYear, IddlOreferenceByear} from './oda-drop-down-list';

import { Subject, EMPTY, combineLatest, Observable } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-oda-drop-down-list',
  templateUrl: './oda-drop-down-list.component.html',
  styleUrls: ['./oda-drop-down-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OdaDropDownListComponent implements OnInit {
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  IddloreferenceByear$: Observable<IddlOreferenceByear[]>;
  Iddloexercomptables$: Observable<IddlOExerComptable[]>;
  IddlotableauposteByYears$: Observable<IddlOtableauposteByYear[]>;

  selectedYear = '0';
  selectedotableau = '0';
  selectedoreference = '0';

  ddloexerccomptas$ = this.OdadropDownListService.ddloexerccompta$
  .pipe(
      catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );


 // tslint:disable-next-line:max-line-length
  ddlotableauposte$ = combineLatest([this.OdadropDownListService.ddlOtableauposteByYear$, this.OdadropDownListService.oexcercompteSelectedAction$])
  .pipe(
    map(([otableaupostes, selectedoexcercompteId]) =>
    otableaupostes
    .filter(
      otableauposte =>
      selectedoexcercompteId ? otableauposte.OexercComptaKey === selectedoexcercompteId : true)
      ),
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

 // tslint:disable-next-line:max-line-length
  ddloreference$ = combineLatest([this.OdadropDownListService.ddlOreferenceByear$, this.OdadropDownListService.otableauposteSelectedAction$])
  .pipe(
    map(([otableaupostes, selectedotableauposteId]) =>
    otableaupostes
    .filter(
      otableauposte =>
      selectedotableauposteId ? otableauposte.OtableauposteKey === selectedotableauposteId : true)
      ),
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  vn$ = combineLatest([
   this.ddloexerccomptas$,
  this.ddlotableauposte$,
  this.ddloreference$
  ]).pipe(
    map(([oexcomptas, otableaupostes, oreferences]) =>
      ({ oexcomptas, otableaupostes , oreferences}))
        );


  onComptaKeySelected(OexercComptaKey: string) {
   this.OdadropDownListService.oexcercompteSelectedSubject.next(OexercComptaKey);
/*    this.IddlotableauposteByYears$= this.ddlotableauposte$
    .pipe(
     map(ddlotableauposte=> ddlotableauposte
      .filter(item => {
               return item.OexercComptaKey === OexercComptaKey
           }
           )

      )

    ) */

        /* this.states = this.getStates().filter((item) => {
            return item.country_id === Number(country_id)
        });*/
  }
  onOtableauposteKeySelected(OtableauposteKey: string): void {
  this.OdadropDownListService.otableauposteSelectedSubject.next(OtableauposteKey);
/*    this.IddloreferenceByear$= this.ddloreference$
    .pipe(
      map(oreference=>oreference
        .filter((item) => {
          console.log(item)
            return item.OtableauposteKey === OtableauposteKey
      }
    )
        )
     )  */
  }
  onOreferenceKeySelected(OreferenceKey: string): void {
    this.OdadropDownListService.oreferenceSelectedSubject.next(OreferenceKey);
  }

  constructor(private OdadropDownListService:  OdaDropDownListService) { }

  ngOnInit() {
  }

}
