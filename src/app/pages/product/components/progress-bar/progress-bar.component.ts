import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-progress-bar',
    imports: [],
    templateUrl: './progress-bar.component.html',
    styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent implements OnInit {
  //, OnChanges
  /**
   * You can use setter getter or OnChanges to config Input value
   */
  private _progress = 0;
  @Input() public backgroundColor = '';
  @Input() public progressColor = '';
  @Input() public get progress(): number {
    return this._progress;
  }

  public set progress(value: number) {
    if (typeof value !== 'number') {
      const progress = Number(value);
      if (Number.isNaN(progress)) {
        this._progress = 0;
      } else {
        this._progress = progress;
      }
    } else {
      this._progress = value;
    }
  }

  // public ngOnChanges(changes: SimpleChanges): void {
  //   console.log('ngOnChanges::', changes);
  //   if ('progress' in changes) {
  //     if (typeof changes['progress'].currentValue !== 'number') {
  //       const progress = Number(changes['progress'].currentValue);
  //       if (Number.isNaN(progress)) {
  //         this.progress = 0;
  //       } else {
  //         this.progress = progress;
  //       }
  //     }
  //   }
  // }

  public ngOnInit(): void {
    //
  }
}
