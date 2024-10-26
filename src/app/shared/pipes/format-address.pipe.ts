import { Pipe, PipeTransform } from '@angular/core';
import { AddressLike } from '@app-shared/interfaces';

@Pipe({
  name: 'formatAddress',
  standalone: true
  //pure
})
export class FormatAddressPipe implements PipeTransform {
  public transform(value: AddressLike): string {
    console.log('log format all');
    return `${value.name}-${value.address}-${value.age}-${value.country}`;
  }
}
