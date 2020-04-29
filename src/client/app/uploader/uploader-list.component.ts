import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { UploaderService } from './uploader.service';

@Component({
  selector: 'app-uploader-list',
  templateUrl: './uploader-list.component.html',
  styleUrls: ['./uploader-list.component.css']
})
export class UploaderListComponent implements OnInit {

  showFile = false;
  fileUploads: Observable<string[]>;

  constructor(private uploaderService: UploaderService) { }

  ngOnInit() {
  }


  showFiles(enable: boolean) {
    this.showFile = enable;

    if (enable) {
      this.fileUploads = this.uploaderService.getFiles();
    }
  }

}
