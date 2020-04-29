import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {map,  catchError} from 'rxjs/operators';

import { NstbalanceService } from './nstbalance.service';
import { INstbalance } from './nstbalance';

@Injectable({
  providedIn: 'root'
})
export class NstbalanceResolverService  implements Resolve<INstbalance> {
  constructor(private nstbalanceService: NstbalanceService,
    private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INstbalance> {
      // tslint:disable-next-line:prefer-const
      let id = route.paramMap.get('id');
      return this.nstbalanceService.getBalance(id).pipe(
              map(balance => {
          if (balance) {
              return balance;
          }
          console.log(`balance was not found: ${id}`);
          this.router.navigate(['/nstbalances']);
          return null;
      }),
      catchError(error => {
          console.log(`Retrieval error: ${error}`);
          this.router.navigate(['/nstbalances']);
          return of(null);
      })

      );

  }
}
