import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {map,  catchError} from 'rxjs/operators';

import { OtableauposteService } from './otableauposte.service';
import { IOtableauposte, Otableauposte } from './otableauposte';


@Injectable({
  providedIn: 'root'
})
export class OtableauposteResolverService {
  constructor(private otableauposteService: OtableauposteService,
    private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOtableauposte> {
      // tslint:disable-next-line:prefer-const
      let id = route.paramMap.get('id');
      return this.otableauposteService.getOtableauposte(id).pipe(
              map(balance => {
          if (balance) {
              return balance;
          }
          console.log(`balance was not found: ${id}`);
          this.router.navigate(['/otableaupostes']);
          return null;
      }),
      catchError(error => {
          console.log(`Retrieval error: ${error}`);
          this.router.navigate(['/otableaupostes']);
          return of(null);
      })

      );

  }
}
