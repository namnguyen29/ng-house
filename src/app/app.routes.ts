import { Routes } from '@angular/router';

import { MainLayoutComponent } from '@app-containers/layouts';
import { HomeComponent } from '@app-pages/home/home.component';
import { articleDetailGuard, preventArticleGuard } from '@app-shared/guards';

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
        path: 'articles',
        loadComponent: async () =>
          (await import('./pages/article-list/article-list.component')).ArticleListComponent,
        title: 'Article List',
        canActivateChild: [articleDetailGuard],
        canDeactivate: [preventArticleGuard],
        children: [
          {
            path: ':slug',
            loadComponent: async () =>
              (await import('./pages/article-list/components')).ArticleDetailComponent,
            data: {
              hello: 'Router Data'
            }
          }
        ]
      }
    ]
  },
  {
    path: 'signin',
    loadComponent: async () => (await import('./pages/sign-in/sign-in.component')).SignInComponent,
    title: 'Login'
  },
  {
    path: '**',
    loadComponent: async () =>
      (await import('./pages/page-not-found/page-not-found.component')).PageNotFoundComponent
  }
];
