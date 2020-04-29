import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate,
   CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
// tslint:disable-next-line:max-line-length
import { NttcomptebalanceEditComponent } from '../nttcomptebalance/nttcomptebalance-edit/nttcomptebalance-edit.component';
import { DialogService } from '../../dialog.service';

@Injectable({
  providedIn: 'root'
})
export class NttcomptebalanceGuard implements CanActivate, CanActivateChild, CanLoad {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}



@Injectable()
export class NttComptebalancedetailsDetailGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean  {
const id = route.url[1].path;
if ( id === undefined || id === null) {
  alert('Invalid balance sheet Id');
   // start a new navigation to redirect to list page
  this.router.navigate(['/nttcomptebalances']);

return false;
}


return  true;
}

}

/* @Injectable()
export  class NttcomptebalancedetailEditGuard implements CanDeactivate<NttcomptebalanceEditComponent> {
  constructor(
    public dialogService: DialogService) { }

    canDeactivate(component: NttcomptebalanceEditComponent): Observable<boolean> | Promise<boolean> | boolean {
        if (component.nttcomptebalanceForm.dirty) {
            const intitulCompte = component.nttcomptebalanceForm.get('IntitulCompte').value || 'New Balance';
            return this.dialogService.confirm(`Navigate away and lose all changes to ${intitulCompte}?`);
        }
        return true;
    }
}
 */
