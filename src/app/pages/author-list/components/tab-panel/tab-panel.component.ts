import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { TabGroupComponent } from '../tab-group/tab-group.component';

@Component({
  selector: 'app-tab-panel',
  standalone: true,
  imports: [],
  templateUrl: './tab-panel.component.html',
  styleUrl: './tab-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabPanelComponent implements OnInit {
  private readonly tabGroup = inject(TabGroupComponent);
  @Input({ required: true }) public title = '';
  @ViewChild(TemplateRef, { static: true }) public panelBody!: TemplateRef<unknown>;

  public ngOnInit(): void {
    this.tabGroup.addTab(this);
  }
}
