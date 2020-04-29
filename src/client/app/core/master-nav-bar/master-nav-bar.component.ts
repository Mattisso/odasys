import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master-nav-bar',
  templateUrl: './master-nav-bar.component.html',
  styleUrls: ['./master-nav-bar.component.css']
})
export class MasterNavBarComponent implements OnInit {
  pageTitle = '';
  constructor() { }

  ngOnInit() {
  }

}
