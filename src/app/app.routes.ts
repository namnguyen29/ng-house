import { Routes } from '@angular/router';

import { MainLayoutComponent } from '@app-containers/layouts';
import { HomeComponent } from '@app-pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'Home'
      },
      {
        // learn rxjs in this page
        path: 'fragments',
        loadComponent: async () =>
          (await import('./pages/fragments/fragments.component')).FragmentsComponent,
        title: 'Fragment List'
      },
      {
        path: 'details/:id',
        loadComponent: async () =>
          (await import('./pages/detail/detail.component')).DetailComponent,
        title: 'Home details'
      },
      {
        path: 'product',
        loadComponent: async () =>
          (await import('./pages/product/product.component')).ProductComponent,
        title: 'Product'
      },
      {
        path: 'authors',
        loadComponent: async () =>
          (await import('./pages/author-list/author-list.component')).AuthorListComponent,
        title: 'Authors'
      },
      {
        // learn rxjs - hoo in this page
        path: 'my-pipe',
        loadComponent: async () =>
          (await import('./pages/my-pipe/my-pipe.component')).MyPipeComponent,
        title: 'My Pipe'
      },
      {
        // learn rxjs - subject in this page
        path: 'my-subject',
        loadComponent: async () =>
          (await import('./pages/my-subject/my-subject.component')).MySubjectComponent,
        title: 'My Subject'
      },
      {
        path: 'articles/:slug',
        loadComponent: async () =>
          (await import('./pages/article-detail/article-detail.component')).ArticleDetailComponent,
        data: {
          hello: 'Router Data'
        }
      },
      {
        path: 'articles',
        loadComponent: async () =>
          (await import('./pages/article-list/article-list.component')).ArticleListComponent,
        title: 'Article List'
      }
    ]
  },
  {
    path: '**',
    loadComponent: async () =>
      (await import('./pages/page-not-found/page-not-found.component')).PageNotFoundComponent
  }
];
