import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogService } from '../../dialog.service';
import { OreferenceEditComponent } from './oreference-edit/oreference-edit.component';


@Injectable({
  providedIn: 'root'
})
export class OreferenceGuardService implements CanActivate {
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
  this.router.navigate(['/oreferences']);

return false;
}


return  true;
}

}

@Injectable()
export  class OexccomptaEditGuard implements CanDeactivate<OreferenceEditComponent> {
  constructor(
    public dialogService: DialogService) { }

    canDeactivate(component: OreferenceEditComponent): Observable<boolean> | Promise<boolean> | boolean {
        if (component.oreferenceForm.dirty) {
            const refcode = component.oreferenceForm.get('RefCode').value || 'New RefCode';
            return this.dialogService.confirm(`Navigate away and lose all changes to ${refcode}?`);
        }
        return true;
          }
        }
