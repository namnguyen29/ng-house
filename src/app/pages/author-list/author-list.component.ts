import { Component } from '@angular/core';

import { TabGroupComponent, TabTwGroupComponent } from './components';
import { TabPanelComponent } from './components/tab-panel/tab-panel.component';
import { CounterComponent } from '@app-shared/components';
import { TabContentDirective } from '@app-shared/directives';

@Component({
  selector: 'app-author-list',
  imports: [
    TabGroupComponent,
    TabPanelComponent,
    TabTwGroupComponent,
    CounterComponent,
    TabContentDirective
  ],
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.scss'
})
export class AuthorListComponent {
  public currentIndex = 0;
  public showFinalTab = true;
}
