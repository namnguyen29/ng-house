import { Component } from '@angular/core';

let _count = 1;
@Component({
  selector: 'app-counter',
  standalone: true,
  template: `<p>count: {{ count }}</p>`
})
export class CounterComponent {
  public count = _count++;
}
