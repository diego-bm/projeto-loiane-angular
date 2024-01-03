// Pipe puro: não lê as modificações feitas no material filtrado
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroArray'
})
export class FiltroArrayPipe implements PipeTransform {

  transform(value: string[], args: string): string[] {
    if (value.length === 0 || args === undefined || args === ''){
      return value;
    }

    let filter = args.toLocaleLowerCase();
    return value.filter(
      v => v.toLocaleLowerCase().indexOf(filter) != -1
    );
  }

}
