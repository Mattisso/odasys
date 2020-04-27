import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler,
  HttpRequest, HttpResponse
} from '@angular/common/http';

import { finalize, tap, delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { MessageService } from '../messages/message.service';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private messenger: MessageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let ok: string;
    // array in local storage for registered users
    // tslint:disable-next-line:prefer-const

      return next.handle(req)

      .pipe(
        tap(
          // Succeeds when there is a response; ignore other events
          event => ok = event instanceof HttpResponse ? 'succeeded' : '',
          // Operation failed; error is an HttpErrorResponse
          error => ok = 'failed'
        ),
        // Log when response observable either completes or errors
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
          this.messenger.addMessage(msg);
        })
      )
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

  }
}
