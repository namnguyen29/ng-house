import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TabPanelComponent } from '..';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-tab-group',
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './tab-group.component.html',
  styleUrl: './tab-group.component.scss'
})
export class TabGroupComponent {
  @Input() public activeIndex = 0;
  @Output() public activeIndexChange = new EventEmitter<number>();
  public tabPanelList: TabPanelComponent[] = [];

  public addTab(tab: TabPanelComponent): void {
    this.tabPanelList = [...this.tabPanelList, tab];
  }

  public removeTab(tab: TabPanelComponent): void {
    let found = -1;
    this.tabPanelList = this.tabPanelList.filter((tabPanel, index) => {
      if (tabPanel === tab) {
        found = index;
        return false;
      }
      return true;
    });

    if (found === this.activeIndex) {
      this.activeIndexChange.emit(found === this.tabPanelList.length ? found - 1 : found);
    }
  }

  public changeTab(index: number): void {
    console.log('change');
    this.activeIndexChange.emit(index);
  }
}
