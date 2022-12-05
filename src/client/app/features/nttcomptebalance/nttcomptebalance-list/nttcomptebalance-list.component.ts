import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { INttcomptebalance } from '../nttcomptebalance';
import { OexerccomptaService } from '../../oexerccompta/oexerccompta.service';
import { OreferenceService } from '../../oreferences/oreference.service';
import { IOreference } from '../../oreferences/oreference';
import { NttcomptebalanceService } from '../nttcomptebalance.service';
import { OtableauposteService } from '../../otableaupostes/otableauposte.service';
import { IOtableauposte } from '../../otableaupostes/otableauposte';
import { Subject, combineLatest, EMPTY, BehaviorSubject, Observable} from 'rxjs';
import { catchError, map, filter, toArray } from 'rxjs/operators';
import {OdaDropDownListService} from '../../../core/oda-drop-down-list/oda-drop-down-list.service';

@Component({
  selector: 'app-nttcomptebalance-list',
  templateUrl: './nttcomptebalance-list.component.html',
  styleUrls: ['./nttcomptebalance-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NttcomptebalanceListComponent implements OnInit {
  pageTitle = 'compteBalance List';
  isLoading = true;
  comptebalances: INttcomptebalance[];
  ddoreferences$: Observable<IOreference[]>;
 ddlotableaupostes$: Observable<IOtableauposte[]>;
  comptebalance$: any = [];
// vv: {};
  errorMessage: string;
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(
    private nttcomptebalanceservice: NttcomptebalanceService,
    private route: ActivatedRoute, private router: Router,
    private oexerccomptaService: OexerccomptaService,
    private otableauposteService: OtableauposteService,
    private odaDropDownListService: OdaDropDownListService,
    private oreferenceService: OreferenceService
  ) { }

  ocomptebalances$ = this.nttcomptebalanceservice.selectedcomptebalanceWithDetails$
    .pipe(catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    }));

  // Selectedcomptebalance$ = this.nttcomptebalanceservice.selectedcomptebalance$;


  // Merge Data stream with Action stream
  // To filter to the selected category
  /*   _vn$ = combineLatest([
      this.ocomptebalances$,
      this.Selectedoexcercompte$
    ])
      .pipe(
        map(([comptebalances, comptebalance]: [INttcomptebalance[], INttcomptebalance]) =>
          ({ comptebalances, comptebalanceid: comptebalance ? comptebalance.id : '0' }))
      ); */

  comptebalances$ = combineLatest([
        this.nttcomptebalanceservice.comptebalancesWithAdd$,
       this.odaDropDownListService.oexcercompteSelectedAction$,
        this.odaDropDownListService.otableauposteSelectedAction$,
        this.odaDropDownListService.oreferenceSelectedAction$
      ])
    .pipe(
      map(([comptebalances, selectedoexcercompteId, selectedotableauposteId, selectedoreferenceId]) =>
        comptebalances
       .filter(comptebalance =>
          selectedoexcercompteId ? comptebalance.OexercComptaKey === selectedoexcercompteId : true)
        .filter(
          comptebalance =>
          selectedotableauposteId ? comptebalance.OtableauposteKey === selectedotableauposteId : true)
     .filter(
          comptebalance =>
          selectedoreferenceId ? comptebalance.OreferenceKey === selectedoreferenceId : true)
          ),
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      }));

  vn$ = combineLatest([
    this.comptebalances$
  ]).pipe(
    map(([ocomptebalances]) =>
      ({ ocomptebalances}))
  );

  onSelectedoComptebalanceChanged(comptebalanceid: string): void {
    this.nttcomptebalanceservice.selectedcomptebalanceChanged(comptebalanceid);
  }

  onComptaKeySelected(OexercComptaKey: string): void {
    this.oexerccomptaService.oexerccomptaSelectedSubject.next(OexercComptaKey);
  }
  onOtableauposteKeySelected(OtableauposteKey: string): void {
    this.otableauposteService.otableauposteSelectedSubject.next(OtableauposteKey);
  }
  onOreferenceKeySelected(OreferenceKey: string): void {
    this.oreferenceService.oreferenceSelectedSubject.next(OreferenceKey);
  }

  ngOnInit() {
      this.Getbalances();
   //  this.getcomptebalances();
  //   this.vn$.subscribe(ocomptebalance => this.vv = ocomptebalance);
  }

  Getbalances(): void {
   // this.comptebalance$ = [];
        this.vn$
        .subscribe(comptebalance$ => this.comptebalance$ = comptebalance$,
          error =>  this.errorMessage = <any>error,
          () => this.isLoading = false);
        }
}
