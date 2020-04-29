import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {map,  catchError} from 'rxjs/operators';

import { OreferenceService } from './oreference.service';
import { IOreference, Oreference } from '././oreference';


@Injectable({
  providedIn: 'root'
})
export class OreferenceResolverService {
  constructor(private oreferenceService: OreferenceService,
    private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOreference> {
      // tslint:disable-next-line:prefer-const
      let id = route.paramMap.get('id');
      return this.oreferenceService.getOreference(id).pipe(
              map(balance => {
          if (balance) {
              return balance;
          }
          console.log(`balance was not found: ${id}`);
          this.router.navigate(['/oreferences']);
          return null;
      }),
      catchError(error => {
          console.log(`Retrieval error: ${error}`);
          this.router.navigate(['/oreferences']);
          return of(null);
      })

      );

  }
}
