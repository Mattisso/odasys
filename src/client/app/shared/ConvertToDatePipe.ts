
import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'convertToDate'
})
export class ConvertToDatePipe implements PipeTransform {
  static today = new Date((new Date).toDateString().split(' ').slice(1).join(' '));
  datePipe: DatePipe;

  constructor(@Inject(LOCALE_ID) private locale: string) {
      this.datePipe = new DatePipe(locale);
  }
  transform(value: string | Date): string {
      if (typeof(value) === 'string') {
          value = new Date(value);
      }

      return this.datePipe.transform(value, value < ConvertToDatePipe.today ? 'shortDate' : 'fullDate');
  }
}
