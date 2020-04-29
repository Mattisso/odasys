import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {map,  catchError} from 'rxjs/operators';

import { NstbalanceinputService } from './nstbalanceinput.service';
import { INstbalanceinput } from './nstbalanceinput';

@Injectable()
export class NstbalanceinputResolverService implements Resolve<INstbalanceinput> {

  constructor(private nstbalanceinputService: NstbalanceinputService,
    private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INstbalanceinput> {
      // tslint:disable-next-line:prefer-const
      let id = route.paramMap.get('id');
      return this.nstbalanceinputService.getBalance(id).pipe(
              map(balance => {
          if (balance) {
              return balance;
          }
          console.log(`balance was not found: ${id}`);
          this.router.navigate(['/nstbalanceinputs']);
          return null;
      }),
      catchError(error => {
          console.log(`Retrieval error: ${error}`);
          this.router.navigate(['/nstbalanceinputs']);
          return of(null);
      })

      );

  }

}
