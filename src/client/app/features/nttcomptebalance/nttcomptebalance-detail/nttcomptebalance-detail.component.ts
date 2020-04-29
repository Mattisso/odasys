import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NttcomptebalanceService } from '../nttcomptebalance.service';
import { INttcomptebalance } from '../nttcomptebalance';
import { ActivatedRoute, Router } from '@angular/router';
import { OexccomptaService } from '../../oexerccomptas/oexccompta.service';
import { OreferenceService } from '../../oreferences/oreference.service';
import { OtableauposteService } from '../../otableaupostes/otableauposte.service';

import { combineLatest, EMPTY, Subject } from 'rxjs';
import { catchError, map, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-nttcomptebalance-detail',
  templateUrl: './nttcomptebalance-detail.component.html',
  styleUrls: ['./nttcomptebalance-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NttcomptebalanceDetailComponent implements OnInit {

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  ocomptebalances$ = this.nttcomptebalanceservice.selectedcomptebalance$
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  pageTitle$ = this.ocomptebalances$
    .pipe(
      map((b: INttcomptebalance) =>
        b ? `Balance Detail for : ${b.oreference}` : null)
    );

  // Suppliers for this product
  comptebalanceWithDetails$ = this.nttcomptebalanceservice.selectedcomptebalanceWithDetails$
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      }));

  vn$ = combineLatest([
    this.ocomptebalances$,
    this.comptebalanceWithDetails$,
    this.pageTitle$
  ]).pipe(
    filter(([ocomptebalance]) => Boolean(ocomptebalance)),
    map(([ocomptebalance, comptebalanceDetails, pageTitle]) =>
      ({ ocomptebalance, comptebalanceDetails, pageTitle }))
  );

  constructor(private nttcomptebalanceservice: NttcomptebalanceService,
    private route: ActivatedRoute, private router: Router,
    private oexccomptaService: OexccomptaService,
    private otableauposteService: OtableauposteService,
    private oreferenceService: OreferenceService) { }

  ngOnInit() {
  }

}
