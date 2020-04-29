import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { NttbalanceEditComponent } from './nttbalance-edit/nttbalance-edit.component';
import { DialogService } from '../../dialog.service';

@Injectable({
  providedIn: 'root'
})
export class NttbalanceGuardService {

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}

@Injectable()
export class NttbalanceDetailGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean  {
const id = route.url[1].path;
if ( id === undefined || id === null) {
  alert('Invalid balance sheet Id');
   // start a new navigation to redirect to list page
  this.router.navigate(['/nttbalances']);

return false;
}


return  true;
}

}

@Injectable()
 export  class NttbalanceEditGuard implements CanDeactivate<NttbalanceEditComponent> {
  constructor(
    public dialogService: DialogService) { }

    canDeactivate(component: NttbalanceEditComponent): Observable<boolean> | Promise<boolean> | boolean {
        if (component.nttbalanceForm.dirty) {
            const intitulCompte = component.nttbalanceForm.get('IntitulCompte').value || 'New Balance';
            return this.dialogService.confirm(`Navigate away and lose all changes to ${intitulCompte}?`);
        }
        return true;
    }
}

