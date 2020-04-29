import { Component, OnInit } from '@angular/core';
import { UploaderService } from './uploader.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  providers: [ UploaderService ],
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {
  public get uploaderService(): UploaderService {
    return this._uploaderService;
  }
  public set uploaderService(value: UploaderService) {
    this._uploaderService = value;
  }
  message: string;
  selectedFiles: FileList;
  currentFileUpload: File;
  filesToUpload: File;
  constructor(private _uploaderService: UploaderService) {}

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
}

onUpload() {
  this.currentFileUpload = this.selectedFiles.item(0);

  this.uploaderService.upload(this.currentFileUpload).subscribe(
    msg => {
// input.value = null;
this.message = msg;
}
);
    /*  .map((res: Response) => res.json()).subscribe(
       (success) => {
               alert(success._body);
      },
      (error) => alert(error));*/

}

/*   onPicked(input: HTMLInputElement) {
    const file = input.files[0];
    if (file) {
    this.uploaderService.upload(file).subscribe(
                 msg => {
        //  input.value = null;
          this.message = msg;
        }
      );
    }
  } */

  ngOnInit() {
  }

}
