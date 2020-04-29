import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {map,  catchError} from 'rxjs/operators';

import { NttbalanceService } from './nttbalance.service';
import { INttbalance } from './nttbalance';

@Injectable({
  providedIn: 'root'
})
export class NttbalanceResolverService implements Resolve<INttbalance> {
  constructor(private nttbalanceService: NttbalanceService,
    private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INttbalance> {
      // tslint:disable-next-line:prefer-const
      let id = route.paramMap.get('id');
      return this.nttbalanceService.getBalance(id).pipe(
              map(balance => {
          if (balance) {
              return balance;
          }
          console.log(`balance was not found: ${id}`);
          this.router.navigate(['/nttbalances']);
          return null;
      }),
      catchError(error => {
          console.log(`Retrieval error: ${error}`);
          this.router.navigate(['/nttbalances']);
          return of(null);
      })
      );
  }
}
