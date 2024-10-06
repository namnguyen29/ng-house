import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TabsComponent } from './components';

@Component({
  selector: 'app-fragments',
  standalone: true,
  imports: [NgTemplateOutlet, TabsComponent],
  templateUrl: './fragments.component.html',
  styleUrl: './fragments.component.scss'
})
export class FragmentsComponent {
  public counter = 0;
  public navigations = ['Profile', 'Dashboard', 'Setting', 'Contact'];
}
