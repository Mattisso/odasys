import { Pipe, PipeTransform } from '@angular/core';
import {INttcomptebalancedetail} from './nttcomptebalancedetail';

@Pipe({
  name: 'nttcomptebalancedetailFilter'
})
export class NttcomptebalancedetailFilterPipe implements PipeTransform {

/*   transform(value: any, args?: any): any {
    return null;
  } */

  transform(value: INttcomptebalancedetail[], filterBy: string): INttcomptebalancedetail[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((balances: INttcomptebalancedetail) =>
    balances.IntitulCompte.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
}

}
