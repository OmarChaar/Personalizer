import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
  pure: true
})
export class CurrencyPipe implements PipeTransform {

  constructor() {}

  transform(price: any) {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    return formatter.format(price);
  }

}
