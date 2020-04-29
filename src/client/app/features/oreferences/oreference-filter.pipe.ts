import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'oreferenceFilter'
})
export class OreferenceFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
