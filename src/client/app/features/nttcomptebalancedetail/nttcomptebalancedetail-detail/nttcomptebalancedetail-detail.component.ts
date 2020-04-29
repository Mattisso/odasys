
import { Component, OnInit, HostBinding } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import { INttcomptebalancedetail } from '../nttcomptebalancedetail';
import { NttcomptebalancedetailService } from '../nttcomptebalancedetail.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {slideInAnimation} from '../../../animations';


@Component({
  selector: 'app-nttcomptebalancedetail-detail',
  templateUrl: './nttcomptebalancedetail-detail.component.html',
  styleUrls: ['./nttcomptebalancedetail-detail.component.css']
})
export class NttcomptebalancedetailDetailComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

    pageTitle = 'Balance Sheet Detail';
    balanceDetail: INttcomptebalancedetail | undefined;
    balanceDetails$: Observable<INttcomptebalancedetail>;
    errorMessage: string;
  constructor(private nttcomptebalancedetailService: NttcomptebalancedetailService,
    private router: Router,
    private route: ActivatedRoute) { }


    ngOnInit(): void {
      this.balanceDetails$ = this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
      this.nttcomptebalancedetailService.getcompteDetail(params.get('id')))
      );

/*   let id = this.route.snapshot.paramMap.get['id'];
 this.balanceDetail$= this.getBalance(id); */

    }
    getBalance(id: string) {
      this.nttcomptebalancedetailService.getcompteDetail(id).subscribe(
        balanceDetail => this.balanceDetail = balanceDetail,
        error => this.errorMessage = <any>error);
    }

    getBalances(balanceDetail: INttcomptebalancedetail) {
      // tslint:disable-next-line:prefer-const
      let  balanceDetailId = balanceDetail ? balanceDetail.id : null;

      this.router.navigate(['/nttcomptebalancedetails', {id: balanceDetailId}]);
    }


}
