import { Pipe, PipeTransform } from '@angular/core';
import { INstbalance } from './nstbalance';

@Pipe({
  name: 'nstbalanceFilter'
})
export class NstbalanceFilterPipe implements PipeTransform {

  transform(value: INstbalance[], filterBy: string): INstbalance[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((balances: INstbalance) =>
    balances.IntitulCompte.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
}


}
