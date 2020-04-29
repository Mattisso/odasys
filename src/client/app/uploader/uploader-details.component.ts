import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-uploader-details',
  templateUrl: './uploader-details.component.html',
  styleUrls: ['./uploader-details.component.css']
})
export class UploaderDetailsComponent implements OnInit {
  @Input() fileUpload: string;


  constructor() { }

  ngOnInit() {
  }

}
