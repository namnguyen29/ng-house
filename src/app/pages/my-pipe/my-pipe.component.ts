import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, JsonPipe } from '@angular/common';

import {
  concatMap,
  debounceTime,
  distinctUntilChanged,
  exhaustMap,
  finalize,
  fromEvent,
  interval,
  mergeMap,
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
  imports: [MyItemComponent, DatePipe, FormatAddressPipe, JsonPipe, ReactiveFormsModule],
  templateUrl: './my-pipe.component.html',
  styleUrl: './my-pipe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyPipeComponent implements OnInit, OnDestroy {
  private readonly cdr = inject(ChangeDetectorRef);
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
  public isLoading = false;
  public authors: Author[] = [];

  public ngOnInit(): void {
    fromEvent(document, 'click').pipe(switchMap(() => interval(1000).pipe(take(5))));
    fromEvent(document, 'click').pipe(mergeMap(() => interval(1000).pipe(take(5))));
    fromEvent(document, 'click').pipe(concatMap(() => interval(1000).pipe(take(5))));
    fromEvent(document, 'click').pipe(exhaustMap(() => interval(1000).pipe(take(5))));

    this.nameControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = true;
          this.cdr.markForCheck();
        }),
        startWith(''),
        switchMap((param) => {
          return this.authorService.getAuthors(param).pipe(
            finalize(() => {
              this.isLoading = false;
              this.cdr.markForCheck();
            })
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (authors) => {
          this.authors = [...authors];
        }
      });
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
