import { TestBed, inject, async} from '@angular/core/testing';
import { NstbalanceinputService } from './nstbalanceinput.service';
import { MessageService } from '../../messages/message.service';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { INstbalanceinput } from './nstbalanceinput';
import { asyncData, asyncError } from '../../../testing/async-observable-helpers';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

describe('NstbalanceinputService', () => {


let httpClientSpy: { get: jasmine.Spy };
// tslint:disable-next-line:prefer-const
let  messageservice: MessageService;
// tslint:disable-next-line:prefer-const
let httpErrorSpy:  HttpErrorHandler;
let nstbalanceinputService: NstbalanceinputService;
beforeEach(() => {
  // TODO: spy on other methods too
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  nstbalanceinputService = new NstbalanceinputService(<any> httpClientSpy, messageservice, httpErrorSpy);
});


it('should return expected nstbalanceinputs (HttpClient called once)', () => {
  const expectednstbalanceinput: INstbalanceinput[] =
    [{
      'id' : '5cf07c9cbe774e15dcd8cb4b',
      'NumCompte' : '235100',
      'IntitulCompte' : 'Amenagement de Bureau',
      'SoldeCredit' : 0,
      'SoldeDebit' : 6965000,
     // 'CreatedOn' : '2019-05-31'
     // 'ModifiedOn' : '2019-05-31T01:00:12.119Z',
      'CreatedBy' : 'Admin',
      'ModifiedBy' : 'Admin',
},
{
      'id' : '5cf07c9cbe774e15dcd8cb4c',
      'NumCompte' : '238000',
      'IntitulCompte' : 'Autres Aménag. Instal.',
      'SoldeCredit' : 0,
      'SoldeDebit' : 65869007,
    //  'CreatedOn' : ('2019-05-31T01:00:12.119Z'),
    //  'ModifiedOn' : ('2019-05-31T01:00:12.119Z'),
      'CreatedBy' : 'Admin',
      'ModifiedBy' : 'Admin',
 //     '__v' : 0
}];

  httpClientSpy.get.and.returnValue(asyncData(expectednstbalanceinput));

  nstbalanceinputService.getBalancesInput$.subscribe(
    nstbalanceinputs => expect(nstbalanceinputs).toEqual(expectednstbalanceinput, 'expected nstbalanceinputs'),
    fail
  );
  expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
});

it('should return an error when the server returns a 404', () => {
  const errorResponse = new HttpErrorResponse({
    error: 'test 404 error',
    status: 404, statusText: 'Not Found'
  });

  httpClientSpy.get.and.returnValue(asyncError(errorResponse));

  nstbalanceinputService.getBalancesInput$.subscribe(
    nstbalanceinputs => fail('expected an error, not nstbalanceinputs'),
    error  => expect(error.message).toContain('test 404 error')
  );
});
});
