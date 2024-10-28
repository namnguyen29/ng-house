import { Component, OnInit } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TabsComponent } from './components';

import { defer, fromEventPattern, map, of, throwError } from 'rxjs';
import { NodeEventHandler } from 'rxjs/internal/observable/fromEvent';

@Component({
  selector: 'app-fragments',
  standalone: true,
  imports: [NgTemplateOutlet, TabsComponent],
  templateUrl: './fragments.component.html',
  styleUrl: './fragments.component.scss'
})
export class FragmentsComponent implements OnInit {
  public counter = 0;
  public navigations: Array<string> = ['Profile', 'Dashboard', 'Setting', 'Contact'];

  public ngOnInit(): void {
    const observer = {
      next: (value: unknown) => console.log(value),
      error: (error: unknown) => console.log(error),
      complete: () => console.log('complete')
    };
    // convert promise to observable
    // from(Promise.resolve('What happened')).subscribe(this.observer);
    // fromEvent(document, 'mousemove').pipe(throttleTime(1000)).subscribe(observer);

    const addClickHandler = (handler: NodeEventHandler) =>
      document.addEventListener('click', handler);
    const removeClickHandler = (handler: NodeEventHandler) =>
      document.removeEventListener('click', handler);
    fromEventPattern<PointerEvent>(addClickHandler, removeClickHandler).pipe(map((x) => x.offsetX));

    throwError(() => new Error('catch my error'));

    // run when observable has new subscribe
    const random$ = defer(() => of(Math.random()));
    random$.subscribe(observer);
    random$.subscribe(observer);
    random$.subscribe(observer);
  }
}
