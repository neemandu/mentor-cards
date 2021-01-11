import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tooltipListView'
})
export class TooltipListViewPipe implements PipeTransform {

  transform(value: any[]): unknown { 
    return value.join(', ');
  }

}

@Pipe({
  name: 'amountOfPacksView'
})
export class AmountOfPacksViewPipe implements PipeTransform {

  transform(value: number): unknown { 
    return value == -1? 'ללא הגבלה' : value;
  }

}
