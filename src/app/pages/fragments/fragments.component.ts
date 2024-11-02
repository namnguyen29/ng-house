import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
  distinctUntilChanged,
  // zip,
  // filter,
  // startWith,
  // first,
  // last,
  // find,
  // single,
  // take,
  // takeLast,
  // skip,
  // distinct,
  // distinctUntilKeyChanged,
  withLatestFrom,
  forkJoin,
  combineLatest,
  concat,
  finalize,
  endWith,
  pairwise,
  catchError,
  retry,
  defaultIfEmpty,
  throwIfEmpty,
  every,
  first,
  // iif,
  defer
} from 'rxjs';
import { NodeEventHandler } from 'rxjs/internal/observable/fromEvent';

import { TabsComponent } from './components';

@Component({
  selector: 'app-fragments',
  standalone: true,
  imports: [NgTemplateOutlet, TabsComponent],
  templateUrl: './fragments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
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
      next: (value: unknown) => console.log('next value::', value),
      error: (error: unknown) => console.error('error obs::', error),
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

    //forkJoin - emit all value when all outer observable emit
    forkJoin([of('x'), of('y'), of('z')]);

    //combineLatest  - emit state when at least one outer observable emit
    // use combineLatest to combine state from store
    combineLatest([of('x'), of('y'), interval$]);

    // zip
    //    zip(of(1, 2, 3), of(4, 5, 6), of(7, 8, 9)).subscribe(observer);

    // contact - merge, concat will emit value IN ORDER
    concat(of(4, 5, 6).pipe(delay(1000)), of(1, 2, 3));

    // startWith
    of('world').pipe(
      //startWith('Hello'),
      endWith('Hello'),
      finalize(() => console.log('final'))
    );

    // test withLatestFrom, combine outer observable with another observable
    // use in NgRx
    fromEvent(document, 'click').pipe(withLatestFrom(interval$));

    // pairwise
    from([5, 2, 125, 1, 0]).pipe(pairwise());

    forkJoin([
      of(1),
      of(2),
      throwError(() => new Error('error')).pipe(
        catchError((x) => {
          this.logSentryError();
          // if you want to handle error when subscribe obs -> throwError
          return of(() => x.message);
        })
      )
    ]);

    const cached = [4, 5];
    of(1, 2, 3, 4, 5).pipe(
      map((n) => {
        if (cached.includes(n)) {
          throw new Error('Duplicated: ' + n);
        }
        return n;
      }),
      retry(3)
    );

    //defaultIfEmpty, throwIfEmpty
    of().pipe(delay(2000), defaultIfEmpty('default value'));
    of().pipe(
      delay(2000),
      throwIfEmpty(() => 'default value') // throw in the error phase
    );

    of(1, 2, 4, 5, 10).pipe(every((x) => x >= 0));
    // some() in rxjs, like array some
    of(1, 2, 4, 5, 1000).pipe(
      first((x) => x > 20, false),
      map((y) => Boolean(y))
    );

    const id = null;
    const updateObservable = (id: number | null) => {
      if (id === null) {
        throw new Error('oops, wrong!');
      }
      return of(`update ${id}::`);
    };
    const removeObservable = (id: number | null) => of(`remove ${id}`);
    // best practice, use defer to make sure everything will run
    // iif(() => id !== null, updateObservable(id), removeObservable(id));
    defer(() => (id !== null ? updateObservable(id) : removeObservable(id))).subscribe(observer);
  }

  private logSentryError(): void {
    console.error('log logSentryError');
  }
}
