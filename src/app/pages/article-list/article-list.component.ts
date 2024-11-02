import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { ArticleService } from '@app-shared/services';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [AsyncPipe, RouterOutlet],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListComponent {
  private readonly articleService = inject(ArticleService);
  private readonly router = inject(Router);
  public readonly articles$ = this.articleService.getArticles();

  public viewDetailArticle(slug: string, id: string): void {
    this.router.navigate(['articles', slug], {
      queryParams: {
        articleId: id
      }
    });
  }
}
