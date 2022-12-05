import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { IOtableauposte } from '../otableauposte';
import { OtableauposteService } from '../otableauposte.service';
import { Observable, Subject, EMPTY, combineLatest } from 'rxjs';
import { debounceTime, merge, share, map, startWith, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-otableauposte-list',
  templateUrl: './otableauposte-list.component.html',
  styleUrls: ['./otableauposte-list.component.css']
})
export class OtableauposteListComponent implements OnInit {
  pageTitle = 'Otableaupost List';
  listFilter: string;
// errorMessage: string;
  selectedId: string;
  filterForm: FormGroup;
  pageUrl = new Subject<string>();
  isLoading = true;
  showSearch = true;
  config: any;
  // balances: any = [];
   balances: IOtableauposte[];
  constructor(private otableauposteService: OtableauposteService,
    private route: ActivatedRoute, private router: Router) {

     }
      private errorMessageSubject= new Subject<string>();
      
      errorMessage$= this.errorMessageSubject.asObservable();
      otableauposteQuey$=this.otableauposteService.getOtableaupostes$.pipe(
        catchError(err=>{
          this.errorMessageSubject.next(err);
          return EMPTY;
        })
      )
      selectedotableauposte$=this.otableauposteService.selectedotableauPoste$;
      vm$=combineLatest([this.otableauposteQuey$,this.selectedotableauposte$])
      .pipe(map(([otableaupostes,otableauposte]:[IOtableauposte[],IOtableauposte])=>({
        otableaupostes, otableauposteId:otableauposte?otableauposte.id:'0'})
        ));

        onSelected( otableauposteId:string):void{
          this.otableauposteService.selectedotableauPosteChanged(otableauposteId)
        }
        ngOnInit() {
    this.config = {
      currentPage: 1,
      itemsPerPage: 10
  };

    this.route.queryParamMap.pipe(
      map(params => params.get('page'))
    )
    .subscribe(page => this.config.currentPage = page);
   // this.getOtableaupostes();

  }
/*
getOtableaupostes(): void {
this.balances = [];
    this.otableauposteService.getOtableaupostes()
    .subscribe(balances => this.balances = balances,
      error =>  this.errorMessage = <any>error,
      () => this.isLoading = false);
    } */
    //  error => this.errorMessage = <any>error);


    search(searchTerm: string) {
   //   this.editHero = undefined;
      if (searchTerm) {
        this.otableauposteService.searchotableaupostes(searchTerm)
          .subscribe(balances => this.balances = balances);
      }
    }

    toggleSearch() { this.showSearch = !this.showSearch; }

    pageChange(newPage: number) {
      this.router.navigate(['otableaupostes'], { queryParams: { page: newPage } });
    }


}
