import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {map,  catchError} from 'rxjs/operators';

import { NttcomptebalanceService } from './nttcomptebalance.service';
import { INttcomptebalance } from './nttcomptebalance';

@Injectable({
  providedIn: 'root'
})
export class NttcomptebalanceResolverService {

  constructor(private nttcomptebalanceService: NttcomptebalanceService,
    private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INttcomptebalance> {
      // tslint:disable-next-line:prefer-const
      let id = route.paramMap.get('id');
      return this.nttcomptebalanceService.getcomptebalance(id).pipe(
              map(balance => {
          if (balance) {
              return balance;
          }
          console.log(`balance was not found: ${id}`);
          this.router.navigate(['/nttcomptebalances']);
          return null;
      }),
      catchError(error => {
          console.log(`Retrieval error: ${error}`);
          this.router.navigate(['/nttcomptebalances']);
          return of(null);
      })

      );

  }
}
