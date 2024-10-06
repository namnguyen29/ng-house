import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
  @Input({ required: true }) public navigations: string[] = [];
  @Input() public linkTemplate!: TemplateRef<unknown>;
}
