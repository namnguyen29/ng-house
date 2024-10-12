import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TabGroupComponent } from '../tab-group/tab-group.component';

@Component({
  selector: 'app-tab-tw-group',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink],
  templateUrl: './tab-tw-group.component.html',
  styleUrl: './tab-tw-group.component.scss',
  providers: [
    {
      provide: TabGroupComponent,
      useExisting: TabTwGroupComponent
    }
  ]
})
export class TabTwGroupComponent extends TabGroupComponent {}
