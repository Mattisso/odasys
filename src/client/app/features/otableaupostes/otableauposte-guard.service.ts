import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogService } from '../../dialog.service';
import { OtableauposteEditComponent } from './otableauposte-edit/otableauposte-edit.component';
@Injectable({
  providedIn: 'root'
})
export class OtableauposteGuardService implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
@Injectable()
export class OexccomptaDetailGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean  {
const id = route.url[1].path;
if ( id === undefined || id === null) {
  alert('Invalid balance sheet Id');
   // start a new navigation to redirect to list page
  this.router.navigate(['/otableaupostes']);

return false;
}

return  true;
}

}

@Injectable()
export  class OexccomptaEditGuard implements CanDeactivate<OtableauposteEditComponent> {
  constructor(
    public dialogService: DialogService) { }

    canDeactivate(component: OtableauposteEditComponent): Observable<boolean> | Promise<boolean> | boolean {
        if (component.otableauposteForm.dirty) {
            const tableauname = component.otableauposteForm.get('TableauName').value || 'New TableauName';
            return this.dialogService.confirm(`Navigate away and lose all changes to ${tableauname}?`);
        }
        return true;
          }
        }
