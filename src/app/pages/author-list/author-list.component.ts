import { Component } from '@angular/core';

import { AuthorDetailComponent, TabGroupComponent, TabTwGroupComponent } from './components';
import { TabPanelComponent } from './components/tab-panel/tab-panel.component';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [AuthorDetailComponent, TabGroupComponent, TabPanelComponent, TabTwGroupComponent],
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.scss'
})
export class AuthorListComponent {
  public currentIndex = 0;
}
