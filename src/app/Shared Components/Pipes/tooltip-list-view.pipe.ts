import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tooltipListView'
})
export class TooltipListViewPipe implements PipeTransform {

  transform(value: any[]): unknown { 
    return value.join(', ');
  }

}
