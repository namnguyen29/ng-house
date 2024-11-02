import { Injectable } from '@angular/core';

import { delay, map, Observable, of } from 'rxjs';

import { Article } from '@app-shared/interfaces';

const dumpArticles: Article[] = [
  {
    id: '1',
    slug: 'bai-viet-1',
    title: 'Bai viet 1',
    content: 'Day la noi dung bai viet 1',
    updateAt: '2020-07-06T13:26:31.785Z'
  },
  {
    id: '2',
    slug: 'bai-viet-2',
    title: 'Bai viet 2',
    content: 'Day la noi dung bai viet 2 nhe',
    updateAt: '2020-07-15:00:00.000Z'
  }
];

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public getArticles(): Observable<Article[]> {
    return of(dumpArticles).pipe(delay(500));
  }

  public getArticleBySlug(slug: string): Observable<Article | undefined> {
    return this.getArticles().pipe(
      delay(300),
      map((articles) => articles.find((article) => article.slug === slug || undefined))
    );
  }
}
