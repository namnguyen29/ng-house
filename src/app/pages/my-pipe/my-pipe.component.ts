import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';

import {
  concatMap,
  debounceTime,
  distinctUntilChanged,
  exhaustMap,
  fromEvent,
  interval,
  mergeMap,
  Observable,
  startWith,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap
} from 'rxjs';

import { MyItemComponent } from './components';
import { AddressLike, Author } from '@app-shared/interfaces';
import { FormatAddressPipe } from '@app-shared/pipes';
import { AuthorsService } from '@app-shared/services';

@Component({
  selector: 'app-my-pipe',
  standalone: true,
  imports: [MyItemComponent, DatePipe, FormatAddressPipe, JsonPipe, AsyncPipe, ReactiveFormsModule],
  templateUrl: './my-pipe.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyPipeComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly authorService = inject(AuthorsService);
  private readonly destroy$ = new Subject<void>();
  public nameControl = this.fb.control('');
  public today = new Date();
  public user: AddressLike = {
    name: 'Nam Ng',
    address: 'DaNano',
    age: 28,
    country: 'vn'
  };
  public loadingSignal = signal(false);
  public authors$!: Observable<Author[]>;

  public ngOnInit(): void {
    fromEvent(document, 'click').pipe(switchMap(() => interval(1000).pipe(take(5))));
    fromEvent(document, 'click').pipe(mergeMap(() => interval(1000).pipe(take(5))));
    fromEvent(document, 'click').pipe(concatMap(() => interval(1000).pipe(take(5))));
    fromEvent(document, 'click').pipe(exhaustMap(() => interval(1000).pipe(take(5))));

    this.authors$ = this.nameControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.loadingSignal.set(true)),
      startWith(''),
      switchMap((param) => {
        return this.authorService.getAuthors(param).pipe(tap(() => this.loadingSignal.set(false)));
      }),
      takeUntil(this.destroy$)
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

/**
 * swithcMap - for read data, only have 1 subscription, unsubscribe inner obs if you have new outer observable
 * mergeMap - for write data, store all
 * concatMap - run in order
 * exhaustMap - rate limiting
 */
