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



@Pipe({
  name: 'lineBreak'
 })
 export class LineBreakPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value.replace(/,|\. /g, match => match.trim() + '<br />');
  }
 }
 
