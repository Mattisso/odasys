import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { IOreference } from '../oreference';
import { OreferenceService } from '../oreference.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, merge, share, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-oreference-list',
  templateUrl: './oreference-list.component.html',
  styleUrls: ['./oreference-list.component.css']
})
export class OreferenceListComponent implements OnInit {

  pageTitle = 'Oreference List';
  listFilter: string;
  errorMessage: string;
  selectedId: string;
  filterForm: FormGroup;
  pageUrl = new Subject<string>();
  isLoading = true;
  showSearch = true;
  config: any;
  // balances: any = [];
   balances: IOreference[];
  constructor(private oreferenceService: OreferenceService,
    private route: ActivatedRoute, private router: Router) {

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
    this.getOreferences();

  }




getOreferences(): void {
this.balances = [];
    this.oreferenceService.getOreferences()
    .subscribe(balances => this.balances = balances,
      error =>  this.errorMessage = <any>error,
      () => this.isLoading = false);
    }
    //  error => this.errorMessage = <any>error);


    search(searchTerm: string) {
   //   this.editHero = undefined;
      if (searchTerm) {
        this.oreferenceService.searchoreferences(searchTerm)
          .subscribe(balances => this.balances = balances);
      }
    }

    toggleSearch() { this.showSearch = !this.showSearch; }

    pageChange(newPage: number) {
      this.router.navigate(['oexerccomptas'], { queryParams: { page: newPage } });
    }


}
