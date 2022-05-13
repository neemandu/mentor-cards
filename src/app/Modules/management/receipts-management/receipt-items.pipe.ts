import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'receiptItems'
})
export class ReceiptItemsPipe implements PipeTransform {

  transform(items: any[]): unknown {
    return items.map(item => item.itemName).join(',');
  }

  //https://stackoverflow.com/questions/39007130/the-pipe-could-not-be-found-angular2-custom-pipe
}
