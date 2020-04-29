import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { NstbalanceEditComponent } from './nstbalance-edit/nstbalance-edit.component';
import { DialogService } from '../../dialog.service';

@Injectable()
@Injectable({
  providedIn: 'root'
})
export class NstbalanceGuardService implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}

@Injectable()
export class NstbalanceDetailGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean  {
const id = route.url[1].path;
if ( id === undefined || id === null) {
  alert('Invalid balance sheet Id');
   // start a new navigation to redirect to list page
  this.router.navigate(['/nstbalances']);

return false;
}


return  true;
}

}

@Injectable()
export  class NstbalanceEditGuard implements CanDeactivate<NstbalanceEditComponent> {
  constructor(
    public dialogService: DialogService) { }

    canDeactivate(component: NstbalanceEditComponent): Observable<boolean> | Promise<boolean> | boolean {
        if (component.nstbalanceForm.dirty) {
            const intitulCompte = component.nstbalanceForm.get('IntitulCompte').value || 'New Balance';
            return this.dialogService.confirm(`Navigate away and lose all changes to ${intitulCompte}?`);
        }
        return true;
    }
}
