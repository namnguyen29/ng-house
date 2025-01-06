import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList
} from '@angular/core';
import { TabPanelComponent } from '..';
import { NgTemplateOutlet } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tab-group',
  imports: [NgTemplateOutlet],
  templateUrl: './tab-group.component.html',
  styleUrl: './tab-group.component.scss'
})
export class TabGroupComponent implements AfterContentInit, OnDestroy {
  @Input() public activeIndex = 0;
  @Output() public activeIndexChange = new EventEmitter<number>();
  @ContentChildren(TabPanelComponent) tabPanels!: QueryList<TabPanelComponent>;
  public tabPanelList: TabPanelComponent[] = [];
  private readonly destroy$ = new Subject<void>();

  public ngAfterContentInit(): void {
    this.tabPanels.changes.pipe(takeUntil(this.destroy$)).subscribe((x) => {
      console.log(x);
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

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
    this.activeIndexChange.emit(index);
  }
}
