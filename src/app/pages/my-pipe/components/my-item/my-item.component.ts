import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-my-item',
    imports: [],
    templateUrl: './my-item.component.html',
    styleUrl: './my-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyItemComponent implements OnInit {
  @Input({ required: true }) public name = '';

  public ngOnInit(): void {
    // interval(1000)
    //   .pipe(take(5))
    //   .subscribe((x) => {
    //     console.log(`My Item xxx init ${x}`);
    //     this.name = `name: ${x}`;
    //     this.cdr.markForCheck();
    //   });
  }

  // public checkRender(): boolean {
  //   console.log('log boolean');
  //   return true;
  // }
}
