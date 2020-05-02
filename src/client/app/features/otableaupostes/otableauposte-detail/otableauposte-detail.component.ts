import { Component, OnInit, HostBinding } from '@angular/core';
import {Router, ActivatedRoute, ParamMap,NavigationExtras} from '@angular/router';

import { IOtableauposte} from '../otableauposte';
import { OtableauposteService } from '../otableauposte.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {slideInAnimation} from '../../../animations';


@Component({
  selector: 'app-otableauposte-detail',
  templateUrl: './otableauposte-detail.component.html',
  styleUrls: ['./otableauposte-detail.component.css']
})
export class OtableauposteDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

    pageTitle = 'Otableaupost Sheet Detail';
    balance: IOtableauposte | undefined;
    balance$: Observable<IOtableauposte>;
    errorMessage: string;

    constructor(private otableauposteservice: OtableauposteService,
      private router: Router,
      private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.balance$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
    this.otableauposteservice.getOtableauposte(params.get('id')))
    );

/*   let id = this.route.snapshot.paramMap.get['id'];
this.balance$= this.getOexccompta(id); */

  }
  getOtableaupost(id: string) {
    this.otableauposteservice.getOtableauposte(id).subscribe(
      balance => this.balance = balance,
      error => this.errorMessage = <any>error);
  }

  getOtableauposts(balance: IOtableauposte) {
    // tslint:disable-next-line:prefer-const
    let  balanceId = balance ? balance.id : null;
    const redirectUrl = '/otableaupostes';

    let navigationExtras: NavigationExtras = {
      queryParamsHandling: 'preserve',
      preserveFragment: true
    };
    this.router.navigate([redirectUrl, {id: balanceId}],navigationExtras);
  }



}
