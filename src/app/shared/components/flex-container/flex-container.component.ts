import { Component, HostBinding, Input } from '@angular/core';

import { FlexDirection } from '@app-shared/interfaces';

@Component({
    selector: 'app-flex-container',
    imports: [],
    templateUrl: './flex-container.component.html',
    styleUrl: './flex-container.component.scss'
})
export class FlexContainerComponent {
  @Input() flexDirection: FlexDirection = 'row';

  @HostBinding('style.display') get display(): string {
    return 'flex';
  }

  @HostBinding('style.border') get border(): string {
    return '1px solid #7d11e2';
  }

  @HostBinding('style.flex-direction') get direction(): FlexDirection {
    return this.flexDirection;
  }
}
