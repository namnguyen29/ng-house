import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { catchError, throwError } from 'rxjs';

import { JsonApi } from '@app-shared/apis';
import { ArticleService } from '@app-shared/services';

@Component({
    selector: 'app-article-list',
    imports: [AsyncPipe, RouterOutlet],
    templateUrl: './article-list.component.html',
    styleUrl: './article-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListComponent {
  private readonly articleService = inject(ArticleService);
  private readonly router = inject(Router);
  private readonly jsonApi = inject(JsonApi);
  public readonly articles$ = this.articleService.getArticles();

  constructor() {
    this.jsonApi
      .getPost(Number('ssh'))
      .pipe(catchError((error) => throwError(() => error)))
      .subscribe({
        next: (value) => {
          console.log('res::', value);
        },
        error: (error: HttpErrorResponse) => {
          console.error('api fail::', {
            message: error
          });
        }
      });
  }

  public viewDetailArticle(slug: string, id: string): void {
    this.router.navigate(['articles', slug], {
      queryParams: {
        articleId: id
      }
    });
  }
}
