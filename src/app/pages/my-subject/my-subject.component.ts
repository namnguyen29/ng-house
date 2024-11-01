import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  // /  share,
  shareReplay,
  interval,
  map,
  take,
  tap
  // ReplaySubject
} from 'rxjs';

@Component({
  selector: 'app-my-subject',
  standalone: true,
  imports: [],
  templateUrl: './my-subject.component.html',
  styleUrl: './my-subject.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MySubjectComponent implements OnInit {
  ngOnInit(): void {
    const createObserver = (observer: string) => ({
      next: (value: unknown) => console.log(observer, value),
      error: (error: unknown) => console.error(observer, error),
      complete: () => console.log(observer, 'complete')
    });

    // const subject = new Subject<string>();
    // subject.subscribe(createObserver('A'));
    // subject.next('hello');
    // subject.next('mai fen');
    // subject.subscribe(createObserver('B'));
    // subject.next("get both A and B - Subject doesn't store later value");

    // const behavior = new BehaviorSubject('UwU');
    // behavior.subscribe(createObserver('A'));
    // behavior.next('Again, not me 1');

    // behavior.subscribe(createObserver('B'));
    // behavior.next('Check me');

    // BehaviorSubject => Sync => store latest emitted value (last)
    // let a = 'check-sync';
    // behavior.subscribe((val) => (a = val));
    // console.log({ a });

    // const replay = new ReplaySubject<number>(3);
    // replay.subscribe(createObserver('A'));
    // replay.next(1);
    // replay.next(2);
    // replay.next(3);
    // replay.next(4);
    // replay.subscribe(createObserver('B'));
    // replay.next(5);
    // replay.next(51);
    // replay.next(52);
    // replay.next(53);
    // replay.next(54);
    // replay.next(55);

    // const asSubject = new AsyncSubject();
    // asSubject.subscribe(createObserver('A'));
    // asSubject.next(1);
    // asSubject.next(2);
    // asSubject.complete();

    const source = interval(1000).pipe(
      tap((x) => console.log('Processing: ', x)),
      map((x) => x * x),
      take(6),
      shareReplay({ bufferSize: 1, refCount: true }) // example of cache value
    );
    source.subscribe(createObserver('A'));
    source.subscribe(createObserver('B'));
  }
}
