import { Component, OnInit } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import {
  delay,
  fromEventPattern,
  map,
  merge,
  of,
  reduce,
  scan,
  throwError,
  buffer,
  interval,
  fromEvent,
  bufferTime,
  from,
  filter,
  first,
  last,
  find,
  single,
  take,
  takeLast,
  skip,
  distinct,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  withLatestFrom
} from 'rxjs';
import { NodeEventHandler } from 'rxjs/internal/observable/fromEvent';

import { TabsComponent } from './components';

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
  public users = [
    {
      id: 1,
      firstName: 'Nam',
      lastName: 'Nguyen',
      email: 'nam@example.com',
      amount: 4005
    },
    {
      id: 2,
      firstName: 'Tuấn',
      lastName: 'Tran',
      email: 'tuan@example.com',
      amount: 4000
    }
  ];

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
    //const random$ = defer(() => of(Math.random()));
    // random$.subscribe(observer);
    // random$.subscribe(observer);
    // random$.subscribe(observer);

    merge(of(this.users[0]).pipe(delay(2000)), of(this.users[1]).pipe(delay(4000))).pipe(
      map((user) => ({
        ...user,
        fullName: `${user.firstName} ${user.lastName}`
      }))
    );

    const queryParams$ = of({ param: 'uwu' });
    queryParams$.pipe(map((x) => x.param));

    // reduce, same with array reduce, emit value when all observable emit value
    merge(of(this.users[0]).pipe(delay(2000)), of(this.users[1]).pipe(delay(4000))).pipe(
      reduce((acc, curr) => acc + curr?.amount, 0)
    );

    // buffer, store value until the closing notifier emit
    const interval$ = interval(1000);
    const click$ = fromEvent(document, 'click');
    interval$.pipe(buffer(click$));

    // bufferTime, emit buffer value after x seconds
    interval$.pipe(bufferTime(2000));

    // scan vs reduce
    merge(of(this.users[0]).pipe(delay(2000)), of(this.users[1]).pipe(delay(4000))).pipe(
      scan((acc, curr) => acc + curr?.amount, 0)
    );

    // filter
    of(
      { age: 4, name: 'Foo' },
      { age: 4, name: 'DFoo' },
      { age: 7, name: 'Bar' },
      { age: 5, name: 'Foo' }
    ).pipe(
      // single((x) => x % 2 === 0)
      /*
        single is like first, but it will throw error
        if the stream has more than 1 element that match the predicate
        */
      // find((x) => x % 2 === 0)
      //filter((x) => x > 1)
      //first()
      //last()
      // take(1) // use take(1) to get snapshot, route guard, get data at moment, interceptor
      // takeLast(1)
      // skip(1)
      //distinct() - remove  duplicate
      // debounceTime(300) => distinctUntilChanged() => to handle dynamic search
      // distinctUntilKeyChanged('name')
      distinctUntilChanged((a, b) => a.age === b.age)
    );

    // test withLatestFrom, combine outer observable with another observable
    // use in NgRx
    fromEvent(document, 'click').pipe(withLatestFrom(interval$));
  }
}
