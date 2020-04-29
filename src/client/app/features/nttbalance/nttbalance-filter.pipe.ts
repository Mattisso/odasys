import { Pipe, PipeTransform } from '@angular/core';
import { INttbalance } from './nttbalance';

@Pipe({
  name: 'nttbalanceFilter'
})
export class NttbalanceFilterPipe implements PipeTransform {

 /*  transform(value: any, args?: any): any {
    return null;
  } */
  transform(value: INttbalance[], filterBy: string): INttbalance[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((balances: INttbalance) =>
    balances.IntitulCompte.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
}

}
