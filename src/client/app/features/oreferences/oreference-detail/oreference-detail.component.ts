import { Component, OnInit, HostBinding } from '@angular/core';
import {Router, ActivatedRoute, ParamMap,NavigationExtras} from '@angular/router';

import { IOreference } from '../oreference';
import { OreferenceService } from '../oreference.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {slideInAnimation} from '../../../animations';


@Component({
  selector: 'app-oreference-detail',
  templateUrl: './oreference-detail.component.html',
  styleUrls: ['./oreference-detail.component.css']
})
export class OreferenceDetailComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

    pageTitle = 'Oreference Sheet Detail';
    balance: IOreference | undefined;
    balance$: Observable<IOreference>;
    errorMessage: string;

    constructor(private oreferenceservice: OreferenceService,
      private router: Router,
      private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.balance$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
    this.oreferenceservice.getOreference(params.get('id')))
    );

/*   let id = this.route.snapshot.paramMap.get['id'];
this.balance$= this.getOexccompta(id); */

  }
  getOreference(id: string) {
    this.oreferenceservice.getOreference(id).subscribe(
      balance => this.balance = balance,
      error => this.errorMessage = <any>error);
  }

  getOreferences(balance: IOreference) {
    // tslint:disable-next-line:prefer-const
    let  balanceId = balance ? balance.id : null;
    const redirectUrl = '/oreferences';

    let navigationExtras: NavigationExtras = {
      queryParamsHandling: 'preserve',
      preserveFragment: true
    };
    this.router.navigate([redirectUrl, {id: balanceId}],navigationExtras);
  }

}
