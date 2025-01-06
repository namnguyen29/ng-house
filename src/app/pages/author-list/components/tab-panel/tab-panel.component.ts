import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  inject,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { TabGroupComponent } from '../tab-group/tab-group.component';
import { TabContentDirective } from '@app-shared/directives';

@Component({
  selector: 'app-tab-panel',
  templateUrl: './tab-panel.component.html',
  styleUrl: './tab-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabPanelComponent implements OnInit, OnDestroy {
  private readonly tabGroup = inject(TabGroupComponent);
  @Input({ required: true }) public title = '';
  @ViewChild(TemplateRef, { static: true }) public panelBody!: TemplateRef<unknown>;
  /**
   * Read TemplateRef with Directive
   */
  @ContentChild(TabContentDirective, { static: true, read: TemplateRef })
  public explicitBody!: TabContentDirective;

  public ngOnInit(): void {
    console.log(this.explicitBody);
    this.tabGroup.addTab(this);
  }

  public ngOnDestroy(): void {
    this.tabGroup.removeTab(this);
  }
}
