import { Pipe, PipeTransform } from '@angular/core';
import { AddressLike } from '@app-shared/interfaces';

@Pipe({
  name: 'formatAddress',
  standalone: true
})
export class FormatAddressPipe implements PipeTransform {
  public transform(value: AddressLike): string {
    return `${value.name}-${value.address}-${value.age}-${value.country}`;
  }
}
