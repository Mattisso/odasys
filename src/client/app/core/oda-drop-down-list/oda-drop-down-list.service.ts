import { Injectable } from '@angular/core';
import {IddlOExerComptable, IddlOtableauposteByYear, IddlOreferenceByear} from './oda-drop-down-list';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { OexccomptaService } from '../../models/oexerccomptas/oexccompta.service';
import { OreferenceService } from '../../models/oreferences/oreference.service';
import { OtableauposteService } from '../../models/otableaupostes/otableauposte.service';
import { MessageService } from '../../messages/message.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, shareReplay, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class OdaDropDownListService {
  ddlExercComptas: IddlOExerComptable[];
  private oexercComptaUrl = this.oexccomptaservice.oexercComptaUrl;
  private oreferenceUrl = this.oreferenceservice.oreferenceUrl;
  private otableauposteUrl = this.otableauposteservice.otableauposteUrl;
  private handleError: HandleError;
  oexcercompteSelectedSubject = new BehaviorSubject<string>('0');
  oexcercompteSelectedAction$ = this.oexcercompteSelectedSubject.asObservable();
  oreferenceSelectedSubject = new BehaviorSubject<string>('0');
  oreferenceSelectedAction$ = this.oreferenceSelectedSubject.asObservable();
  otableauposteSelectedSubject = new BehaviorSubject<string>('0');
  otableauposteSelectedAction$ = this.otableauposteSelectedSubject.asObservable();

    // All getOexccomptas
    ddloexerccompta$ =  this.http.get<IddlOExerComptable[]>(`${this.oexercComptaUrl}/v1/DropDownListexerComptable`)
    .pipe(
      tap(data => console.log('exercComptas', JSON.stringify(data))),
      shareReplay(1),
      catchError(this.handleError)
      );

      ddlOreferenceByear$ = this.http.get<IddlOreferenceByear[]>(`${this.oreferenceUrl}/v2/ddlreferencebyotableauposteVM`)
      .pipe(
        tap(data => this.log(`getOreferences:   ${JSON.stringify(data)}`)),
        shareReplay(1),
       catchError(this.handleError)
      );
      ddlOtableauposteByYear$ = this.http.get<IddlOtableauposteByYear[]>(`${this.otableauposteUrl}/v1/ddlotableauposteWithcomptebalances`)
      .pipe(
        tap(data => this.log(`getOtableauposts:   ${JSON.stringify(data)}`)),
        shareReplay(1),
        catchError(this.handleError)
      );

      private log(message: string) {
        this.messageService.addMessage(`OdaDropDownListService: ${message}`);
      }
      constructor(private http: HttpClient,
        private messageService: MessageService,
        private oexccomptaservice: OexccomptaService,
        private oreferenceservice: OreferenceService,
        private otableauposteservice: OtableauposteService,
        httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('OdaDropDownListService');
      }
}


  // All getOexccomptas
