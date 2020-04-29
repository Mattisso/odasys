import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {map,  catchError} from 'rxjs/operators';

import { NttcomptebalancedetailService } from './nttcomptebalancedetail.service';
import { INttcomptebalancedetail } from './nttcomptebalancedetail';


@Injectable({
  providedIn: 'root'
})
export class NttcomptebalancedetailResolverService {
  constructor(private nttcomptebalancedetailservice: NttcomptebalancedetailService,
    private router: Router) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INttcomptebalancedetail> {
    // tslint:disable-next-line:prefer-const
    let id = route.paramMap.get('id');
    return this.nttcomptebalancedetailservice.getcompteDetail(id).pipe(
            map(balance => {
        if (balance) {
            return balance;
        }
        console.log(`balance was not found: ${id}`);
        this.router.navigate(['/nttcomptebalancedetails']);
        return null;
    }),
    catchError(error => {
        console.log(`Retrieval error: ${error}`);
        this.router.navigate(['/nttcomptebalancedetails']);
        return of(null);
    })

    );

}}
