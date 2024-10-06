import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { ProgressBarComponent, ToggleComponent } from './components';
import { FlexContainerComponent } from '@app-shared/components';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    FormsModule,
    ProgressBarComponent,
    ToggleComponent,
    CommonModule,
    FlexContainerComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements AfterViewInit, OnInit, OnDestroy {
  private readonly _destroy$ = new Subject<void>();
  @ViewChildren(ToggleComponent) public toggleCmp!: QueryList<ToggleComponent>;
  @ViewChild('myTmpl') myTmpl!: TemplateRef<HTMLParagraphElement>;
  @ViewChild('inputCmp', {
    static: true
    // read: ElementRef
  })
  public inputCmp!: ElementRef<HTMLInputElement>;
  public user = {
    name: 'Nam',
    age: 40
  };
  public modelName = '';
  public isChecked = false;
  public isChecked2 = true;
  public isLast = true;

  public ngOnInit(): void {
    this.inputCmp.nativeElement.focus();
  }

  public ngAfterViewInit(): void {
    console.log('myTmpl::', this.myTmpl);
    this.toggleCmp.changes.pipe(takeUntil(this._destroy$)).subscribe((x) => {
      console.log(x);
    });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public setName(): void {
    this.modelName = 'Go away!';
  }

  public increase(): void {
    this.user.age += 1;
  }

  public decrease(): void {
    this.user.age -= 1;
  }
}
