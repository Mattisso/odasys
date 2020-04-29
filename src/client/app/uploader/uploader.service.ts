import { Injectable } from '@angular/core';
import {
  HttpClient, HttpEvent, HttpEventType, HttpProgressEvent,
  HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';

import { MessageService } from '../messages/message.service';
import { environment } from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
 //   'Authorization': 'my-auth-token'
  })
};



@Injectable()
export class UploaderService {
  apiUrl = environment.apiUrl;
  constructor(
  private http: HttpClient,
    private messageService: MessageService ) {}
  uploadUrl =  `${this.apiUrl}/api/file`; // 'odaupload';
  // If uploading multiple files, change to:
  // upload(files: FileList) {
  //   const formData = new FormData();
  //   files.forEach(f => formData.append(f.name, f));
  //   new HttpRequest('POST', '/upload/file', formData, {reportProgress: true});
  //   ...
  // }

upload(file: File) {
  const url = `${this.apiUrl}/api/file/upload`;
  const _formData: FormData = new FormData();
      _formData.append('file', file);

    if (!file) { return; }
    // tslint:disable-next-line:prefer-const
    let headers = new HttpHeaders();
   headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // COULD HAVE WRITTEN:
     return this.http.post(url, _formData, {
    headers: headers,
      reportProgress: true,
    //  responseType: 'text',
    observe: 'events'
     }).pipe(

    // Create the request object that POSTs the file to an upload endpoint.
    // The `reportProgress` option tells HttpClient to listen and return
    // XHR progress events.
/*     const req = new HttpRequest('POST', this.uploadUrl, file, {
      reportProgress: true
    }); */

    // The `HttpClient.request` API produces a raw event stream
    // which includes start (sent), progress, and response events.

      map(event => this.getEventMessage(event, file)),
      tap(message => this.showProgress(message)),
      last(), // return last (completed) message to caller
      catchError(this.handleError(file))
    );
  }

  getFiles(): Observable<any> {
    const url = `${this.apiUrl}/all`;
    return this.http.get<any>(url);
  }

  /** Return distinct message for sent, upload progress, & response events */
  private getEventMessage(event: HttpEvent<any> , file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;

      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / event.total);
        return `File "${file.name}" is ${percentDone}% uploaded.`;

      case HttpEventType.Response:
        return `File "${file.name}" was completely uploaded!`;

      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }
   private handleError(file: File) {
    const userMessage = `${file.name} upload failed.`;

    return (error: HttpErrorResponse) => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      const message = (error.error instanceof Error) ?
        error.error.message :
       `server returned code ${error.status} with body "${error.error}"`;

      this.messageService.addMessage(`${userMessage} ${message}`);

      // Let app keep running but indicate failure.
      return of(userMessage);
    };
  }

  private showProgress(message: string) {
  this.messageService.addMessage(message);
}
}
