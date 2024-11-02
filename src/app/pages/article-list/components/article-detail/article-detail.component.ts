import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AsyncPipe } from '@angular/common';

import { map, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';

import { ArticleService } from '@app-shared/services';
import { Article } from '@app-shared/interfaces';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleDetailComponent implements OnInit, OnDestroy {
  private readonly title = inject(Title);
  private readonly route = inject(ActivatedRoute);
  private readonly articleService = inject(ArticleService);
  private readonly destroy$ = new Subject<void>();
  public loadingSignal = signal(false);
  public article$!: Observable<Article | undefined>;

  public ngOnInit(): void {
    // this.route.queryParamMap.subscribe((paramMap) => {
    //   console.log('paramMap::', paramMap.get('articleId'));
    // });

    // this.route.queryParams.subscribe((param) => {
    //   console.log('pram::', param['articleId']);
    // });

    // this.route.data.subscribe((data) => {
    //   console.log('data::', data);
    // });

    this.article$ = this.route.params.pipe(
      tap(() => this.loadingSignal.set(true)),
      map((param) => `${param['slug']}`),
      switchMap((slug) =>
        this.articleService.getArticleBySlug(slug).pipe(
          tap((article) => {
            this.title.setTitle(`${article?.title} | Ng House`);
            this.loadingSignal.set(false);
          })
        )
      ),
      takeUntil(this.destroy$)
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
