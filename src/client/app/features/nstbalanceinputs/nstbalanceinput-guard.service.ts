import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { NstbalanceinputEditComponent } from '../nstbalanceinputs/nstbalanceinput-edit/nstbalanceinput-edit.component';
import { DialogService } from '../../dialog.service';
@Injectable()
export class NstbalanceinputGuardService implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}

@Injectable()
export class NstbalanceinputDetailGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean  {
const id = route.url[1].path;
if ( id === undefined || id === null) {
  alert('Invalid balance sheet Id');
   // start a new navigation to redirect to list page
  this.router.navigate(['/nstbalanceinputs']);

return false;
}


return  true;
}

}

@Injectable()
export  class NstbalanceinputEditGuard implements CanDeactivate<NstbalanceinputEditComponent> {
  constructor(
    public dialogService: DialogService) { }

    canDeactivate(component: NstbalanceinputEditComponent): Observable<boolean> | Promise<boolean> | boolean {
        if (component.nstbalanceinputForm.dirty) {
            const intitulCompte = component.nstbalanceinputForm.get('IntitulCompte').value || 'New Balance';
            return this.dialogService.confirm(`Navigate away and lose all changes to ${intitulCompte}?`);
        }
        return true;
    }
}
